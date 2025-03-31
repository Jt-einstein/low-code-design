/** 设计器组件 */
export { LowCodeDesigner } from './LowCodeDesigner';
export type { LowCodeDesignerProps } from './type';
export type { TDesigner } from './type';
/* 标题修改器 */
export { TitleSetter } from './widgets/TitleSetter';
/** 工具方法 */
export { withCenterLayout, Formily } from './utils/utils';
export { createBehavior, createResource } from 'low-code-core';
export {
  transformToTreeNode,
  transformToSchema,
} from 'low-code-formily-transformer';
export * as schema from './utils/schema';
export * as hooks from './hooks';

// formily
export { onFieldValueChange } from '@formily/core';
