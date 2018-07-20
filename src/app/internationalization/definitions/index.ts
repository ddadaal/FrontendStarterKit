import config from '../../../assets/i18n/index.json'
import { Language } from "../LocaleStore/LocaleStore";

export const LANGUAGE_CONFIG_TOKEN = Symbol("LanguageConfig");

export const languageConfig = config.map(x => ({
  ...x,
  getDefinition: import(`../../../assets/i18n/${x.definitionFileName}.json5`)
})) as Language[];
