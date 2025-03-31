import { globalThisPolyfill } from 'low-code-shared';
import './locales';
import * as FormilySetters from './components';

export * from './components';

if (globalThisPolyfill?.['Designable']?.['FormilySetters']) {
  if (module.exports) {
    module.exports = {
      __esModule: true,
      ...globalThisPolyfill['Designable']['FormilySetters'],
    };
  }
} else {
  globalThisPolyfill['Designable'] = globalThisPolyfill['Designable'] || {};
  globalThisPolyfill['Designable'].FormilySetters = FormilySetters;
}
