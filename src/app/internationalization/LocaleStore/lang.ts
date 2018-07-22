import { Definition } from '../definitions';

interface Wrapper { bootstrap: Definition}

export const GET_VALUE = "__get";

export class Lang { }


function factory<T, key extends keyof T>(): T[key] {
  const paths = [];
  const obj = new Proxy(new Lang(), {
    get: (t, k) => {
      if (k === GET_VALUE) return paths.join(".");
      paths.push(k);
      return obj;
    }
  }) as any;
  return obj;
}

function lang() {
  return factory<Wrapper, "bootstrap">();
}

export default lang;
