import { action, computed, observable, runInAction } from "mobx";
import React, { ReactNode } from "react"
import config from '../../assets/i18n/index.json';
import { Injectable } from "react.di";
import immer from "immer";

interface Language {
  id: string;
  name: string;
  acceptedLanguages: string[];
  definitionFileName: string;
}

interface LanguageConfig {
  fallbackId: string,
  languages: Language[]
}

export type Replacement = string | JSX.Element;

export type ReplacementMap = {[s: string]: Replacement};

const idSeparator = '.';

type LoadedLanguage = Language & { definitions: any }

function currentBrowserLanguage(fallback: string) {
  return window ? window.navigator.language : fallback;
}

function format(content: string, replacements?: ReplacementMap) : Array<ReactNode> | string {
  const splitter = /({[0-9a-zA-Z]+})/;
  let array = content.split(splitter);
  let newArray = array as Array<ReactNode>;
  let elementReplaced = false;
  if (replacements) {
    for (let i =1;i<array.length;i+=2) {
      const tag = array[i].substr(1,array[i].length - 2);
      const replacement = replacements[tag];
      if (replacement) {
        if (typeof replacement == 'string') {
          newArray[i] = replacement;
        } else {
          elementReplaced = true;
          newArray[i] = <React.Fragment key={i}>{replacement}</React.Fragment>;
        }
      }
    }
  }

  const f: (a) => any = immer((a) => {});

  if (elementReplaced) {
    return newArray;
  } else {
    return newArray.join("");
  }
}

@Injectable
export class LocaleStore {
  private availableLanguages: Map<string, Language> = new Map();
  private loadedLanguages: Map<string, LoadedLanguage> = new Map();

  @observable.ref currentLanguage: LoadedLanguage;

  fallbackLanguage: LoadedLanguage;

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
    const definitions = await import(`../../assets/i18n/${language.definitionFileName}.json`);
    const loaded = { ...language, definitions: definitions};
    this.loadedLanguages.set(language.id, loaded);
    return loaded;
  };

  public async init() {
    for (const l of config.languages) {
      this.availableLanguages.set(l.id, l);
    }

    this.fallbackLanguage = await this.loadLanguage(config.fallbackId);

    this.currentLanguage = await this.loadLanguage(currentBrowserLanguage(config.fallbackId));
  }

  public get(id: string, replacements?: ReplacementMap) : Array<ReactNode> | string {
    const definition = this.retrieveDefinition(id);
    return format(definition, replacements);
  };

  private retrieveDefinition(id: string) {
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
