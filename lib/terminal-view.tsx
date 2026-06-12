 
 
// @ts-nocheck

import { useState, useEffect, ReactElement, useRef } from 'react';
import { FitAddon } from 'xterm-addon-fit';
import ThemeMatcher from './theme-matcher';
import TerminalSession from './terminal-session';

const TERMINAL_PADDING = 5;

interface TerminalViewProps {
  session: TerminalSession;
}

export default function TerminalView({ session }: TerminalViewProps): ReactElement {
  const [fitAddon] = useState(() => new FitAddon());
  const [elementRef, setElementRef] = useState<HTMLDivElement | null>(null);
  const disposablesRef = useRef<(() => void)[]>([]);
  const isObservingTheme = useRef(false);
  const isObservingType = useRef(false);

  useEffect(() => {
    // Load the Fit Addon
    session.xterm.loadAddon(fitAddon);
    const disposeFitAddon = () => fitAddon.dispose();
    disposablesRef.current.push(disposeFitAddon);

    // Observe session destroy
    const disposeSession = session.onDidDestroy(() => {
      disposablesRef.current.forEach(dispose => dispose());
      disposablesRef.current = [];
    });
    disposablesRef.current.push(disposeSession);

    return () => {
      disposablesRef.current.forEach(dispose => dispose());
    };
  }, []);

  useEffect(() => {
    if (!elementRef) return;

    // Initialize xterm
    session.xterm.open(elementRef);
    session.xterm.focus();

    // Observe resize events
    const resizeObserver = new ResizeObserver(() => {
      resizeTerminalToFitContainer();
    });
    resizeObserver.observe(elementRef);

    const disposeResizeObserver = () => resizeObserver.disconnect();
    disposablesRef.current.push(disposeResizeObserver);

    // Apply theme and type settings
    if (!isObservingTheme.current) {
      observeAndApplyThemeStyles();
    }
    if (!isObservingType.current) {
      observeAndApplyTypeSettings();
    }

    // Initial resize
    resizeTerminalToFitContainer();

    return () => {
      resizeObserver.disconnect();
    };
  }, [elementRef]);

  const observeAndApplyThemeStyles = () => {
    if (isObservingTheme.current) return;
    
    const disposeConfig = atom.config.onDidChange(
      'terminal-tab.matchTheme',
      applyThemeStyles
    );
    const disposeThemes = atom.themes.onDidChangeActiveThemes(applyThemeStyles);
    disposablesRef.current.push(disposeConfig, disposeThemes);
    isObservingTheme.current = true;
    applyThemeStyles();
  };

  const observeAndApplyTypeSettings = () => {
    if (isObservingType.current) return;
    
    const disposeFontFamily = atom.config.onDidChange(
      'terminal-tab.fontFamily',
      applyTypeSettings
    );
    const disposeEditorFontFamily = atom.config.onDidChange(
      'editor.fontFamily',
      applyTypeSettings
    );
    const disposeEditorFontSize = atom.config.onDidChange(
      'editor.fontSize',
      applyTypeSettings
    );
    const disposeEditorLineHeight = atom.config.onDidChange(
      'editor.lineHeight',
      applyTypeSettings
    );
    disposablesRef.current.push(
      disposeFontFamily,
      disposeEditorFontFamily,
      disposeEditorFontSize,
      disposeEditorLineHeight
    );
    isObservingType.current = true;
    applyTypeSettings();
  };

  const applyThemeStyles = () => {
    if (!atom.config.get('terminal-tab.matchTheme')) {
      session.xterm.setOption('theme', {});
      return;
    }
    const themeStyles = ThemeMatcher.parseThemeStyles();
    session.xterm.setOption('theme', themeStyles);
  };

  const applyTypeSettings = () => {
    const fontFamily = atom.config.get('terminal-tab.fontFamily')
      || atom.config.get('editor.fontFamily')
      || 'Menlo, Consolas, "DejaVu Sans Mono", monospace';
    session.xterm.setOption('fontFamily', fontFamily);

    const fontSize = atom.config.get('editor.fontSize');
    session.xterm.setOption('fontSize', fontSize);

    const lineHeight = atom.config.get('editor.lineHeight');
    if (lineHeight) {
      session.xterm.setOption('lineHeight', lineHeight);
    }

    resizeTerminalToFitContainer();
  };

  const resizeTerminalToFitContainer = () => {
    if (!session?.pty || !session?.xterm) return;

    session.xterm.element.style.padding = `${TERMINAL_PADDING}px`;
    try {
      fitAddon.fit();
    } catch (error) {
      // Ignore fit errors
    }

    const elementHeight = elementRef?.offsetHeight || 0;
    const xtermHeight = session.xterm.element.offsetHeight || 0;
    const newHeight = elementHeight - xtermHeight + TERMINAL_PADDING;

    if (!isNaN(newHeight) && newHeight > 0) {
      fitAddon.fit();
      session.xterm.element.style.paddingBottom = `${newHeight}px`;
    }

    session.pty.resize(session.xterm.cols, session.xterm.rows);
  };

  const handleFocus = () => {
    session.xterm.focus();
  };

  return (
    <div
      ref={setElementRef}
      className="terminal-view"
      tabIndex={-1}
      onFocus={handleFocus}
    />
  );
}
