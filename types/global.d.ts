declare module '*.css' {
  const styles: any;
  export = styles;
}

declare module '*.svg' {
  const svg: any;
  export default svg;
}

declare module '*.png' {
  const png: any;
  export default png;
}


declare type ClassType<T> = {
  [P in keyof T]: T[P];
}

declare module "*.json" {
  const value: any;
  export default value;
}

declare module "*.txt" {
  const value: any;
  export default value;
}
