declare interface Language {
  languageId: string;
  acceptedLanguages: string[];

}

declare type DeepPartial<T> = {
  [key in keyof T]?: DeepPartial<T[key]>;
}