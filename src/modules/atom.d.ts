declare module 'atom' {
  export const workspace: any;
  export const commands: any;
  export const config: any;
  export const themes: any;
  export const project: any;
  export const clipboard: any;
  export const deserializers: any;
  export const packages: any;
  export class CompositeDisposable {
    add(disposable: any): void;
    dispose(): void;
  }
  export class Emitter {
    emit(event: string, data: any): void;
    on(event: string, callback: (data: any) => any): { dispose(): void };
    dispose(): void;
  }
  export function spawn(path: string, args?: string[]): any;
}
