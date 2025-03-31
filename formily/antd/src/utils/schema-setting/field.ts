/**
 * @Author: 许伟茂
 * @Description: 绑定API字段schema定义
 * @Date: 2022/04/02 11:20
 */
import { EFieldType } from './types';

export function fieldSetting(fieldType?: EFieldType) {
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
    fieldName: {
      type: 'string',
      'x-decorator': 'FormItem',
      'x-component': 'BindGqlFieldSetter',
      'x-component-props': {
        fieldType,
        fieldData: '{{$form.values["fieldData"]}}',
        paramtype: '{{$form.values["paramtype"]}}',
      },
      'x-reactions': {
        fulfill: {
          state: {
            visible: '{{$form.values["fieldType"] != "custom"}}',
          },
        },
      },
    },
  };
}
