/**
 * @Author: 许伟茂
 * @Description: 绑定实体/字段schema定义
 * @Date: 2022/03/30 11:20
 */
import { EFieldType } from './types';

export default function (fieldType?: EFieldType) {
  return {
    fieldType: {
      type: 'string',
      enum: Object.values(EFieldType),
      'x-decorator': 'FormItem',
      'x-component': 'Select',
      'x-component-props': {
        defaultValue: fieldType || EFieldType.CUSTOM,
      },
    },
    entityId: {
      type: 'string',
      'x-decorator': 'FormItem',
      'x-component': 'Text',
      'x-display': 'none',
      'x-component-props': {
        fieldType,
      },
    },
    entityName: {
      type: 'string',
      'x-decorator': 'FormItem',
      'x-component': 'BindEntityFieldSetter',
      'x-component-props': {
        fieldType,
      },
      'x-reactions': {
        fulfill: {
          state: {
            visible: '{{$form.values["fieldType"] == "entity"}}',
          },
        },
      },
    },
    fieldId: {
      type: 'string',
      'x-decorator': 'FormItem',
      'x-component': 'BindEntityFieldSetter',
      'x-component-props': {
        fieldType,
      },
      'x-reactions': {
        fulfill: {
          state: {
            visible: '{{$form.values["fieldType"] == "field"}}',
          },
        },
      },
    },
  };
}
