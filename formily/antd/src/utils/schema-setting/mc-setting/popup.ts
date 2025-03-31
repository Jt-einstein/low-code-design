import { EOperationBtnType } from 'low-code-extension';

export function popupSetting() {
  return {
    /* 打开弹窗/打开抽屉 */
    checkPopup: {
      type: 'string',
      'x-decorator': 'FormItem',
      'x-component': 'PageSelect',
      'x-component-props': {
        actionType: '{{$form.values["actionType"]}}',
      },
      'x-reactions': {
        fulfill: {
          state: {
            visible: `{{$form.values["x-component"] == "McButton" && $form.values["actionType"] === '${EOperationBtnType.OPEN_POPUP}'}}`,
          },
        },
      },
    },
  };
}
