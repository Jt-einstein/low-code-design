import { GlobalRegistry, IDesignerRegistry } from '@astraflux/low-code-core';
import { globalThisPolyfill } from '@astraflux/low-code-shared';

export const useRegistry = (): IDesignerRegistry => {
  return globalThisPolyfill['__DESIGNER_REGISTRY__'] || GlobalRegistry;
};
