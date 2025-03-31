import { EOperationBtnType } from 'low-code-extension';

export function dialogSetting() {
  return {
    /* 打开弹窗/打开抽屉 */
    checkDialog: {
      type: 'string',
      'x-decorator': 'FormItem',
      'x-component': 'PageSelect',
      'x-component-props': {
        actionType: '{{$form.values["actionType"]}}',
      },
      'x-reactions': {
        fulfill: {
          state: {
            visible: `{{$form.values["x-component"] == "McButton" && $form.values["actionType"] === '${EOperationBtnType.PAGE_DIALOG}'}}`,
          },
        },
      },
    },
  };
}
