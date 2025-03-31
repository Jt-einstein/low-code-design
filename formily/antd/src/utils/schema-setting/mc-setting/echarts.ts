import { Field } from '@formily/core';

const layoutComponents = [
  'Space',
  'FormLayout',
  'FormGrid',
  'FormCollapse',
  'McTab',
  'McCollapse',
  'FormArea',
];

export const echartDataSetting = () => {
  const creatReaction = (field: Field, form: any) => {
    const componentName = form.$values['x-component'];
    const bindType = field.query('bindType').value();
    if (
      [
        'BarChart',
        'Pie',
        'LineChart',
        'Histogram',
        'ScatterPlot',
        'IndicatorCard',
        ...layoutComponents,
      ].includes(componentName) ||
      !bindType ||
      bindType === 'gql' ||
      bindType === 'openApi'
    ) {
      field.setDisplay('hidden');
    } else {
      field.setDisplay('visible');
    }
  };
  const allReaction = (field: Field) => {
    const bindType = field.query('bindType').value();
    if (!bindType || bindType === 'gql' || bindType === 'openApi') {
      field.setDisplay('hidden');
    } else {
      field.setDisplay('visible');
    }
  };
  const fieldReaction = (field: Field) => {
    const bindType = field.query('bindType').value();
    if (bindType && ['gql', 'openApi'].includes(bindType)) {
      field.setDisplay('visible');
    } else {
      field.setDisplay('hidden');
    }
  };
  const scatterReaction = (field: Field, form: any) => {
    const componentName = form.$values['x-component'];
    const bindType = field.query('bindType').value();
    if (
      !bindType ||
      bindType === 'gql' ||
      bindType === 'openApi' ||
      componentName !== 'ScatterPlot'
    ) {
      field.setDisplay('hidden');
    } else {
      field.setDisplay('visible');
    }
  };
  /* 树、矩形树显示 */
  const treeReaction = (field: Field, form: any) => {
    const componentName = form.$values['x-component'];
    const bindType = field.query('bindType').value();
    if (
      !bindType ||
      bindType === 'gql' ||
      bindType === 'openApi' ||
      !['RectangleTree', 'TreeGraph'].includes(componentName)
    ) {
      field.setDisplay('hidden');
    } else {
      field.setDisplay('visible');
    }
  };
  /* 树、矩形树、散点图不显示 */
  const chartTreeReaction = (field: Field, form: any) => {
    const componentName = form.$values['x-component'];
    const bindType = field.query('bindType').value();
    if (
      [
        'IndicatorCard',
        'BarChart',
        'Pie',
        'LineChart',
        'Histogram',
        ...layoutComponents,
      ].includes(componentName) ||
      !bindType ||
      bindType === 'gql' ||
      bindType === 'openApi'
    ) {
      field.setDisplay('hidden');
    } else {
      field.setDisplay('visible');
    }
  };
  const chartDataGroupTypeReaction = (field: Field, form: any) => {
    const componentName = form.$values['x-component'];
    const bindType = field.query('bindType').value();
    if (
      ['BarChart', 'Pie', 'LineChart', 'Histogram'].includes(componentName) &&
      bindType &&
      !['gql', 'openApi'].includes(bindType)
    ) {
      field.setDisplay('visible');
    } else {
      field.setDisplay('none');
    }
  };
  return {
    bindType: {
      type: 'string',
      'x-decorator': 'FormItem',
      'x-component': 'Select',
    },
    fieldData: {
      'x-component': 'BindFieldDataSetter',
      'x-component-props': {
        bindType: '{{$form.values["bindType"]}}',
      },
      'x-reactions': fieldReaction,
    },
    bindDataset: {
      type: 'string',
      'x-decorator': 'FormItem',
      'x-component': 'BindDataMainSetter',
      'x-component-props': {
        fieldType: '04',
      },
      'x-reactions': allReaction,
    },
    chartDataGroupType: {
      type: 'string',
      'x-decorator': 'FormItem',
      'x-component': 'ChartStatisticsSetter',
      'x-reactions': chartDataGroupTypeReaction,
    },
    groupByField: {
      type: 'string',
      'x-display': 'hidden',
    },
    groupByFunction: {
      type: 'string',
      'x-display': 'hidden',
    },
    dataSetColumns: {
      type: 'string',
      'x-display': 'hidden',
    },
    chartlabel: {
      type: 'string',
      'x-decorator': 'FormItem',
      'x-component': 'TagNumSetter',
      'x-component-props': {
        dataSet: '{{$form.values["bindDataset"]}}',
        bindType: '{{$form.values["bindType"]}}',
      },
      'x-reactions': creatReaction,
    },
    chartdata: {
      type: 'string',
      'x-decorator': 'FormItem',
      'x-component': 'TagNumSetter',
      'x-component-props': {
        dataSet: '{{$form.values["bindDataset"]}}',
        bindType: '{{$form.values["bindType"]}}',
      },
      'x-reactions': chartTreeReaction,
    },
    scatterlable: {
      type: 'string',
      'x-decorator': 'FormItem',
      'x-component': 'TagNumSetter',
      'x-component-props': {
        dataSet: '{{$form.values["bindDataset"]}}',
        bindType: '{{$form.values["bindType"]}}',
      },
      'x-reactions': scatterReaction,
    },
    scatterdata: {
      type: 'string',
      'x-decorator': 'FormItem',
      'x-component': 'TagNumSetter',
      'x-component-props': {
        dataSet: '{{$form.values["bindDataset"]}}',
        bindType: '{{$form.values["bindType"]}}',
      },
      'x-reactions': scatterReaction,
    },
    treeid: {
      type: 'string',
      'x-decorator': 'FormItem',
      'x-component': 'TagNumSetter',
      'x-component-props': {
        dataSet: '{{$form.values["bindDataset"]}}',
        bindType: '{{$form.values["bindType"]}}',
      },
      'x-reactions': treeReaction,
    },
    treeidPar: {
      type: 'string',
      'x-decorator': 'FormItem',
      'x-component': 'TagNumSetter',
      'x-component-props': {
        dataSet: '{{$form.values["bindDataset"]}}',
        bindType: '{{$form.values["bindType"]}}',
      },
      'x-reactions': treeReaction,
    },
  };
};
