import * as schemas from './schemas';
import * as locales from './locales';
import * as components from './components';
import { globalThisPolyfill } from 'low-code-shared';
import storage from './utils/storage';
export * from './schemas';
export * from './locales';
export * from './components';
import { errorInterceptor } from './utils/errorInterceptor';

export const request: any = {
  timeout: 10000,
  method: 'POST',
  requestInterceptors: [
    (url, options) => {
      const userInfo = storage.getCurrentUser();
      const jwtToken = userInfo?.jwtToken || '';
      const headers = {
        ...options.headers,
        ...(jwtToken ? { 'mp-token': jwtToken } : {}),
      };
      return {
        url,
        options: { ...options, headers },
      };
    },
  ],
  responseInterceptors: [errorInterceptor],
};

if (globalThisPolyfill?.['Designable']?.['FormilyAntd']) {
  if (module.exports) {
    module.exports = {
      __esModule: true,
      ...globalThisPolyfill['Designable']['FormilyAntd'],
    };
  }
} else {
  globalThisPolyfill['Designable'] = globalThisPolyfill['Designable'] || {};
  globalThisPolyfill['Designable'].FormilyAntd = {
    ...schemas,
    ...locales,
    ...components,
  };
}
