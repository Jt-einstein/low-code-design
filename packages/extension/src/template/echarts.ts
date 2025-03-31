import { CHART_DATA, LOW_CODE_VAR } from '../consts';
import { getVirtulData, JSONStringify } from '../utils/echarts';

type TProps = {
  type?: string;
  domain?: string;
  gqlName?: string;
};

const commonData = [
  { name: '数据1', value: 10 },
  { name: '数据2', value: 18 },
  { name: '数据3', value: 17 },
  { name: '数据4', value: 16 },
  { name: '数据5', value: 8 },
  { name: '数据6', value: 9 },
  { name: '数据7', value: 21 },
];

const scatterData = [
  { x: 10.0, y: 8.04 },
  { x: 8.07, y: 6.95 },
  { x: 13.0, y: 7.58 },
  { x: 9.05, y: 8.81 },
  { x: 11.0, y: 8.33 },
  { x: 14.0, y: 7.66 },
  { x: 13.4, y: 6.81 },
  { x: 10.0, y: 6.33 },
  { x: 14.0, y: 8.96 },
  { x: 12.5, y: 6.82 },
  { x: 9.15, y: 7.2 },
  { x: 11.5, y: 7.2 },
  { x: 3.03, y: 4.23 },
  { x: 12.2, y: 7.83 },
  { x: 2.02, y: 4.47 },
  { x: 1.05, y: 3.33 },
  { x: 4.05, y: 4.96 },
  { x: 6.03, y: 7.24 },
  { x: 12.0, y: 6.26 },
  { x: 12.0, y: 8.84 },
  { x: 7.08, y: 5.82 },
  { x: 5.02, y: 5.68 },
];

const candlestickData = [
  {
    date: '2017-10-24',
    open: 20,
    close: 34,
    highest: 10,
    lowest: 38,
  },
  {
    date: '2017-10-25',
    open: 40,
    close: 35,
    highest: 30,
    lowest: 50,
  },
  {
    date: '2017-10-26',
    open: 31,
    close: 38,
    highest: 33,
    lowest: 44,
  },
  {
    date: '2017-10-27',
    open: 38,
    close: 15,
    highest: 5,
    lowest: 42,
  },
];

const gaugeData = [
  {
    value: 71,
    name: 'SCORE',
  },
];

const graphData = [
  {
    name: 'Node 1',
    x: 300,
    y: 300,
  },
  {
    name: 'Node 2',
    x: 800,
    y: 300,
  },
  {
    name: 'Node 3',
    x: 550,
    y: 100,
  },
  {
    name: 'Node 4',
    x: 550,
    y: 500,
  },
];

// 树图数据
const treeData = {
  name: 'flare',
  children: [
    { name: 'DragForce', value: 1082 },
    { name: 'GravityForce', value: 1336 },
    { name: 'IForce', value: 319 },
    { name: 'NBodyForce', value: 10498 },
    { name: 'Particle', value: 2822 },
    { name: 'Simulation', value: 9983 },
    { name: 'Spring', value: 2213 },
    { name: 'SpringForce', value: 1681 },
  ],
};
// 旭日图数据
const sunburstData = [
  {
    name: 'Grandpa',
    children: [
      {
        name: 'Uncle Leo',
        value: 15,
        children: [
          {
            name: 'Cousin Jack',
            value: 2,
          },
          {
            name: 'Cousin Mary',
            value: 5,
            children: [
              {
                name: 'Jackson',
                value: 2,
              },
            ],
          },
          {
            name: 'Cousin Ben',
            value: 4,
          },
        ],
      },
      {
        name: 'Father',
        value: 10,
        children: [
          {
            name: 'Me',
            value: 5,
          },
          {
            name: 'Brother Peter',
            value: 1,
          },
        ],
      },
    ],
  },
  {
    name: 'Nancy',
    children: [
      {
        name: 'Uncle Nike',
        children: [
          {
            name: 'Cousin Betty',
            value: 1,
          },
          {
            name: 'Cousin Jenny',
            value: 2,
          },
        ],
      },
    ],
  },
];

// 漏斗图数据
const funnelData = [
  { value: 60, name: 'Visit' },
  { value: 40, name: 'Inquiry' },
  { value: 20, name: 'Order' },
  { value: 80, name: 'Click' },
  { value: 100, name: 'Show' },
];

// 由于extension没有安装echarts包 TODO: 把类型换成Record<TChartTypes, echarts.EChartsCoreOption>
export const EchartsOptions: Record<string, any> = {
  // https://echarts.apache.org/examples/zh/editor.html?c=line-simple
  line: (source = commonData) => ({
    dataset: {
      dimensions: ['name', 'value'],
      source,
    },
    xAxis: {
      type: 'category',
      axisLabel: {
        interval: 0
      }
    },
    // 空对象代表显示坐标轴, 也可以写成 { show: true }
    yAxis: {},
    series: {
      type: 'line',
    },
  }),
  // https://echarts.apache.org/examples/zh/editor.html?c=bar-simple
  bar: (source = commonData) => ({
    dataset: {
      dimensions: ['name', 'value'],
      source,
    },
    xAxis: {
      type: 'category',
      axisLabel: {
        interval: 0
      }
    },
    yAxis: {},
    series: {
      type: 'bar',
    },
  }),
  // https://echarts.apache.org/examples/zh/editor.html?c=pie-simple
  pie: (source = commonData) => ({
    dataset: {
      dimensions: ['name', 'value'],
      source,
    },
    series: {
      type: 'pie',
    },
  }),
  // https://echarts.apache.org/examples/zh/editor.html?c=scatter-simple
  scatter: (source = scatterData) => ({
    xAxis: {
      axisLabel: {
        interval: 0
      }
    },
    yAxis: {},
    series: {
      type: 'scatter',
    },
    dataset: {
      dimensions: ['x', 'y'],
      source,
    },
  }),
  // https://echarts.apache.org/examples/zh/editor.html?c=candlestick-simple
  candlestick: (source = candlestickData) => ({
    xAxis: {
      type: 'category', axisLabel: {
        interval: 0
      }
    },
    yAxis: {},
    series: {
      type: 'candlestick',
    },
    dataset: {
      dimensions: ['date', 'open', 'close', 'highest', 'lowest'],
      source,
    },
  }),
  // https://echarts.apache.org/examples/zh/editor.html?c=gauge
  gauge: (source = gaugeData) => ({
    // xAxis: {},
    // yAxis: {},
    series: {
      type: 'gauge',
    },
    dataset: {
      source,
    },
  }),
  // https://echarts.apache.org/examples/zh/editor.html?c=lines-bmap
  // lines: {},
  // https://echarts.apache.org/examples/zh/editor.html?c=graph-simple
  graph: (data = graphData) => ({
    tooltip: {},
    animationDurationUpdate: 1500,
    animationEasingUpdate: 'quinticInOut',
    series: {
      type: 'graph',
      symbolSize: 50,
      // roam: true,
      label: {
        show: true,
      },
      edgeSymbol: ['circle', 'arrow'],
      edgeSymbolSize: [4, 10],
      edgeLabel: {
        fontSize: 20,
      },
      links: [
        {
          source: 0,
          target: 1,
          symbolSize: [5, 20],
          label: {
            show: true,
          },
          lineStyle: {
            width: 5,
            curveness: 0.2,
          },
        },
        {
          source: 'Node 2',
          target: 'Node 1',
          label: {
            show: true,
          },
          lineStyle: {
            curveness: 0.2,
          },
        },
        {
          source: 'Node 1',
          target: 'Node 3',
        },
        {
          source: 'Node 2',
          target: 'Node 3',
        },
        {
          source: 'Node 2',
          target: 'Node 4',
        },
        {
          source: 'Node 1',
          target: 'Node 4',
        },
      ],
      lineStyle: {
        opacity: 0.9,
        width: 2,
        curveness: 0,
      },
      data,
    },
  }),
  // https://echarts.apache.org/examples/zh/editor.html?c=tree-basic
  tree: (data = treeData) => ({
    tooltip: {
      trigger: 'item',
      triggerOn: 'mousemove',
    },
    series: [
      {
        type: 'tree',
        data,
        top: '1%',
        left: '7%',
        bottom: '1%',
        right: '20%',
        symbolSize: 7,
        label: {
          position: 'left',
          verticalAlign: 'middle',
          align: 'right',
          fontSize: 9,
        },
        leaves: {
          label: {
            position: 'right',
            verticalAlign: 'middle',
            align: 'left',
          },
        },
        emphasis: {
          focus: 'descendant',
        },
        expandAndCollapse: true,
        animationDuration: 550,
        animationDurationUpdate: 750,
      },
    ],
  }),
  // https://echarts.apache.org/examples/zh/editor.html?c=sunburst-simple
  sunburst: (data = sunburstData) => ({
    series: {
      type: 'sunburst',
      // emphasis: {
      //     focus: 'ancestor'
      // },
      data,
      radius: [0, '90%'],
      label: {
        rotate: 'radial',
      },
    },
  }),
  // https://echarts.apache.org/examples/zh/editor.html?c=funnel
  funnel: (data = funnelData) => ({
    tooltip: {
      trigger: 'item',
      formatter: '{a} <br/>{b} : {c}%',
    },
    legend: {
      data: ['Show', 'Click', 'Visit', 'Inquiry', 'Order'],
    },
    series: [
      {
        name: 'Funnel',
        type: 'funnel',
        left: '10%',
        top: 60,
        bottom: 60,
        width: '80%',
        min: 0,
        max: 100,
        minSize: '0%',
        maxSize: '100%',
        sort: 'descending',
        gap: 2,
        label: {
          show: true,
          position: 'inside',
        },
        labelLine: {
          length: 10,
          lineStyle: {
            width: 1,
            type: 'solid',
          },
        },
        itemStyle: {
          borderColor: '#fff',
          borderWidth: 1,
        },
        emphasis: {
          label: {
            fontSize: 20,
          },
        },
        data,
      },
    ],
  }),
  // https://echarts.apache.org/examples/zh/editor.html?c=calendar-simple
  calendar: (data = getVirtulData('2022')) => ({
    visualMap: {
      show: false,
      min: 0,
      max: 10000,
    },
    calendar: {
      range: ['2022-07-01', '2022-12-31'],
    },
    series: {
      type: 'heatmap',
      coordinateSystem: 'calendar',
      data,
    },
  }),
  // https://echarts.apache.org/examples/zh/editor.html?c=sphere-parametric-surface&gl=1
  surface: () => ({
    tooltip: {},
    visualMap: {
      show: false,
      dimension: 2,
      min: -1,
      max: 1,
      inRange: {
        color: [
          '#313695',
          '#4575b4',
          '#74add1',
          '#abd9e9',
          '#e0f3f8',
          '#ffffbf',
          '#fee090',
          '#fdae61',
          '#f46d43',
          '#d73027',
          '#a50026',
        ],
      },
    },
    xAxis3D: {},
    yAxis3D: {},
    zAxis3D: {},
    grid3D: {},
    series: [
      {
        type: 'surface',
        parametric: true,
        // shading: 'albedo',
        parametricEquation: {
          u: {
            min: -Math.PI,
            max: Math.PI,
            step: Math.PI / 20,
          },
          v: {
            min: 0,
            max: Math.PI,
            step: Math.PI / 20,
          },
          x: (u, v) => {
            return Math.sin(v) * Math.sin(u);
          },
          y: (u, v) => {
            return Math.sin(v) * Math.cos(u);
          },
          z: (u, v) => {
            return Math.cos(v);
          },
        },
      },
    ],
  }),
};

/**
 * 内置操作默认配置
 */
export function echartsReactions(props?: TProps) {
  const { domain, gqlName, type } = props || {};
  // 如果没有绑定接口，根据类型设置默认的配置
  if (type && !domain && !gqlName) {
    return `
      $effect(() => {
        const option = ${JSONStringify(EchartsOptions[type]?.())};
        $self.setComponentProps({ option });
      }, []);     
    `;
  }

  if (!domain || !gqlName) {
    return '';
  }

  return `
    /**
     * 从接口获取数据
     **/
    $effect(() => {
      $api.${domain}.${gqlName}().then(res => {
        const data = res?.data?.${gqlName}?.dataList || res?.data?.${gqlName} || [];
        console.log($self.path.entire, data);

        $form.setValuesIn(\`${LOW_CODE_VAR}.${CHART_DATA}.\${$self.path.entire}\`, data);       
      });
    }, []);   


    /**
    * 监听数据变化
    **/ 
    $effect(() => {
      const source = ($values?.${LOW_CODE_VAR}?.${CHART_DATA}?.[$self.path.entire] || []).map(
        (item, index) => ({
          name: item.na,
          value: index
        })
      );

      const defaultOption = ${JSONStringify(EchartsOptions[type]?.())};

      $self.setComponentProps({
        option: {
          ...defaultOption,
          dataset: {
            dimensions: ["name", "value"],
            source,
          },
        },
      })        
      }, [$values?.${LOW_CODE_VAR}?.${CHART_DATA}?.[$self.path.entire]]);
  `;
}
