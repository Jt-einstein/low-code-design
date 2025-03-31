import React, { useEffect } from 'react';
import {
  FormGrid as FormilyGird,
  IFormGridProps,
  IGridColumnProps,
} from '@formily/antd';
import { createBehavior, createResource } from 'low-code-core';
import {
  DnFC,
  useTreeNode,
  useNodeIdProps,
  DroppableWidget,
} from 'low-code-react';
import { observer } from '@formily/reactive-react';
import { VoidFieldSchema } from '../Field';
import { AllSchemas } from '../../schemas';
import { AllLocales } from '../../locales';
import './styles.less';
import { AddGridColumn } from './components/AddGridColumn';
import { Grid } from '@formily/grid';
import { useField } from '@formily/react';
import { InteractionOutlined } from '@ant-design/icons';

type formilyGrid = React.FC<IFormGridProps & { gridColumnBorder?: string }> & {
  GridColumn: React.FC<IGridColumnProps>;
  useFormGrid: () => Grid<HTMLElement>;
  createFormGrid: (props: IFormGridProps) => Grid<HTMLElement>;
  /**
   * @deprecated
   */
  useGridSpan: (gridSpan: number) => number;
  /**
   * @deprecated
   */
  useGridColumn: (gridSpan: number) => number;
};

export const FormGrid: DnFC<React.ComponentProps<formilyGrid>> & {
  GridColumn?: React.FC<React.ComponentProps<formilyGrid['GridColumn']>>;
} = observer((props) => {
  const node = useTreeNode();
  const field = useField();
  const nodeId = useNodeIdProps();
  if (node.children.length === 0) return <DroppableWidget {...props} />;

  const key = new Date().getTime();

  useEffect(() => {
    if (props?.gridColumnBorder && props?.gridColumnBorder !== 'none') {
      (node?.children ?? []).map((column) =>
        column?.setProps({
          ...column?.props,
          'x-component-props': {
            ...column?.props['x-component-props'],
            style: {
              ...column?.props['x-component-props']?.style,
              borderStyle: props?.gridColumnBorder,
              borderWidth: '1px',
              borderColor: 'rgba(196,208,221,1)',
              margin: '0px -1px -1px 0px',
            },
          },
        })
      );
    }
  }, [props?.gridColumnBorder]);

  return (
    <div {...nodeId} className="dn-grid">
      <FormilyGird
        {...props}
        key={key}
        className={
          field.description?.props?.children ||
          field?.description ||
          props?.className
        }
      >
        {props.children}
      </FormilyGird>
    </div>
  );
});

FormGrid.GridColumn = observer((props) => {
  return (
    <DroppableWidget
      {...props}
      data-span={props.gridSpan}
      style={{
        ...props['style'],
        gridColumnStart: `span ${props.gridSpan || 1}`,
      }}
    >
      {props.children}
    </DroppableWidget>
  );
});

FormGrid.Behavior = createBehavior(
  {
    name: 'FormGrid',
    extends: ['Field'],
    selector: (node) => node.props['x-component'] === 'FormGrid',
    designerProps: {
      droppable: true,
      allowDrop: (node) => node.props['x-component'] !== 'FormGrid',
      propsSchema: new VoidFieldSchema().createSchema({
        component: AllSchemas.FormGrid,
      }),
      icon: <InteractionOutlined />,
    },
    designerLocales: AllLocales.FormGrid,
  },
  {
    name: 'FormGrid.GridColumn',
    extends: ['Field'],
    selector: (node) => node.props['x-component'] === 'FormGrid.GridColumn',
    designerProps: {
      droppable: true,
      resizable: {
        width(node) {
          const span = Number(node.props['x-component-props']?.gridSpan ?? 1);
          return {
            plus: () => {
              if (span + 1 > 12) return;
              node.props['x-component-props'] =
                node.props['x-component-props'] || {};
              node.props['x-component-props'].gridSpan = span + 1;
            },
            minus: () => {
              if (span - 1 < 1) return;
              node.props['x-component-props'] =
                node.props['x-component-props'] || {};
              node.props['x-component-props'].gridSpan = span - 1;
            },
          };
        },
      },
      resizeXPath: 'x-component-props.gridSpan',
      resizeStep: 1,
      resizeMin: 1,
      resizeMax: 12,
      allowDrop: (node) => node.props['x-component'] === 'FormGrid',
      propsSchema: new VoidFieldSchema().createSchema({
        component: AllSchemas.FormGrid.GridColumn,
      }),
      icon: <InteractionOutlined />,
      customAction: ({ node }) => {
        return <AddGridColumn node={node} />;
      },
    },
    designerLocales: AllLocales.FormGridColumn,
  }
);
const defaultStyle = {
  'x-component-props': {
    style: {
      width: '100%',
      height: '40px',
    },
    authorset: [],
  },
};
FormGrid.Resource = createResource({
  icon: <InteractionOutlined />,
  elements: [
    {
      componentName: 'Field',
      props: {
        type: 'void',
        'x-component': 'FormGrid',
        ...defaultStyle,
        'x-reactions': {
          fulfill: {
            run: '',
          },
        },
      },
      children: [
        {
          componentName: 'Field',
          props: {
            type: 'void',
            'x-component': 'FormGrid.GridColumn',
            ...defaultStyle,
          },
        },
        {
          componentName: 'Field',
          props: {
            type: 'void',
            'x-component': 'FormGrid.GridColumn',
            ...defaultStyle,
          },
        },
        {
          componentName: 'Field',
          props: {
            type: 'void',
            'x-component': 'FormGrid.GridColumn',
            ...defaultStyle,
          },
        },
      ],
    },
  ],
});
