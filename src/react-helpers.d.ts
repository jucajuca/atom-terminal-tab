/// <reference types="react" />
/// <reference types="react-dom" />

import { atom } from './pulsar';

declare module 'react' {
  // Extend React namespace to include atom
  const atom: typeof atom;
}

export { atom };
