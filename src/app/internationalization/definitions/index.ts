export type DeepPartial<T> = {
  [key in keyof T]?: DeepPartial<T[key]>;
}

import * as ts from 'typescript';
import { ReturnStatement } from 'typescript';

function a(): ReturnStatement {
  return ts.createReturn();
}


export type Definition = DeepPartial<typeof import("./cn").default>;

export interface Language{
  id: string;
  name: string;
  acceptedNavigatorLanguages: string[];
  getDefinition: Promise<Definition>;
  fallback?: boolean;
}


export const LANGUAGE_CONFIG_TOKEN = Symbol("LanguageConfig");

export const languageConfig = [
  {
    id: "zh-CN",
    name: "简体中文",
    acceptedNavigatorLanguages: ["zh-CN"],
    definitionFileName: "cn",
    fallback: true
  },
  {
    id: "en-US",
    name: "English",
    acceptedNavigatorLanguages: ["en-US"],
    definitionFileName: "en"
  },
].map(x => ({
  ...x,
  getDefinition: import("./"+x.definitionFileName)
})) as Language[];
