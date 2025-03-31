import { EOperationBtnType } from 'low-code-extension';

export function sideSheetSetting() {
  return {
    /* 打开弹窗/打开抽屉 */
    checkSideSheet: {
      type: 'string',
      'x-decorator': 'FormItem',
      'x-component': 'PageSelect',
      'x-component-props': {
        actionType: '{{$form.values["actionType"]}}',
      },
      'x-reactions': {
        fulfill: {
          state: {
            visible: `{{$form.values["x-component"] == "McButton" && $form.values["actionType"] === '${EOperationBtnType.OPEN_SIDESHEET}'}}`,
          },
        },
      },
    },
  };
}
export const fieldDataSetting = () => {
  return {
    fieldData: {
      'x-component': 'BindFieldDataSetter',
      'x-component-props': {
        bindType: '{{$form.values["bindType"]}}',
      },
    },
  };
};