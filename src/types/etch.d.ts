// Type definitions for etch
// Project: https://github.com/atom/etch
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped

export namespace dom {
  function createElement(tag: string, attrs?: any, ...children: any[]): any;
}

declare namespace etch {
  function setScheduler(scheduler: any): void;
  function initialize(instance: any): void;
  function update(instance: any): void;
  function destroy(instance: any): void;
}

export = etch;
