import { GlobalRegistry, IDesignerRegistry } from 'low-code-core';
import { globalThisPolyfill } from 'low-code-shared';

export const useRegistry = (): IDesignerRegistry => {
  return globalThisPolyfill['__DESIGNER_REGISTRY__'] || GlobalRegistry;
};
