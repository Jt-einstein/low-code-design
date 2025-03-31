import { EOperationBtnType } from 'low-code-extension';

export function pageSetting() {
  return {
    checkPage: {
      type: 'string',
      'x-decorator': 'FormItem',
      'x-component': 'PageSelect',
      'x-component-props': {
        actionType: '{{$form.values["actionType"]}}',
        isPage: true
      },
      'x-reactions': {
        fulfill: {
          state: {
            visible: `{{$form.values["x-component"] == "McButton" && $form.values["actionType"] === '${EOperationBtnType.OPEN_PAGE}'}}`,
          },
        },
      },
    }
  };
}
