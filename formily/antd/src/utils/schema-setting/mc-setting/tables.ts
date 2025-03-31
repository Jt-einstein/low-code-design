import { Field } from "@formily/core";

export const tablesSetting = () => {
  const creatReaction = (field: Field) => {
    const bindType = field.query('bindType').value();
    if (bindType === 'gql' || bindType === 'openApi') {
      field.setDisplay('none');
    } else {
      field.setDisplay('visible');
    }
  };
  const tableKeyReaction = (field: Field, form: any) => {
    const componentName = form.$values['x-component'];
    const bindType = field.query('bindType').value();
    if (bindType === 'gql' || bindType === 'openApi' || ['Text', 'QueryArea'].includes(componentName)) {
      field.setDisplay('none');
    } else {
      field.setDisplay('visible');
    }
  };
  const textReaction = (field: Field, form: any) => {
    const componentName = form.$values['x-component'];
    if (componentName === 'Text') {
      field.setDisplay('visible');
    } else {
      field.setDisplay('none');
    }
  };
  return {
    bindTableset: {
      type: 'string',
      'x-decorator': 'FormItem',
      'x-component': 'BindDataMainSetter',
      'x-component-props': {
        fieldType: '04'
      },
      'x-reactions': creatReaction
    },
    // bindsort: {
    //   type: 'string',
    //   'x-decorator': 'FormItem',
    //   'x-component': 'Collation',
    // },
    tableKey: {
      type: 'string',
      'x-decorator': 'FormItem',
      'x-component': 'TagNumSetter',
      'x-component-props': {
        dataSet: '{{$form.values["bindTableset"]}}',
        bindType: '{{$form.values["bindType"]}}',
      },
      'x-reactions': tableKeyReaction
    },
    textKey: {
      type: 'string',
      'x-decorator': 'FormItem',
      'x-component': 'TagNumSetter',
      'x-component-props': {
        dataSet: '{{$form.values["bindTableset"]}}',
        bindType: '{{$form.values["bindType"]}}',
      },
      'x-reactions': textReaction
    },
  };
};
export const tablesColumnSetting = () => {
  return {
    tablesColumnKey: {
      type: 'string',
      'x-decorator': 'FormItem',
      'x-component': 'TagNumSetter',
      'x-component-props': {
        dataSet: '{{$form.values["bindTableset"]}}',
      },
    },
  };
};