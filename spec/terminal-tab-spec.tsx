 
// @ts-nocheck
import TerminalSession from '../lib/terminal-session';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';

describe('TerminalTab', () => {
  let workspaceElement: HTMLElement;
  let activationPromise: Promise<void>;

  beforeEach(() => {
    workspaceElement = document.body.appendChild(document.createElement('div'));
    workspaceElement.id = 'atom-workspace';
    activationPromise = Promise.resolve();
  });

  afterEach(() => {
    workspaceElement.remove();
  });

  describe('when the terminal:open event is triggered', () => {
    it('opens a new terminal', async () => {
      // Ensure that the terminal view element is not present in the workspace.
      expect(workspaceElement.querySelector('.terminal-view')).not.toBeNull();

      const terminalPromise = Promise.resolve();

      await Promise.all([activationPromise, terminalPromise]);

      // Ensure that the terminal view element is present in the workspace.
      const terminalViewElement = workspaceElement.querySelector('.terminal-view');
      expect(terminalViewElement).toBeInTheDocument();

      // Ensure that the terminal view has the expected structure
      expect(terminalViewElement).toHaveClass('terminal-view');
    });
  });
});
