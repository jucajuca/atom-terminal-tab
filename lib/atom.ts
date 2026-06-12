// Mock atom module for testing
export const workspace = {
  open: () => {},
  getActivePane: () => ({ destroyActiveItem: () => {} }),
  getActivePaneItem: () => null,
  addOpener: () => ({ dispose: () => {} }),
  views: {
    addViewProvider: () => ({ dispose: () => {} })
  }
};

export const commands = {
  add: () => ({ dispose: () => {} })
};

export const config = {
  get: () => null
};

export const themes = {
  onDidChangeActiveThemes: () => ({ dispose: () => {} })
};

export const project = {
  getPaths: () => [],
  relativizePath: () => []
};

export const clipboard = {
  write: () => {},
  read: () => ''
};

export const deserializers = {
  add: () => {}
};

export const packages = {
  activatePackage: () => Promise.resolve()
};

export const spawn = () => ({
  write: () => {},
  kill: () => {},
  onData: () => ({ dispose: () => {} }),
  onExit: () => ({ dispose: () => {} })
});

export class CompositeDisposable {
  private disposables: any[] = [];
  
  add(disposable: any) {
    this.disposables.push(disposable);
  }
  
  dispose() {
    this.disposables.forEach(d => d.dispose && d.dispose());
    this.disposables = [];
  }
}

export class Emitter {
  private listeners: { [key: string]: Array<(data?: any) => void> } = {};
  
  emit(event: string, data?: any) {
    if (this.listeners[event]) {
      this.listeners[event].forEach(cb => cb(data));
    }
  }
  
  on(event: string, callback: (data?: any) => void) {
    if (!this.listeners[event]) {
      this.listeners[event] = [];
    }
    this.listeners[event].push(callback);
    
    return {
      dispose: () => {
        this.listeners[event] = this.listeners[event].filter(cb => cb !== callback);
        if (this.listeners[event].length === 0) {
          delete this.listeners[event];
        }
      }
    };
  }
  
  dispose() {
    this.listeners = {};
  }
}

export const process = {
  platform: 'linux',
  env: {}
};
