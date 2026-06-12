/** @babel */

export default {

  defaultLocation: {
    title: 'Default Location',
    description: 'Where to open new terminals. They will open in the bottom pane, by default.',
    type: 'string',
    default: 'bottom',
    enum: [
      { value: 'bottom', description: 'Bottom' },
      { value: 'center', description: 'Center' },
      { value: 'left', description: 'Left' },
      { value: 'right', description: 'Right' }
    ]
  },

  fontFamily: {
    title: 'Font Family',
    description: 'The name of the font family used for terminal text. By default, this matches the editor font family.',
    type: 'string',
    default: ''
  },

  matchTheme: {
    title: 'Match Theme',
    description: 'When enabled, the look of the terminal will match the currently configured Pulsar theme.',
    type: 'boolean',
    default: false
  },

  colors: {
    title: 'Terminal Colors',
    description: 'Custom terminal colors when theme matching is disabled.',
    type: 'object',
    properties: {
      foreground: {
        title: 'Foreground',
        type: 'string',
        description: 'Default foreground color (text)',
        default: '#cccccc'
      },
      background: {
        title: 'Background',
        type: 'string',
        description: 'Default background color',
        default: '#1e1e1e'
      },
      cursor: {
        title: 'Cursor',
        type: 'string',
        description: 'Cursor color',
        default: '#cccccc'
      },
      cursorAccent: {
        title: 'Cursor Accent',
        type: 'string',
        description: 'Cursor accent color (for block cursor)',
        default: '#ffffff'
      },
      selectionBackground: {
        title: 'Selection Background',
        type: 'string',
        description: 'Selection background color',
        default: '#264f78'
      },
      selectionForeground: {
        title: 'Selection Foreground',
        type: 'string',
        description: 'Selection foreground color',
        default: '#ffffff'
      },
      black: {
        title: 'Black (ANSI 0)',
        type: 'string',
        default: '#000000'
      },
      red: {
        title: 'Red (ANSI 1)',
        type: 'string',
        default: '#d43f3f'
      },
      green: {
        title: 'Green (ANSI 2)',
        type: 'string',
        default: '#2b7a2b'
      },
      yellow: {
        title: 'Yellow (ANSI 3)',
        type: 'string',
        default: '#b8860b'
      },
      blue: {
        title: 'Blue (ANSI 4)',
        type: 'string',
        default: '#2d408a'
      },
      magenta: {
        title: 'Magenta (ANSI 5)',
        type: 'string',
        default: '#8e3b8e'
      },
      cyan: {
        title: 'Cyan (ANSI 6)',
        type: 'string',
        default: '#1d9e9e'
      },
      white: {
        title: 'White (ANSI 7)',
        type: 'string',
        default: '#e0e0e0'
      },
      brightBlack: {
        title: 'Bright Black (ANSI 8)',
        type: 'string',
        default: '#666666'
      },
      brightRed: {
        title: 'Bright Red (ANSI 9)',
        type: 'string',
        default: '#e95678'
      },
      brightGreen: {
        title: 'Bright Green (ANSI 10)',
        type: 'string',
        default: '#26a434'
      },
      brightYellow: {
        title: 'Bright Yellow (ANSI 11)',
        type: 'string',
        default: '#ecbe2b'
      },
      brightBlue: {
        title: 'Bright Blue (ANSI 12)',
        type: 'string',
        default: '#3d8bc4'
      },
      brightMagenta: {
        title: 'Bright Magenta (ANSI 13)',
        type: 'string',
        default: '#b03993'
      },
      brightCyan: {
        title: 'Bright Cyan (ANSI 14)',
        type: 'string',
        default: '#26b1b6'
      },
      brightWhite: {
        title: 'Bright White (ANSI 15)',
        type: 'string',
        default: '#ffffff'
      }
    }
  },

  shellSettings: {
    type: 'object',
    properties: {

      sanitizeEnvironment: {
        title: 'Sanitized Environment Variables',
        description: 'Specify variables to remove from the environment in the terminal session. For example, the default behavior is to unset `NODE_ENV`, since Atom sets this to "production" on launch and may not be what you want when developing a Node application.',
        type: 'array',
        default: [ 'NODE_ENV' ]
      },

      shellPath: {
        title: 'Shell Path',
        description: 'Path to your shell application. Uses the $SHELL environment variable by default on *NIX and %COMSPEC% on Windows.',
        type: 'string',
        default: (() => {
          if (process.platform === 'win32') {
            return process.env.COMSPEC || 'cmd.exe';
          } else {
            return process.env.SHELL || '/bin/bash';
          }
        })()
      },

      shellArgs: {
        title: 'Shell Arguments',
        description: 'Arguments to send to the shell application on launch. Sends "--login" by default on *NIX and nothing on Windows.',
        type: 'string',
        default: (() => {
          if (process.platform !== 'win32' && process.env.SHELL === '/bin/bash') {
            return '--login';
          } else {
            return '';
          }
        })()
      }

    }
  },

};
