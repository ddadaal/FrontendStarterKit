import { Definition } from '../definitions';

export const GET_VALUE = "__get";

export class Lang { }


function factory(): Definition {
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
  return factory();
}

export default lang;
