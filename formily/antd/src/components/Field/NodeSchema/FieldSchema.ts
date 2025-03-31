import { BaseFieldSchema } from './BaseFieldSchema';
import {
  DataSourceSetter,
  ReactionsSetter,
  ValidatorSetter,
} from 'low-code-setters';
import { ISchema } from '@formily/react';
import { SchemaProps } from './BaseFieldSchema';

export class FieldSchema extends BaseFieldSchema {
  constructor() {
    super();
  }

  createSchema(props?: SchemaProps) {
    return super.createSchema({
      ...props,
      decorator: props?.decorator ?? true,
      componentStyleGroup: props?.componentStyleGroup ?? true,
      decoratorStyleGroup: props?.decoratorStyleGroup ?? true,
    });
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
            'x-reactions': {
              fulfill: {
                state: {
                  disabled: '{{$form.values["fieldType"] == "field"}}',
                },
              },
            },
          },
          title: {
            type: 'string',
            'x-decorator': 'FormItem',
            'x-component': 'Input',
            'x-reactions': {
              fulfill: {
                state: {
                  visible:
                    '{{["SideSheet","Modal","BasicTitleBar"].includes($form.values["x-component"])  ? false : true}}',
                },
              },
            },
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
          default: {
            'x-decorator': 'FormItem',
            'x-component': 'ValueInput',
          },
          enum: {
            'x-decorator': 'FormItem',
            'x-component': DataSourceSetter,
          },
          'x-reactions': {
            'x-decorator': 'FormItem',
            'x-component': ReactionsSetter,
          },
          'x-validator': {
            type: 'array',
            'x-component': ValidatorSetter,
          },
          required: {
            type: 'boolean',
            'x-decorator': 'FormItem',
            'x-component': 'Switch',
          },
        },
      },
    };
  }
}
