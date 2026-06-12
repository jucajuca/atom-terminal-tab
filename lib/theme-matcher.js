/** @babel */

// Simplified theme matching using user-configurable colors
// Pulsar removed the color elements API used in the old Atom approach

export default class ThemeMatcher {

  static parseThemeStyles() {
    const matchTheme = atom.config.get('terminal-tab.matchTheme');
    
    // If theme matching is disabled, use default colors
    if (!matchTheme) {
      return atom.config.get('terminal-tab.colors');
    }

    // If theme matching is enabled, return empty object for xterm to use defaults
    // Users can override with custom colors in the config
    return {};
  }

}
