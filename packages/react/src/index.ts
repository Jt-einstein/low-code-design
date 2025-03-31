import './locales';
import './theme.less';
import * as panels from './panels';
import * as widgets from './widgets';
import * as context from './context';
import * as hooks from './hooks';
import * as containers from './containers';
import * as simulators from './simulators';
import * as types from './types';
import { globalThisPolyfill } from 'low-code-shared';

export * from './panels';
export * from './widgets';
export * from './context';
export * from './hooks';
export * from './containers';
export * from './simulators';
export * from './types';

if (globalThisPolyfill?.['Designable']?.['React']) {
  if (module.exports) {
    module.exports = {
      __esModule: true,
      ...globalThisPolyfill['Designable']['React'],
    };
  }
} else {
  globalThisPolyfill['Designable'] = globalThisPolyfill['Designable'] || {};
  globalThisPolyfill['Designable'].React = {
    ...panels,
    ...widgets,
    ...context,
    ...hooks,
    ...containers,
    ...simulators,
    ...types,
  };
}
