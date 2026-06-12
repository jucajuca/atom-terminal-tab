// Type definitions for Pulsar (Atom-compatible API)
// Project: https://pulsar-edit.dev/
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped

declare namespace atom {
  // Workspace
  const workspace: {
    open(uri: string): Promise<any>;
    getActivePane(): { destroyActiveItem(): void };
    getActivePaneItem(): any;
    addOpener(callback: (uri: string) => any): { dispose(): void };
    views: {
      addViewProvider(constructor: any, viewFunction: (instance: any) => any): { dispose(): void };
    };
  };

  // Commands
  const commands: {
    add(selector: string, commands: { [key: string]: (...args: any[]) => any }): { dispose(): void };
  };

  // Config
  const config: {
    get(key: string): any;
    onDidChange(key: string, callback: (newValue: any) => any): { dispose(): void };
  };

  // Themes
  const themes: {
    onDidChangeActiveThemes(callback: () => any): { dispose(): void };
  };

  // Project
  const project: {
    getPaths(): string[];
    relativizePath(path: string): string[];
  };

  // Clipboard
  const clipboard: {
    write(text: string): void;
    read(): string;
  };

  // Views
  const views: {
    addViewProvider(constructor: any, viewFunction: (instance: any) => any): { dispose(): void };
  };

  // Deserializers
  const deserializers: {
    add(constructor: any, deserializeMethod: string): void;
  };
}

declare namespace etch {
  function dom(tag: string, attrs?: any, ...children: any[]): any;
  function setScheduler(scheduler: any): void;
  function initialize(instance: any): void;
  function update(instance: any): void;
  function destroy(instance: any): void;
}
