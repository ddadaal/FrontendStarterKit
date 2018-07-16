import React from "react";


export function removeElementAt<T>(array: Array<T>, index: number) {
  array.splice(index, 1);
}

export function replaceElement<T>(array: Array<T>, source: T, replacement: T) {
  const index = array.indexOf(this.source);
  array[index] = replacement;
}

export function flatten<T>(nestedArray: Array<Array<T>>) {
  return nestedArray.reduce((prev, curr) => [...prev, ...curr], []);
}


export function objectValues(object: object) {
  return Object.keys(object).map(x => object[x]);
}

export function takeAtMost<T>(array: Array<T>, n: number) {
  if (array.length<=n) {
    return array;
  } else {
    return array.slice(0,n);
  }
}

export function arrayContainsElement<T>(array: Array<T>) {
  return !!array && array.length >0;
}

export function arraySum<T>(array: Array<T>, mapper: (e: T)=>number) {
  return array.map(mapper).reduce((prev, curr)=> prev+curr, 0);
}
