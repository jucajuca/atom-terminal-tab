 
 
// @ts-nocheck
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';

describe('TerminalView', () => {
  let session: TerminalSession;
  let container: HTMLElement;

  beforeEach(() => {
    session = new TerminalSession();
    const { container: c } = render(<TerminalView session={session} />);
    container = c;
  });

  afterEach(() => {
    container.remove();
  });

  describe('focus', () => {
    it('transfers focus to xterm when focused', () => {
      const xtermTextareaElement = container.querySelector('.xterm-helper-textarea');
      expect(xtermTextareaElement).not.toBeNull();

      // Focus the container
      container.focus();
      expect(document.activeElement).toBe(xtermTextareaElement);
    });
  });

  describe('xterm', () => {
    it('element is present in the dom', () => {
      const xtermElement = container.querySelector('.xterm');
      expect(xtermElement).toBeInTheDocument();
    });
  });
});
