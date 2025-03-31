import { getVirtulData } from '../utils/echarts';

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
const rectangleTree = [
  {
    name: 'nodeA',
    value: 10,
    children: [
      {
        name: 'nodeAa',
        value: 4
      },
      {
        name: 'nodeAb',
        value: 6
      }
    ]
  },
  {
    name: 'nodeB',
    value: 20,
    children: [
      {
        name: 'nodeBa',
        value: 20,
        children: [
          {
            name: 'nodeBa1',
            value: 20
          }
        ]
      }
    ]
  }
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
const treeData = [
  {
    "name": "analytics",
    "children": [
      {
        "name": "cluster",
        "children": [
          { "name": "AgglomerativeCluster", "value": 3938 },
          { "name": "CommunityStructure", "value": 3812 },
          { "name": "HierarchicalCluster", "value": 6714 },
          { "name": "MergeEdge", "value": 743 }
        ]
      },
      {
        "name": "graph",
        "children": [
          { "name": "BetweennessCentrality", "value": 3534 },
          { "name": "LinkDistance", "value": 5731 },
          { "name": "MaxFlowMinCut", "value": 7840 },
          { "name": "ShortestPaths", "value": 5914 },
          { "name": "SpanningTree", "value": 3416 }
        ]
      },
      {
        "name": "optimization",
        "children": [
          { "name": "AspectRatioBanker", "value": 7074 }
        ]
      }
    ]
  },
  {
    "name": "animate",
    "children": [
      { "name": "Easing", "value": 17010 },
      { "name": "FunctionSequence", "value": 5842 },
      {
        "name": "interpolate",
        "children": [
          { "name": "ArrayInterpolator", "value": 1983 },
          { "name": "ColorInterpolator", "value": 2047 },
          { "name": "DateInterpolator", "value": 1375 },
          { "name": "Interpolator", "value": 8746 },
          { "name": "MatrixInterpolator", "value": 2202 },
          { "name": "NumberInterpolator", "value": 1382 },
          { "name": "ObjectInterpolator", "value": 1629 },
          { "name": "PointInterpolator", "value": 1675 },
          { "name": "RectangleInterpolator", "value": 2042 }
        ]
      },
      { "name": "ISchedulable", "value": 1041 },
      { "name": "Parallel", "value": 5176 },
      { "name": "Pause", "value": 449 },
      { "name": "Scheduler", "value": 5593 },
      { "name": "Sequence", "value": 5534 },
      { "name": "Transition", "value": 9201 },
      { "name": "Transitioner", "value": 19975 },
      { "name": "TransitionEvent", "value": 1116 },
      { "name": "Tween", "value": 6006 }
    ]
  },
  {
    "name": "data",
    "children": [
      {
        "name": "converters",
        "children": [
          { "name": "Converters", "value": 721 },
          { "name": "DelimitedTextConverter", "value": 4294 },
          { "name": "GraphMLConverter", "value": 9800 },
          { "name": "IDataConverter", "value": 1314 },
          { "name": "JSONConverter", "value": 2220 }
        ]
      },
      { "name": "DataField", "value": 1759 },
      { "name": "DataSchema", "value": 2165 },
      { "name": "DataSet", "value": 586 },
      { "name": "DataSource", "value": 3331 },
      { "name": "DataTable", "value": 772 },
      { "name": "DataUtil", "value": 3322 }
    ]
  },
  {
    "name": "display",
    "children": [
      { "name": "DirtySprite", "value": 8833 },
      { "name": "LineSprite", "value": 1732 },
      { "name": "RectSprite", "value": 3623 },
      { "name": "TextSprite", "value": 10066 }
    ]
  },
  {
    "name": "flex",
    "children": [
      { "name": "FlareVis", "value": 4116 }
    ]
  },
  {
    "name": "physics",
    "children": [
      { "name": "DragForce", "value": 1082 },
      { "name": "GravityForce", "value": 1336 },
      { "name": "IForce", "value": 319 },
      { "name": "NBodyForce", "value": 10498 },
      { "name": "Particle", "value": 2822 },
      { "name": "Simulation", "value": 9983 },
      { "name": "Spring", "value": 2213 },
      { "name": "SpringForce", "value": 1681 }
    ]
  },
  {
    "name": "query",
    "children": [
      { "name": "AggregateExpression", "value": 1616 },
      { "name": "And", "value": 1027 },
      { "name": "Arithmetic", "value": 3891 },
      { "name": "Average", "value": 891 },
      { "name": "BinaryExpression", "value": 2893 },
      { "name": "Comparison", "value": 5103 },
      { "name": "CompositeExpression", "value": 3677 },
      { "name": "Count", "value": 781 },
      { "name": "DateUtil", "value": 4141 },
      { "name": "Distinct", "value": 933 },
      { "name": "Expression", "value": 5130 },
      { "name": "ExpressionIterator", "value": 3617 },
      { "name": "Fn", "value": 3240 },
      { "name": "If", "value": 2732 },
      { "name": "IsA", "value": 2039 },
      { "name": "Literal", "value": 1214 },
      { "name": "Match", "value": 3748 },
      { "name": "Maximum", "value": 843 },
      {
        "name": "methods",
        "children": [
          { "name": "add", "value": 593 },
          { "name": "and", "value": 330 },
          { "name": "average", "value": 287 },
          { "name": "count", "value": 277 },
          { "name": "distinct", "value": 292 },
          { "name": "div", "value": 595 },
          { "name": "eq", "value": 594 },
          { "name": "fn", "value": 460 },
          { "name": "gt", "value": 603 },
          { "name": "gte", "value": 625 },
          { "name": "iff", "value": 748 },
          { "name": "isa", "value": 461 },
          { "name": "lt", "value": 597 },
          { "name": "lte", "value": 619 },
          { "name": "max", "value": 283 },
          { "name": "min", "value": 283 },
          { "name": "mod", "value": 591 },
          { "name": "mul", "value": 603 },
          { "name": "neq", "value": 599 },
          { "name": "not", "value": 386 },
          { "name": "or", "value": 323 },
          { "name": "orderby", "value": 307 },
          { "name": "range", "value": 772 },
          { "name": "select", "value": 296 },
          { "name": "stddev", "value": 363 },
          { "name": "sub", "value": 600 },
          { "name": "sum", "value": 280 },
          { "name": "update", "value": 307 },
          { "name": "variance", "value": 335 },
          { "name": "where", "value": 299 },
          { "name": "xor", "value": 354 },
          { "name": "-", "value": 264 }
        ]
      },
      { "name": "Minimum", "value": 843 },
      { "name": "Not", "value": 1554 },
      { "name": "Or", "value": 970 },
      { "name": "Query", "value": 13896 },
      { "name": "Range", "value": 1594 },
      { "name": "StringUtil", "value": 4130 },
      { "name": "Sum", "value": 791 },
      { "name": "Variable", "value": 1124 },
      { "name": "Variance", "value": 1876 },
      { "name": "Xor", "value": 1101 }
    ]
  },
  {
    "name": "scale",
    "children": [
      { "name": "IScaleMap", "value": 2105 },
      { "name": "LinearScale", "value": 1316 },
      { "name": "LogScale", "value": 3151 },
      { "name": "OrdinalScale", "value": 3770 },
      { "name": "QuantileScale", "value": 2435 },
      { "name": "QuantitativeScale", "value": 4839 },
      { "name": "RootScale", "value": 1756 },
      { "name": "Scale", "value": 4268 },
      { "name": "ScaleType", "value": 1821 },
      { "name": "TimeScale", "value": 5833 }
    ]
  },
  {
    "name": "util",
    "children": [
      { "name": "Arrays", "value": 8258 },
      { "name": "Colors", "value": 10001 },
      { "name": "Dates", "value": 8217 },
      { "name": "Displays", "value": 12555 },
      { "name": "Filter", "value": 2324 },
      { "name": "Geometry", "value": 10993 },
      {
        "name": "heap",
        "children": [
          { "name": "FibonacciHeap", "value": 9354 },
          { "name": "HeapNode", "value": 1233 }
        ]
      },
      { "name": "IEvaluable", "value": 335 },
      { "name": "IPredicate", "value": 383 },
      { "name": "IValueProxy", "value": 874 },
      {
        "name": "math",
        "children": [
          { "name": "DenseMatrix", "value": 3165 },
          { "name": "IMatrix", "value": 2815 },
          { "name": "SparseMatrix", "value": 3366 }
        ]
      },
      { "name": "Maths", "value": 17705 },
      { "name": "Orientation", "value": 1486 },
      {
        "name": "palette",
        "children": [
          { "name": "ColorPalette", "value": 6367 },
          { "name": "Palette", "value": 1229 },
          { "name": "ShapePalette", "value": 2059 },
          { "name": "SizePalette", "value": 2291 }
        ]
      },
      { "name": "Property", "value": 5559 },
      { "name": "Shapes", "value": 19118 },
      { "name": "Sort", "value": 6887 },
      { "name": "Stats", "value": 6557 },
      { "name": "Strings", "value": 22026 }
    ]
  },
  {
    "name": "vis",
    "children": [
      {
        "name": "axis",
        "children": [
          { "name": "Axes", "value": 1302 },
          { "name": "Axis", "value": 24593 },
          { "name": "AxisGridLine", "value": 652 },
          { "name": "AxisLabel", "value": 636 },
          { "name": "CartesianAxes", "value": 6703 }
        ]
      },
      {
        "name": "controls",
        "children": [
          { "name": "AnchorControl", "value": 2138 },
          { "name": "ClickControl", "value": 3824 },
          { "name": "Control", "value": 1353 },
          { "name": "ControlList", "value": 4665 },
          { "name": "DragControl", "value": 2649 },
          { "name": "ExpandControl", "value": 2832 },
          { "name": "HoverControl", "value": 4896 },
          { "name": "IControl", "value": 763 },
          { "name": "PanZoomControl", "value": 5222 },
          { "name": "SelectionControl", "value": 7862 },
          { "name": "TooltipControl", "value": 8435 }
        ]
      },
      {
        "name": "data",
        "children": [
          { "name": "Data", "value": 20544 },
          { "name": "DataList", "value": 19788 },
          { "name": "DataSprite", "value": 10349 },
          { "name": "EdgeSprite", "value": 3301 },
          { "name": "NodeSprite", "value": 19382 },
          {
            "name": "render",
            "children": [
              { "name": "ArrowType", "value": 698 },
              { "name": "EdgeRenderer", "value": 5569 },
              { "name": "IRenderer", "value": 353 },
              { "name": "ShapeRenderer", "value": 2247 }
            ]
          },
          { "name": "ScaleBinding", "value": 11275 },
          { "name": "Tree", "value": 7147 },
          { "name": "TreeBuilder", "value": 9930 }
        ]
      },
      {
        "name": "events",
        "children": [
          { "name": "DataEvent", "value": 2313 },
          { "name": "SelectionEvent", "value": 1880 },
          { "name": "TooltipEvent", "value": 1701 },
          { "name": "VisualizationEvent", "value": 1117 }
        ]
      },
      {
        "name": "legend",
        "children": [
          { "name": "Legend", "value": 20859 },
          { "name": "LegendItem", "value": 4614 },
          { "name": "LegendRange", "value": 10530 }
        ]
      },
      {
        "name": "operator",
        "children": [
          {
            "name": "distortion",
            "children": [
              { "name": "BifocalDistortion", "value": 4461 },
              { "name": "Distortion", "value": 6314 },
              { "name": "FisheyeDistortion", "value": 3444 }
            ]
          },
          {
            "name": "encoder",
            "children": [
              { "name": "ColorEncoder", "value": 3179 },
              { "name": "Encoder", "value": 4060 },
              { "name": "PropertyEncoder", "value": 4138 },
              { "name": "ShapeEncoder", "value": 1690 },
              { "name": "SizeEncoder", "value": 1830 }
            ]
          },
          {
            "name": "filter",
            "children": [
              { "name": "FisheyeTreeFilter", "value": 5219 },
              { "name": "GraphDistanceFilter", "value": 3165 },
              { "name": "VisibilityFilter", "value": 3509 }
            ]
          },
          { "name": "IOperator", "value": 1286 },
          {
            "name": "label",
            "children": [
              { "name": "Labeler", "value": 9956 },
              { "name": "RadialLabeler", "value": 3899 },
              { "name": "StackedAreaLabeler", "value": 3202 }
            ]
          },
          {
            "name": "layout",
            "children": [
              { "name": "AxisLayout", "value": 6725 },
              { "name": "BundledEdgeRouter", "value": 3727 },
              { "name": "CircleLayout", "value": 9317 },
              { "name": "CirclePackingLayout", "value": 12003 },
              { "name": "DendrogramLayout", "value": 4853 },
              { "name": "ForceDirectedLayout", "value": 8411 },
              { "name": "IcicleTreeLayout", "value": 4864 },
              { "name": "IndentedTreeLayout", "value": 3174 },
              { "name": "Layout", "value": 7881 },
              { "name": "NodeLinkTreeLayout", "value": 12870 },
              { "name": "PieLayout", "value": 2728 },
              { "name": "RadialTreeLayout", "value": 12348 },
              { "name": "RandomLayout", "value": 870 },
              { "name": "StackedAreaLayout", "value": 9121 },
              { "name": "TreeMapLayout", "value": 9191 }
            ]
          },
          { "name": "Operator", "value": 2490 },
          { "name": "OperatorList", "value": 5248 },
          { "name": "OperatorSequence", "value": 4190 },
          { "name": "OperatorSwitch", "value": 2581 },
          { "name": "SortOperator", "value": 2023 }
        ]
      },
      { "name": "Visualization", "value": 16540 }
    ]
  }
];
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

/** Echarts示例数据源 */
export const EchartsData = {
  line: commonData,
  bar: commonData,
  pie: commonData,
  scatter: scatterData,
  candlestick: candlestickData,
  gauge: gaugeData,
  rectangleTree: rectangleTree,
  graph: graphData,
  tree: treeData,
  sunburst: sunburstData,
  funnel: funnelData,
  calendar: getVirtulData('2022'),
  histogram: commonData,
  surface: {
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
  base: commonData,
  annular: commonData,
  smooth: commonData,
  map: commonData,
};

// 由于extension没有安装echarts包 TODO: 把类型换成Record<TChartTypes, echarts.EChartsCoreOption>
export const EchartsOptions: Record<
  string,
  (data: any, name?: string, value?: string) => any
> = {
  // https://echarts.apache.org/examples/zh/editor.html?c=line-simple
  line: (source: any, name = 'name', value = 'value') => ({
    xAxis: {
      type: 'category',
      data: source.map(item => item[name]),
      axisLabel: {
        interval: 0
      }
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        data: source.map(item => item[value]),
        type: 'line'
      }
    ]
  }),
  smooth: (source: any, name = 'name', value = 'value') => ({
    xAxis: {
      type: 'category',
      data: source.map(item => item[name]),
      axisLabel: {
        interval: 0
      }
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        data: source.map(item => item[value]),
        type: 'line',
        smooth: true
      }
    ]
  }),
  bar: (source: any, name = 'name', value = 'value') => ({
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      }
    },
    legend: {},
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    xAxis: {
      type: 'value',
      boundaryGap: source.map(item => item[name]),
      axisLabel: {
        interval: 0
      }
    },
    yAxis: {
      type: 'category',
      data: source.map(item => item[value]),
    },
    series: [
      {
        name: value,
        type: 'bar',
        data: source.map(item => item[value]),
      },
    ]
  }),
  histogram: (source: any, name = 'name', value = 'value') => ({
    xAxis: {
      type: 'category',
      data: source.map(item => item[name]),
      axisLabel: {
        interval: 0
      }
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        data: source.map(item => item[value]),
        type: 'bar'
      }
    ]
  }),
  // https://echarts.apache.org/examples/zh/editor.html?c=pie-simple
  pie: (source: any, name = 'name', value = 'value') => ({
    title: {
      left: 'center'
    },
    tooltip: {
      trigger: 'item'
    },
    legend: {
      orient: 'vertical',
      left: 'left'
    },
    series: [
      {
        name: name,
        type: 'pie',
        radius: '50%',
        data: source.map(item => ({ value: item[value], name: item[name] })),
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        }
      }
    ]
  }),
  annular: (source: any, name = 'name', value = 'value') => ({
    tooltip: {
      trigger: 'item'
    },
    legend: {
      top: '5%',
      left: 'center'
    },
    series: [
      {
        name: name,
        type: 'pie',
        radius: ['40%', '70%'],
        avoidLabelOverlap: false,
        label: {
          show: false,
          position: 'center'
        },
        emphasis: {
          label: {
            show: true,
            fontSize: 40,
            fontWeight: 'bold'
          }
        },
        labelLine: {
          show: false
        },
        data: source.map(item => ({ value: item[value], name: item[name] }))
      }
    ]
  }),
  scatter: (source: any, name = 'x', value = 'y') => ({
    xAxis: {
      axisLabel: {
        interval: 0
      }
    },
    yAxis: {},
    series: [
      {
        symbolSize: 20,
        data: source.map(item => ([item[name], item[value]])),
        type: 'scatter'
      }
    ]
  }),
  candlestick: (source: any) => ({
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
  gauge: (source: any, name = 'name', value = 'value') => ({
    tooltip: {
      formatter: '{a} <br/>{b} : {c}%'
    },
    series: [
      {
        name: 'Pressure',
        type: 'gauge',
        detail: {
          formatter: '{value}'
        },
        data: source.map(item => ({ value: item[value], name: item[name] }))
      }
    ]
  }),
  rectangleTree: (source: any, name = 'name', value = 'value') => ({
    tooltip: {
      formatter: function (info) {
        return [
          '<div class="tooltip-title">' +
          info[name] +
          '</div>',
          info[value]
        ].join('');
      }
    },
    series: [
      {
        type: 'treemap',
        data: source
      }
    ]
  }),
  graph: (data: any) => ({
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
  tree: (data: any) => ({
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
  sunburst: (data: any) => ({
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
  funnel: (data: any) => ({
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
  calendar: (data: any) => ({
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
  surface: (parametricEquation: any) => ({
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
        parametricEquation,
      },
    ],
  }),
  map: (source: any, name = 'x', value = 'y') => ({
    xAxis: {
      axisLabel: {
        interval: 0
      }
    },
    yAxis: {},
    series: [
      {
        symbolSize: 20,
        data: source.map(item => ([item[name], item[value]])),
        type: 'scatter'
      }
    ]
  }),
};
