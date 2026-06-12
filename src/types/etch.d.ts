// Type definitions for etch
// Project: https://github.com/atom/etch
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped

declare namespace etch {
  namespace dom {
    function createElement(tag: string, attrs?: any, ...children: any[]): any;
  }
  
  function setScheduler(scheduler: any): void;
  function initialize(instance: any): void;
  function update(instance: any): void;
  function destroy(instance: any): void;
  
  const dom: typeof dom;
}
