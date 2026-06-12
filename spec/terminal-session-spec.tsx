 
// @ts-nocheck
jest.mock('node-pty', () => ({
  spawn: () => ({
    write: () => {},
    kill: () => {},
    onData: () => ({ dispose: () => {} }),
    onExit: () => ({ dispose: () => {} })
  })
}));

jest.mock('atom', () => ({
  CompositeDisposable: class {
    private disposables: any[] = [];
    add(d: any) { this.disposables.push(d); }
    dispose() { this.disposables.forEach(d => d.dispose?.()); }
  },
  Emitter: class {
    private listeners: any = {};
    emit(e: string, d?: any) { if (this.listeners[e]) this.listeners[e].forEach(cb => cb(d)); }
    on(e: string, cb: (d?: any) => void) {
      if (!this.listeners[e]) this.listeners[e] = [];
      this.listeners[e].push(cb);
      return { dispose: () => { this.listeners[e] = this.listeners[e].filter(c => c !== cb); } };
    }
    dispose() { this.listeners = {}; }
  },
  config: { get: () => null }
}));

import TerminalSession from '../lib/terminal-session';
import { Terminal as Xterm } from 'xterm';

describe('TerminalSession', () => {
  let session: TerminalSession;

  beforeEach(() => {
    session = new TerminalSession();
  });

  afterEach(() => {
    session.destroy();
  });

  describe('xterm', () => {
    it('instance is initialized', () => {
      expect(session.xterm).not.toBeNull();
      expect(session.xterm).toBeInstanceOf(Xterm);
    });
  });
});
