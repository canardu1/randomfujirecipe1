declare module 'xmp-js' {
  export class XmpTag {
    constructor(name: string, value: string);
    getName(): string;
    getValue(): string;
  }

  export class XmpDocument {
    constructor();
    setNamespace(prefix: string, uri: string): void;
    appendTag(tag: XmpTag): void;
    toString(): string;
  }
}