import { LANGUAGE_CONFIG_TOKEN } from "../definitions";
import { action, computed, observable, runInAction } from "mobx";
import { Inject, Injectable } from "react.di";
import * as React from "react";

export interface Language{
  id: string;
  name: string;
  acceptedNavigatorLanguages: string[];
  getDefinition: Promise<any>;
  fallback?: boolean;
}


type LoadedLanguage = Language & { definitions: any }

export type ReplacementMap = {[key: string]: React.ReactNode};

const idSeparator = '.';

function currentBrowserLanguage(fallback: string) {
  return typeof window !== 'undefined' ? window.navigator.language : fallback;
}

@Injectable
export class LocaleStore {
  private availableLanguages: Map<string, Language> = new Map();
  private loadedLanguages: Map<string, LoadedLanguage> = new Map();

  @observable.ref currentLanguage: LoadedLanguage;

  fallbackLanguage: LoadedLanguage;

  config: Language[];

  constructor(@Inject(LANGUAGE_CONFIG_TOKEN) config: Language[]) {
    this.config = config[0] as any; // avoid multi inject
  }

  @computed get definitions() {
    return this.currentLanguage.definitions;
  }


  @computed get allLanguages(): Language[] {
    return Array.from(this.availableLanguages.values());
  }

  async loadLanguage(id: string): Promise<LoadedLanguage> {

    if (!this.availableLanguages.has(id)) {
      return this.fallbackLanguage;
    }
    if (this.loadedLanguages.has(id)) {
      return this.loadedLanguages.get(id);
    }
    const language = this.availableLanguages.get(id);
    const definitions = ((await language.getDefinition) as any).default;

    const loaded = { ...language, definitions: definitions};
    this.loadedLanguages.set(language.id, loaded);
    return loaded;
  };

  @action async init() {
    let fallbackId = null;
    for (const l of this.config) {
      this.availableLanguages.set(l.id, l);
      if (l.fallback) {
        fallbackId = l.id;
      }
    }

    this.currentLanguage = await this.loadLanguage(currentBrowserLanguage(fallbackId));
    this.fallbackLanguage = await this.loadLanguage(fallbackId);

  }

  public get(id: string, replacements?: ReplacementMap) : Array<React.ReactNode> | string {
    const definition = this.retrieveDefinition(id);
    return this.replace(definition, replacements);
  };

  replace(format: string, replacements?: ReplacementMap) : Array<React.ReactNode> | string {
    const splitter = /({[0-9a-zA-Z]+})/;
    let array = format.split(splitter);
    let newArray = array as Array<React.ReactNode>;
    let elementReplaced = false;
    if (replacements) {
      for (let i =1;i<array.length;i+=2) {
        const tag = array[i].substr(1,array[i].length - 2);
        const replacement = replacements[tag];
        if (replacement) {
          if (React.isValidElement(replacement)) {
            elementReplaced = true;
            newArray[i] = <React.Fragment key={i}>{replacement}</React.Fragment>;
          } else {
            newArray[i] = replacement;
          }
        }
      }
    }

    if (elementReplaced) {
      return newArray;
    } else {
      return newArray.join("");
    }
  }

  private retrieveDefinition(id: string) {
    console.log(this.definitions);
    let content = this.definitions;
    let fallbackContent = this.fallbackLanguage.definitions;
    let onFallback = false;
    for (const key of id.split(idSeparator)) {
      if (typeof content === 'undefined') {
        throw new RangeError(`unidentified id ${id}`);
      }
      if (key in content) {
        if (!onFallback) {
          fallbackContent = fallbackContent[key];
        }
        content = content[key];
      } else {
        // fallback occurs.
        // redirect the content to fallback
        content = fallbackContent[key];
        onFallback = true;
      }
    }
    if (typeof content !== "string") {
      throw new RangeError(`id ${id} does not refer to a string. actual value: ${content}`)
    }
    return content;
  };


  @action async changeLanguage(id: string) {
    const newLanguage = await this.loadLanguage(id);
    runInAction(`Language ${newLanguage.name} selected and loaded.`, () => {
      this.currentLanguage = newLanguage;
    });

  };
}
