import { ETableType } from 'low-code-extension';
import { Field } from '@formily/core';
export function tableSetting(fieldType?: ETableType) {
  const creatReaction = (field: Field) => {
    const apiName1 = field.query('apiName').value();
    const bindType = field.query('bindType').value();
    field.query('rowKey').take().setComponentProps({
      api: apiName1,
      bindType: bindType,
    });
  };
  return {
    tableType: {
      type: 'string',
      enum: Object.values(ETableType),
      'x-decorator': 'FormItem',
      'x-component': 'Select',
      'x-component-props': {
        defaultValue: fieldType || ETableType.DEFAULT,
      },
    },
    rowKey: {
      type: 'string',
      'x-decorator': 'FormItem',
      'x-component': 'ParamterSetter',
      'x-component-props': {
        isRowKey: true,
      },
      'x-reactions': creatReaction
    },
  };
}
