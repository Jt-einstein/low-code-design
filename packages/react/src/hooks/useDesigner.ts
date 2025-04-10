import { useContext, useEffect } from 'react';
import { Engine } from '@astraflux/low-code-core';
import { DesignerEngineContext } from '../context';
import { isFn, globalThisPolyfill } from '@astraflux/low-code-shared';
export interface IEffects {
  (engine: Engine): void;
}

export const useDesigner = (
  effects?: IEffects
): Engine & { subscribeTo?: any; subscribeWith?: any } => {
  const designer: Engine =
    globalThisPolyfill['__DESIGNABLE_ENGINE__'] ||
    useContext(DesignerEngineContext);
  useEffect(() => {
    if (isFn(effects)) {
      return effects(designer);
    }
  }, []);
  return designer;
};
