 
/** @jsxImportSource react */
// @ts-nocheck

import { CompositeDisposable } from 'atom';
import { createRoot } from 'react-dom/client';
import TerminalSession from './terminal-session';
import TerminalView from './terminal-view';
import config from './config';


const TERMINAL_TAB_URI = 'terminal-tab://';

const disposables = new CompositeDisposable();
const viewProviders = new Map<TerminalSession, { root: ReturnType<typeof createRoot>; div: HTMLDivElement }>();

export default {
  config,

  initialize() {
    this.addViewProvider();
  },

  activate() {
    this.addOpener();
    this.addCommands();
  },

  deactivate() {
    disposables.dispose();
  },

  deserializeTerminalSession(data: { config: object }) {
    return new TerminalSession(data.config);
  },

  handleOpen() {
    return atom.workspace.open(TERMINAL_TAB_URI);
  },

  handleClose() {
    const activePane = atom.workspace.getActivePane();
    activePane.destroyActiveItem();
  },

  handleCopy() {
    const activeSession = atom.workspace.getActivePaneItem();
    if (activeSession && 'copySelection' in activeSession) {
      activeSession.copySelection();
    }
  },

  handlePaste() {
    const activeSession = atom.workspace.getActivePaneItem();
    if (activeSession && 'pasteFromClipboard' in activeSession) {
      activeSession.pasteFromClipboard();
    }
  },

  handleClear() {
    const activeSession = atom.workspace.getActivePaneItem();
    if (activeSession && 'clear' in activeSession) {
      activeSession.clear();
    }
  },

  addViewProvider() {
    disposables.add(atom.views.addViewProvider(TerminalSession, (session) => {
      // Create a container div
      const div = document.createElement('div');
      
      // Create a React root and render the TerminalView
      const root = createRoot(div);
      root.render(<TerminalView session={session} />);
      
      // Store the root and div for cleanup
      viewProviders.set(session, { root, div });
      
      // When session is destroyed, clean up React
      const onDidDestroy = session.onDidDestroy(() => {
        const entry = viewProviders.get(session);
        if (entry) {
          entry.root.unmount();
          viewProviders.delete(session);
        }
      });
      
      disposables.add({
        dispose: () => {
          const entry = viewProviders.get(session);
          if (entry) {
            entry.root.unmount();
          }
          onDidDestroy.dispose();
        }
      });
      
      return div;
    }));
  },

  addOpener() {
    disposables.add(atom.workspace.addOpener((uri) => {
      if (uri === TERMINAL_TAB_URI) {
        return new TerminalSession();
      }
    }));
  },

  addCommands() {
    disposables.add(atom.commands.add('atom-workspace', {
      'terminal:open': this.handleOpen.bind(this)
    }));
    disposables.add(atom.commands.add('terminal-view', {
      'terminal:copy': this.handleCopy.bind(this),
      'terminal:paste': this.handlePaste.bind(this),
      'terminal:clear': this.handleClear.bind(this),
      'terminal:close': this.handleClose.bind(this)
    }));
  }
};
