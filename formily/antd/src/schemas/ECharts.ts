import { ISchema } from '@formily/react';

export const ChartTypes = [
  { label: '折线图', value: 'line' },
  { label: '柱状图', value: 'bar' },
  { label: '饼图', value: 'pie' },
  { label: '散点图', value: 'scatter' },
  { label: 'K线图', value: 'candlestick' },
  { label: '仪表盘', value: 'gauge' },
  // { label: '路径图', value: 'lines' },
  { label: '关系图', value: 'graph' },
  { label: '树图', value: 'tree' },
  { label: '旭日图', value: 'sunburst' },
  { label: '漏斗图', value: 'funnel' },
  { label: '日历图', value: 'calendar' },
  { label: '3D曲面', value: 'surface' },
] as const;

export type TChartTypes = Pick<typeof ChartTypes[number], 'value'>['value'];

export const ECharts: ISchema & { TextArea?: ISchema } = {
  type: 'object',
  properties: {

    /** 绑定gql接口  */
    bindGql: {
      type: 'void',
    },
    type: {
      type: 'string',
      enum: ChartTypes as any,
      'x-decorator': 'FormItem',
      'x-component': 'Select',
      default: 'line',
    },
    title: {
      type: 'string',
      'x-decorator': 'FormItem',
      'x-component': 'Input',
      default: '标题',
    },
    maxRecords: {
      type: 'number',
      'x-decorator': 'FormItem',
      'x-component': 'NumberPicker',
      'x-component-props': {
        defaultValue: 20,
        min: 0,
        max: 200,
      },
      'x-reactions': {
        fulfill: {
          state: {
            visible:
              '{{["line", "bar", "pie"].includes($form.values?.["x-component-props"]?.type)}}',
          },
        },
      }
    },
  },
};
