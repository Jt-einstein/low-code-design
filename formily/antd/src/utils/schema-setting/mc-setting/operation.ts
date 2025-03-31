import { EOperationBtnType } from 'low-code-extension';

export function btnSetting(fieldType?: EOperationBtnType) {
  return {
    actionType: {
      type: 'string',
      enum: Object.values(EOperationBtnType),
      'x-decorator': 'FormItem',
      'x-component': 'Select',
      'x-component-props': {
        defaultValue: fieldType,
        size: 'middle',
      },
    },
  };
}
