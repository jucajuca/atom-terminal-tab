declare module 'atom' {
  export const workspace: any;
  export const commands: any;
  export const config: any;
  export const themes: any;
  export const project: any;
  export const clipboard: any;
  export const deserializers: any;
  export const packages: any;
  export function spawn(path: string, args?: string[]): any;
  
  export class CompositeDisposable {
    add(disposable: any): void;
    dispose(): void;
  }
  
  export class Emitter {
    emit(event: string, data: any): void;
    on(event: string, callback: (data: any) => any): { dispose(): void };
    dispose(): void;
  }
}

// Process
declare const process: {
  platform: string;
  env: { [key: string]: string | undefined };
  HOME?: string;
  COMSPEC?: string;
  SHELL?: string;
};

// Xterm instance interface
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

// Xterm addon interface
interface FitAddon {
  fit(): void;
  dispose(): void;
}

// Terminal session interfaces
interface TerminalPty {
  write(data: string): void;
  kill(): void;
  onData(callback: (data: string) => void): { dispose(): void };
  onExit(callback: (exitCode: number) => void): { dispose(): void };
}

interface TerminalEmitter {
  emit(event: string, data?: any): void;
  on(event: string, callback: (data?: any) => void): { dispose(): void };
  dispose(): void;
}

// Terminal session class declaration
declare class TerminalSession {
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
