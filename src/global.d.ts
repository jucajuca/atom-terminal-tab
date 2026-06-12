/// <reference types="react" />
/// <reference types="react-dom" />

// Type definitions for Pulsar (Atom-compatible API)
// Project: https://pulsar-edit.dev/
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped

// Global atom namespace
declare namespace atom {
  // Workspace
  export const workspace: {
    open(uri: string): Promise<any>;
    getActivePane(): { destroyActiveItem(): void };
    getActivePaneItem(): any;
    addOpener(callback: (uri: string) => any): { dispose(): void };
    views: {
      addViewProvider(constructor: any, viewFunction: (instance: any) => any): { dispose(): void };
    };
  };

  // Commands
  export const commands: {
    add(selector: string, commands: { [key: string]: (...args: any[]) => any }): { dispose(): void };
  };

  // Config
  export const config: {
    get(key: string): any;
  };

  // Themes
  export const themes: {
    onDidChangeActiveThemes(callback: () => any): { dispose(): void };
  };

  // Project
  export const project: {
    getPaths(): string[];
    relativizePath(path: string): string[];
  };

  // Clipboard
  export const clipboard: {
    write(text: string): void;
    read(): string;
  };

  // Deserializers
  export const deserializers: {
    add(constructor: any, deserializeMethod: string): void;
  };

  // Packages
  export const packages: {
    activatePackage(name: string): Promise<any>;
  };
}

// Process
declare const process: {
  platform: string;
  env: { [key: string]: string | undefined };
  HOME?: string;
  COMSPEC?: string;
  SHELL?: string;
};

// Xterm interface
interface XtermInstance {
  element?: HTMLElement;
  cols: number;
  rows: number;
  open(element: HTMLElement): void;
  focus(): void;
  write(data: string): void;
  clear(): void;
  getSelection(): string;
  setOption(key: string, value: any): void;
  loadAddon(addon: any): void;
  dispose(): void;
  onData(callback: (data: string) => void): { dispose(): void };
}

// Fit addon interface
interface FitAddon {
  fit(): void;
  dispose(): void;
}

// Terminal Session Pseudoterminal interface
interface TerminalPty {
  write(data: string): void;
  kill(): void;
  onData(callback: (data: string) => void): { dispose(): void };
  onExit(callback: (exitCode: number) => void): { dispose(): void };
}

// Terminal Session Emitter interface
interface TerminalEmitter {
  emit(event: string, data?: any): void;
  on(event: string, callback: (data?: any) => void): { dispose(): void };
  dispose(): void;
}

// Terminal Session Class
export default class TerminalSession {
  constructor(config?: object);
  
  config: object;
  disposables: { dispose(): void };
  emitter: TerminalEmitter;
  pty: TerminalPty;
  xterm: XtermInstance;
  
  workingDirectory: string | undefined;
  shellPath: string | undefined;
  shellArguments: string | undefined;
  
  onDidDestroy(callback: () => void): { dispose(): void };
  clear(): void;
  copySelection(): void;
  pasteFromClipboard(): void;
  destroy(): void;
  serialize(): { deserializer: string; config: object };
}
