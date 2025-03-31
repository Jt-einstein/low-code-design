import { ReactionsSetter } from 'low-code-setters';
import { ISchema } from '@formily/json-schema';
import { AllSchemas } from '../../../schemas';

export type SchemaProps = {
  // 字段属性
  fieldGroup?: Object | boolean;
  // 组件属性
  component?: ISchema;
  // 容器属性
  decorator?: ISchema | boolean;
  // 组件样式
  componentStyleGroup?: ISchema | boolean;
  // 容器样式
  decoratorStyleGroup?: ISchema | boolean;
};

export class BaseFieldSchema {
  mergeStyleSchema(schema: ISchema | boolean) {
    if (schema === false) {
      return null;
    }
    if (schema === true) {
      return AllSchemas.CSSStyle;
    }
    return { ...AllSchemas.CSSStyle, ...schema };
  }

  createComponentSchema(component: ISchema) {
    return (
      component && {
        'component-group': {
          index: 10,
          type: 'void',
          'x-component': 'CollapseItem',
          properties: {
            'x-component-props': component,
          },
        },
      }
    );
  }

  createComponentStyleSchema(componentStyleGroup: ISchema | boolean) {
    return (
      componentStyleGroup && {
        'component-style-group': {
          type: 'void',
          'x-component': 'CollapseItem',
          'x-component-props': { defaultExpand: false },
          properties: {
            'x-component-props.style':
              this.mergeStyleSchema(componentStyleGroup),
          },
        },
      }
    );
  }

  mergeFormItemSchema = (decoratorProps: ISchema | boolean) => {
    if (decoratorProps === false) {
      return null;
    }
    if (decoratorProps === true) {
      return AllSchemas.FormItem;
    }
    return { ...AllSchemas.FormItem, ...decoratorProps };
  };

  createDecoratorSchema(decoratorGroup: ISchema | boolean) {
    return (
      decoratorGroup && {
        'decorator-group': {
          type: 'void',
          'x-component': 'CollapseItem',
          properties: {
            'x-decorator-props': this.mergeFormItemSchema(decoratorGroup),
          },
        },
      }
    );
  }

  createDecoratorStyleSchema(decoratorStyleGroup: ISchema | boolean) {
    return (
      decoratorStyleGroup && {
        'decorator-style-group': {
          type: 'void',
          'x-component': 'CollapseItem',
          'x-component-props': { defaultExpand: false },
          properties: {
            'x-decorator-props.style':
              this.mergeStyleSchema(decoratorStyleGroup),
          },
        },
      }
    );
  }

  createFieldGroup(fieldGroup?: { [key: string]: ISchema }): {
    [key: string]: ISchema;
  } {
    return {
      'field-group': {
        type: 'void',
        'x-component': 'CollapseItem',
        properties: {
          name: {
            type: 'string',
            'x-decorator': 'FormItem',
            'x-component': 'Input',
          },
          ...(fieldGroup ?? {}),
          'x-display': {
            type: 'string',
            enum: ['visible', 'hidden', 'none', ''],
            'x-decorator': 'FormItem',
            'x-component': 'Select',
            'x-component-props': {
              defaultValue: 'visible',
            },
          },
          'x-pattern': {
            type: 'string',
            enum: ['editable', 'disabled', 'readOnly', 'readPretty', ''],
            'x-decorator': 'FormItem',
            'x-component': 'Select',
            'x-component-props': {
              defaultValue: 'editable',
            },
          },
          'x-reactions': {
            'x-decorator': 'FormItem',
            'x-component': ReactionsSetter,
          },
        },
      },
    };
  }

  createSchema(props: SchemaProps) {
    const fieldGroup = this.createFieldGroup();
    const component = this.createComponentSchema(props?.component);
    const decorator = this.createDecoratorSchema(props?.decorator);
    const componentStyle = this.createComponentStyleSchema(
      props?.componentStyleGroup
    );
    const decoratorStyle = this.createDecoratorStyleSchema(
      props?.decoratorStyleGroup
    );

    return {
      type: 'object',
      properties: {
        ...fieldGroup,
        ...component,
        ...componentStyle,
        ...decorator,
        ...decoratorStyle,
      },
    } as unknown as ISchema;
  }
}
