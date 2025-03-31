import { globalThisPolyfill } from './globalThisPolyfill';
import * as types from './types';
import * as consts from './consts';
import * as utils from './utils';
import * as template from './template';
import { fns, getFnFromCodeString, getPropsFinishedIndex } from './fns';

export * from './types';
export * from './consts';
export * as utils from './utils';
export * as template from './template';
export { fns, getFnFromCodeString, getPropsFinishedIndex } from './fns';

if (globalThisPolyfill?.['Designable']?.['Extension']) {
  if (module.exports) {
    module.exports = {
      __esModule: true,
      ...globalThisPolyfill['Designable']['Extension'],
    };
  }
} else {
  globalThisPolyfill['Designable'] = globalThisPolyfill['Designable'] || {};
  globalThisPolyfill['Designable'].Extension = {
    ...types,
    ...consts,
    ...utils,
    ...template,
    fns,
    getFnFromCodeString,
    getPropsFinishedIndex,
  };
}
