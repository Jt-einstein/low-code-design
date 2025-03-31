import React from 'react';
import { Progress } from 'antd';
import type { ProgressProps } from 'antd';
import { DnFC } from 'low-code-react';
import { observer } from '@formily/reactive-react';
import { createBehavior, createResource } from 'low-code-core';
import { VoidFieldSchema } from '../../components/Field';
import { AllLocales } from '../../locales';
import { FormatPainterOutlined } from '@ant-design/icons';

export const ProgressBar: DnFC<ProgressProps> = observer((props) => {
  const {
    percent,
    format,
    showInfo,
    size,
    status,
    strokeColor,
    strokeLinecap,
    success,
    trailColor,
    steps,
    strokeWidth,
    width,
    gapDegree,
    gapPosition,
    style,
    className,
  } = props;

  return (
    <Progress
      data-designer-node-id={props?.['data-designer-node-id']}
      style={style}
      className={className}
      percent={percent}
      format={format}
      showInfo={showInfo}
      status={status}
      strokeColor={strokeColor}
      strokeLinecap={strokeLinecap}
      success={success}
      trailColor={trailColor}
      steps={steps}
      strokeWidth={strokeWidth}
      width={width}
      gapDegree={gapDegree}
      gapPosition={gapPosition}
      size={size}
    />
  );
});

/**
 * 需要在此路径注册
 * 1、/low-code/formily/design/src/widgets/layouts/TabsLayout/RenderView.tsx (getRenderViewComponents, 然后按分类二次放置) - 组件注册
 * 2、/low-code/formily/antd/src/locales 语言注册
 * 3、/low-code/formily/antd/src/schemas/mcui-biz/ProgressBar.ts 属性注册
 */

ProgressBar.Behavior = createBehavior({
  name: 'ProgressBar',
  extends: ['Field'],
  selector: (node) => node.props['x-component'] === 'ProgressBar',
  designerProps: {
    droppable: true,
    propsSchema: new VoidFieldSchema().createSchema(),
    icon: <FormatPainterOutlined />,
  },
  designerLocales: AllLocales.ProgressBar,
});

ProgressBar.Resource = createResource({
  icon: <FormatPainterOutlined />,
  elements: [
    {
      componentName: 'Field',
      props: {
        type: 'void',
        'x-component': 'ProgressBar',
        'x-component-props': {
          percent: 30,
          style: {
            width: '100%',
            height: '50px',
          },
        },
      },
    },
  ],
});
