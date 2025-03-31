import { createResource } from 'low-code-core';
import {
  ArrayCards,
  ArrayTable,
  Card,
  Cascader,
  Checkbox,
  DatePicker,
  Field,
  Form,
  FormCollapse,
  FormGrid,
  FormLayout,
  FormTab,
  Input,
  NumberPicker,
  ObjectContainer,
  Radio,
  Rate,
  Select,
  Slider,
  Space,
  Switch,
  Text,
  TimePicker,
  Transfer,
  TreeSelect,
  Upload,
  ECharts,
  Div,
  Tooltip,
  Repeat,
  ProgressBar,
} from 'low-code-formily-antd';
import { transformToTreeNode } from 'low-code-formily-transformer';

import { DnFC } from 'low-code-react';

/** 聚合左侧组件 */
export const getRenderViewComponents = (): any => {
  return {
    Form,
    Field,
    Input,
    Select,
    TreeSelect,
    Cascader,
    Radio,
    Checkbox,
    Slider,
    Rate,
    NumberPicker,
    Transfer,
    DatePicker,
    TimePicker,
    Upload: Upload as DnFC<React.ComponentProps<any>>,
    Switch,
    Text,
    Card,
    ArrayCards,
    ArrayTable,
    Space,
    FormTab,
    FormCollapse,
    FormGrid,
    FormLayout,
    ObjectContainer,
    ECharts,
    Div,
    Repeat,
    ProgressBar,
    Tooltip,
  };
};
/** 基础组件 */
export const getBaseComponents = (): any[] => {
  return [
    Input,
    NumberPicker,
    Rate,
    Slider,
    Select,
    TreeSelect as DnFC<React.ComponentProps<typeof TreeSelect>>,
    Cascader,
    Radio,
    Checkbox,
    DatePicker,
    TimePicker,
    Transfer,
    Switch,
    Upload,
    // ObjectContainer,
    Tooltip,
    ProgressBar,
  ];
};

/** 布局组件 */
export const getLayoutComponents = (): any[] => {
  return [
    Card,
    FormGrid,
    FormTab,
    FormLayout,
    FormCollapse,
    Space,
    Repeat,
    Div,
  ];
};

/** 构建资源环境 */
export const createSource = (treeNode, title) => {
  return treeNode.children[0]?.children.map((item) =>
    createResource({
      title,
      elements: [item],
    })
  );
};

/* 格式化数据-组装分类模板节点 */
export const formatTree = (cateArr, temArr = []) => {
  const templateArr = temArr.slice(0);
  return cateArr.map((item) => {
    let children = [];
    templateArr.map((ins, index) => {
      if (
        ins.idPartialLayoutTemplCategory === item.idPartialLayoutTemplCategory
      ) {
        const content = JSON.parse(templateArr[index].layOutFileContent);
        const tree = transformToTreeNode(content);
        children.push(...createSource(tree, ins.na));
      }
    });
    return {
      title: item.na,
      key: item.idPartialLayoutTemplCategory,
      children,
    };
  });
};

/* 树列表请求 */
export const getLocalTemplate = async (
  idProduct,
  setSource,
  listPartialLayoutTemplCategories,
  listPartialLayoutTempl
) => {
  const res = await listPartialLayoutTemplCategories({ params: { idProduct } });
  const template = await listPartialLayoutTempl({
    params: {
      idProduct,
      eusActiveStatus: [1],
    },
  });
  const arr = formatTree(res, template);
  setSource(arr);
};
