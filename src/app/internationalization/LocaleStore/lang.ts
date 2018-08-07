import { Definition } from '../definitions';

export const GET_VALUE = "__get";

export class Lang {
  constructor(public paths: PropertyKey[]) { }
}

function factory(lang: Lang) {
  const obj = new Proxy(lang, {
    get: (t, k) => {
      if (k === GET_VALUE) {
        return lang.paths.join(".");
      }
      return factory(new Lang([...t.paths, k]))
    }
  }) as any;
  return obj;
}

function lang(): Definition {
  return factory(new Lang([]));
}

export default lang;
