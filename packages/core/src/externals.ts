import { isFn, isArr } from 'low-code-shared';
import { untracked } from '@formily/reactive';
import { DEFAULT_DRIVERS, DEFAULT_EFFECTS, DEFAULT_SHORTCUTS } from './presets';
import { Engine, TreeNode } from './models';
import {
  IEngineProps,
  IResourceCreator,
  IBehaviorCreator,
  IDesignerLocales,
  IResource,
  IBehavior,
  IBehaviorHost,
  IResourceHost,
} from './types';
import { mergeLocales } from './internals';
import { getFnFromCodeString } from 'low-code-extension';

export const isBehaviorHost = (val: any): val is IBehaviorHost =>
  val?.Behavior && isBehaviorList(val.Behavior);

export const isBehaviorList = (val: any): val is IBehavior[] =>
  Array.isArray(val) && val.every(isBehavior);

export const isBehavior = (val: any): val is IBehavior =>
  val?.name ||
  val?.selector ||
  val?.extends ||
  val?.designerProps ||
  val?.designerLocales;

export const isResourceHost = (val: any): val is IResourceHost =>
  val?.Resource && isResourceList(val.Resource);

export const isResourceList = (val: any): val is IResource[] =>
  Array.isArray(val) && val.every(isResource);

export const isResource = (val: any): val is IResource =>
  val?.node && !!val.node.isSourceNode && val.node instanceof TreeNode;

export const createLocales = (...packages: IDesignerLocales[]) => {
  const results = {};
  packages.forEach((locales) => {
    mergeLocales(results, locales);
  });
  return results;
};

export const createBehavior = (
  ...behaviors: Array<IBehaviorCreator | IBehaviorCreator[]>
): IBehavior[] => {
  return behaviors.reduce((buf: any[], behavior) => {
    if (isArr(behavior)) return buf.concat(createBehavior(...behavior));
    const { selector } = behavior || {};
    if (!selector) return buf;
    if (typeof selector === 'string') {
      behavior.selector = (node) => node.componentName === selector;
    }
    return buf.concat(behavior);
  }, []);
};

export const createResource = (...sources: IResourceCreator[]): IResource[] => {
  return sources.reduce((buf, source) => {
    const elements = (source?.elements ?? []).map((element) => {
      const script = element?.props?.['x-reactions']?.fulfill?.run;
      if (script) {
        return {
          ...element,
          props: {
            ...element?.props,
            events: getFnFromCodeString(
              (script ?? '').match(/\b\w+\b|[^\w]/g)
            ),
          },
        };
      }
      return element;
    });

    return buf.concat({
      ...source,
      node: new TreeNode({
        componentName: '$$ResourceNode$$',
        isSourceNode: true,
        children: elements || [],
        // children: (source.elements || []).map((element) => ({
        //   ...element,
        //   props: {
        //     ...element.props,
        //     'x-component-props': {
        //       ...element?.props?.['x-component-props'],
        //       style: {
        //         ...element?.props?.['x-component-props']?.style,
        //         borderWidth: '1px',
        //         borderColor: 'rgba(196,208,221,1)',
        //       },
        //     },
        //     'x-decorator-props': {
        //       ...element?.props?.['x-decorator-props'],
        //       style: {
        //         ...element?.props?.['x-decorator-props']?.style,
        //         borderWidth: '1px',
        //         borderColor: 'rgba(196,208,221,1)',
        //       },
        //     },
        //   },
        // })),
      }),
    });
  }, []);
};

export const createDesigner = (props: IEngineProps<Engine> = {}) => {
  const drivers = props.drivers || [];
  const effects = props.effects || [];
  const shortcuts = props.shortcuts || [];
  return untracked(
    () =>
      new Engine({
        ...props,
        effects: [...effects, ...DEFAULT_EFFECTS],
        drivers: [...drivers, ...DEFAULT_DRIVERS],
        shortcuts: [...shortcuts, ...DEFAULT_SHORTCUTS],
      })
  );
};
