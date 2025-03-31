import React, { useEffect, useRef, useState } from 'react';
import { createBehavior, createResource } from 'low-code-core';
import { DnFC } from 'low-code-react';
import { observer } from '@formily/reactive-react';
import { echarts } from '../../common/BasicEChart';
import { EchartsOptions, EchartsData, template } from 'low-code-extension';
import { TChartTypes } from '../../schemas/ECharts';
import { Empty } from 'antd';

import { AllLocales } from '../../locales';
import { AllSchemas } from '../../schemas';
import { FieldSchema } from '../Field';
import { AreaChartOutlined } from '@ant-design/icons';

type TECharts = {
  style: React.CSSProperties;
  type: TChartTypes;
  title: string;
  option: echarts.EChartsCoreOption;
  /** 最大展示记录数 */
  maxRecords?: number;
  /** 是否显示空态 */
  isEmpty?: boolean;
};

export const ECharts: DnFC<TECharts> = observer((props) => {
  const { type, maxRecords = 20, isEmpty } = props;
  let timer = null;
  const { width, height } = props.style || {};
  const ref = useRef<HTMLDivElement>();
  const echart = useRef<echarts.ECharts>();
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    echart.current = echarts.init(ref.current);
  }, []);

  useEffect(() => {
    const option = props.option || EchartsOptions[type]?.(EchartsData[type]);
    const title = {
      text: props.title,
      ...(option?.title as Record<string, any>),
    };

    const _dataset = option?.dataset;

    // 折线图/柱状图/饼图 限制最大记录数
    const dataset = ['line', 'bar', 'pie'].includes(type)
      ? {
          ..._dataset,
          source: _dataset?.source?.slice(0, maxRecords),
        }
      : _dataset;

    echart.current.setOption(
      {
        ...option,
        dataset,
        title,
      },
      // 不合并配置，否则切换不同类型的图表时，会把其他类型的默认配置合并
      { notMerge: true }
    );
    /* 当props.option变化后，需要重绘Echarts */
    echart.current.resize();
  }, [props.option, props.title, type, maxRecords]);

  useEffect(() => {
    // 当宽高变化时重新调整画板大小
    echart.current.resize();
  }, [width, height]);

  useEffect(() => {
    timer && clearTimeout(timer);
    // 延迟加载图表，确保父容器已加载，这样给Echarts设置的100%宽高才能生效
    timer = setTimeout(() => {
      setLoaded(true);
      echart.current.resize();
    }, 100);

    function onResize() {
      echart.current.resize();
    }

    window.addEventListener('resize', onResize);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', onResize);
    };
  }, []);

  if (isEmpty) {
    return (
      <Empty
        style={{ width: '100%', padding: '152px 0' }}
        description="暂无数据，请检查是否已正确绑定接口"
      />
    );
  }
  return (
    <div
      style={{
        ...props.style,
        width: width ?? '100%',
        height: height ?? 400,
      }}
    >
      <div
        ref={ref}
        style={{
          // Echarts初始化时需要设置默认宽高，否则控制台会报warning
          width: loaded
            ? '100%'
            : props?.style?.width
            ? props?.style?.width
            : 350,
          height: loaded ? '100%' : 400,
          visibility: loaded ? 'visible' : 'hidden',
        }}
      />
    </div>
  );
});

ECharts.Behavior = createBehavior({
  name: 'ECharts',
  extends: ['Field'],
  selector: (node) => node.props['x-component'] === 'ECharts',
  designerProps: {
    propsSchema: new FieldSchema().createSchema({
      component: AllSchemas.DatePicker.RangePicker,
    }),
    icon: <AreaChartOutlined />,
  },
  designerLocales: AllLocales.DateRangePicker,
});

ECharts.Resource = createResource({
  icon: <AreaChartOutlined />,
  elements: [
    {
      componentName: 'Field',
      props: {
        type: 'void',
        'x-decorator': 'FormItem',
        'x-component': 'ECharts',
        'x-reactions': {
          fulfill: {
            run: template.chartScript?.default(),
          },
        },
        'x-component-props': {
          type: 'line',
        },
      },
    },
  ],
});
