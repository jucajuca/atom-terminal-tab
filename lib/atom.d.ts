// Minimal type declarations for atom module
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
    constructor();
    add(disposable: any): void;
    dispose(): void;
  }
  
  export class Emitter {
    constructor();
    emit(event: string, data?: any): void;
    on(event: string, callback: (data?: any) => any): { dispose(): void };
    dispose(): void;
  }
}

declare const process: {
  platform: string;
  env: { [key: string]: string | undefined };
  HOME?: string;
  COMSPEC?: string;
  SHELL?: string;
};
