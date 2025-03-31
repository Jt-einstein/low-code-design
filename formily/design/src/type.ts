import { Engine, IBehavior, IResource } from 'low-code-core';
import { IFormilySchema } from 'low-code-formily-transformer';
import type { ExtendForm } from 'low-code-react-settings-form';

export type TDesigner = {
  getSchema: () => IFormilySchema;
  setSchema: (value: string) => void;
  engine: Engine;
  isModified: () => boolean;
};

export type LocalTemplateCatg = {
  title: string;
  key: string;
  children: TComponent[];
};

export type LowCodeDesignerProps = {
  /* 设计器实例 */
  designer: TDesigner;
  /* 是否只保持一个tab页 */
  keepJustOneTab?: boolean;
  /* 是否使用ai功能 */
  isUseAI?: boolean;
  /* 组件列表默认选中类型 */
  defaultComponentsType?: 'reports' | 'mcui';
  /* 是否显示局部模板 */
  isShowLocalTemplateComponents?: boolean;
  /* 局部模板列表 */
  localTemplateComponents?: LocalTemplateCatg[];
  /* 是否显示自定义组件列表 */
  isShowCustomComponents?: boolean;
  /* 自定义组件列表 */
  customComponents?: TComponent[];
  /* 上传背景图片背景 */
  customRequest?: (options) => Promise<string>;
  /* 自定义组件表单 */
  extendForm?: ExtendForm;
  /* 额外的功能函数，仅在预览时生效 */
  extendScope?: Record<string, any>;
};

export type TRenderViewProps = {
  engine: Engine;
  panekey: string;
  /* 额外的功能函数，仅在预览时生效 */
  extendScope?: Record<string, any>;
};

export type TViewTabsProps = {
  engine: Engine;
  hideAdd?: boolean;
  /* 额外的功能函数，仅在预览时生效 */
  extendScope?: Record<string, any>;
};

export type TComponent = {
  name: string;
  type: string;
  design:
    | {
        Resource?: IResource[];
        Behavior?: IBehavior[];
      }
    | ({
        Resource?: IResource[];
        Behavior?: IBehavior[];
      } & React.FC);
  preview?: React.Component | React.FC;
};
