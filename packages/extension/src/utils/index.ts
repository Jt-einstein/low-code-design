/**
 * @Author: 许伟茂
 * @Description: 工具类
 * @Date: 2022/03/31 14:04
 */

import {
  ENodeType,
  EOperationType,
  TBindInterfaceProps,
  TParentNode,
} from '../types';
export { default as PinYin } from './pinYin';
export { default as TreeHelper } from './treeHelper';
export * from './loadcss';
import { LOW_CODE_VAR, OPERATION_TYPE, SELECTED_ROW } from '../consts';
import { triggerQuery } from '../template/button';
import { setButtonEnable } from '../template/buttonState';
import TreeHelper from './treeHelper';

export const list2Tree = TreeHelper?.list2Tree;

/** 获取父级组件参数 */
export function getParentProps(node): TParentNode {
  let parent = node?.parent;
  while (!!parent) {
    const parentProps = parent?.props;
    if (
      [
        ENodeType.OPERATION_AREA_PARENT /** 操作区父级 */,
        ENodeType.OPERATION_AREA /** 操作区 */,
        ENodeType.QUERY_AREA_PARENT /** 查询区父级 */,
        ENodeType.QUERY_AREA /** 查询区 */,
        ENodeType.Modal /** 弹窗 */,
        ENodeType.SideSheet /** 抽屉 */,
        ENodeType.TABLE /** 普通表格 */,
        ENodeType.MC_TABLE /** McTable表格 */,
        ENodeType.MC_PROTABLE /** McProTable表格 */,
        ENodeType.MC_FORM_TAB /** MC_FORM_TAB设计态TAB */,
        ENodeType.MC_TAB_PANEL /** MC_TAB_PANEL设计态TAB PANEL */,
        ENodeType.IndicatorCard /** 指标卡*/,
      ].includes(parentProps?.['x-component'])
    ) {
      return {
        type: parentProps?.['x-component'],
        props: parentProps,
        dataSource: parent?.dataSource,
      };
    }
    parent = parent?.parent;
  }

  return null;
}
/** 获取父级组件参数 */
export function getParentNode(node): any {
  let parent = node?.parent;
  while (!!parent) {
    const parentProps = parent?.props;
    if (
      [ENodeType.FORM_AREA /** 表单区 */].includes(parentProps?.['x-component'])
    ) {
      return {
        type: node?.parent?.parent?.props?.['x-component'],
        props: node?.parent?.parent?.props,
      };
    }

    parent = parent?.parent;
  }

  return null;
}
/**
 * 组件查询方法
 * @param name 组件名称
 * @param action 交互逻辑
 * @param action 更多交互逻辑
 */

export function getComponent(
  name: string,
  action: string,
  moreAction?: string
) {
  return `Object.keys($form?.indexes || {}).forEach((key) => {
  const fieldState = $form.getFieldState(key);
  if (fieldState?.component?.length > 1 && fieldState?.component?.[0] == '${name}') {
    ${action}
  }
  ${moreAction ? moreAction : ''}})`;
}

/**
 * 解析url参数
 * @param paramName
 * @returns
 */
export function getUrlParam(paramName: string) {
  const search = location.search.substr(1); // 得到类似于 a=10&b=20&c=30
  const reg = new RegExp(`(^|&)${paramName}=([^&]*)(&|$)`, 'i'); // i 忽略大小写
  const res = search.match(reg); // 返回格式 0: "a=10&" 1: "" 2: "10" 3: "&" groups: undefined index: 0 input: "a=10&b=20&c=30"
  if (res === null) {
    return null;
  }
  return res[2];
}
/**
 * 将返回的字典数据格式化为 {field: dataSource}，方便按字段设置组件拾取器数据源
 * select 组件 {label, value}、picker 组件 { cd 编码, na 名称}
 * @param data 字典数据
 */
export const standardDataFormat = (data: any[]) => {
  const tempObj: any = {};
  data.forEach((item) => {
    tempObj[`${item.cd}`] = item.sdItemList?.map((subItem: any) => {
      return {
        key: subItem.cd,
        label: subItem.na,
        value: subItem.cd,
        ...subItem,
      };
    });
  });
  return tempObj;
};

export const list2Select = (data: any[], valueKey = 'cd', isfilter = false) => {
  return data.map((item) => {
    let obj: any = {};
    obj = {
      key: item[valueKey],
      label: item.na,
      title: item.na,
      value: item[valueKey],
    };
    if (isfilter) {
      obj.sdCdScCatgType = item.sdCdScCatgType;
    }
    return obj;
  });
};

/** 获取第一个页子节点 */
export const getFirstLeafChild = <T extends { key: string }>(
  list: T[],
  childAttr = 'children'
): { node: T; keys: string[] } => {
  if (list[0]) {
    if (list[0][childAttr]?.length) {
      const children = getFirstLeafChild(list[0][childAttr], childAttr);
      return {
        node: children.node as T,
        keys: [...children.keys, list[0].key],
      };
    } else {
      return { node: list[0], keys: [list[0].key] };
    }
  } else {
    return null;
  }
};

type TProps = {
  domain?: string;
  gqlName?: string;
};

/** 初始化接口 */
export const genDataInit = (props: TProps) => {
  if (!props) {
    return '';
  }
  const { domain, gqlName } = props || {};
  return `
/**
 * 组件初始化
 **/
$effect(() => {
  $api.${domain}.${gqlName}().then(res => {
    const data = res?.data?.${gqlName}?.dataList || res?.data?.${gqlName} || [];
    console.log('data', data);
    // 格式化后赋值给组件的dataSource
    // $self.dataSource 
  });
}, []);`;
};
/** 弹窗组件初始化接口 */
export const genDialogInit = (props: TBindInterfaceProps) => {
  if (!props) {
    return '';
  }
  const { domain, createGqlName, updateGqlName, primaryKeyField } = props || {};
  return `function closeSide() {
      /* 关闭滑动侧边栏 */
      $self.setComponentProps({
        visible: false,
      });
    }
    function getKeys() {
      const sideKey = Object.values($form.indexes).filter(
        (key) => $form.fields[key].decoratorType === "FormItem" &&
        key.includes($self.address.segments[0]));
      /* 包含当前节点的容器组件的key */
      const decoratorKey = Object.values($form.indexes).filter(
       (key) =>!$form.fields[key].decoratorType &&
       $form.fields[key].componentType !== "McButton" &&
         key.includes($self.address.segments[0]));
      const Modified = sideKey.some((item) => $form.getFieldState(item).modified);
      return {
        sideKey,
        decoratorKey,
        Modified,
      };
    }
    $props({
      /** 确认事件 */
      onOk() {
        const { sideKey,decoratorKey } = getKeys();
        /* 收集错误信息 */
        let Error = []; let params ={};
        $form
          .validate()
          .then(async() => {
            if (!Error.length) {
              const operationType = $values?.${LOW_CODE_VAR}?.${OPERATION_TYPE} || '${
    EOperationType.ADD
  }';
               sideKey.forEach(item=>{
                const key = item.split('.')[decoratorKey.length];
                params[key]=$values[key];
              })
              /* 注意不同接口的入参不同,这里的params需要手动拼接--接口定义的入参key */
              if (operationType == '${EOperationType.ADD}'&& ${
    createGqlName ? true : false
  }) { // 新增操作
                res = await $api.${domain}.${createGqlName}(params);
              } else if (operationType == '${EOperationType.EDIT}' && ${
    updateGqlName ? true : false
  }) { // 编辑操作
                if(${primaryKeyField ? true : false}) {
                  params.${primaryKeyField} = $values?.${LOW_CODE_VAR}?.${SELECTED_ROW}?.${primaryKeyField};
                }
                params.syMvcc = $values?.${LOW_CODE_VAR}?.${SELECTED_ROW}?.syMvcc;
                res =await $api.${domain}.${updateGqlName}(params);
              } else {
                $message.error('操作类型有误！');
                return;
              }
              if(res.data[operationType == '${
                EOperationType.ADD
              }' ? '${createGqlName}' : '${updateGqlName}' ]) {
                $message.success(operationType == '${
                  EOperationType.ADD
                }' ? '新增成功' : '修改成功');
                ${triggerQuery()}
                // 设置按钮状态
                ${setButtonEnable(
                  [EOperationType.EDIT, EOperationType.SAVE],
                  false
                )}
                closeSide();
              }
            }
          })
          .catch((err) => {
            if (Object.prototype.toString.call(err) === "[object Array]") {
              Error = sideKey.filter((item) =>
                err.find((ins) => ins.address !== item)
              );
            }
          });
      },
      /** 取消事件 */
      onCancel() {
        const { sideKey, Modified } = getKeys();
        if (Modified) {
          $Modal.confirm({
            title: "确定放弃对数据的修改吗?",
            onOk() {
              sideKey.forEach((item) => $form.query(item).take().reset());
              closeSide();
            },
          });
          return;
        }
        closeSide();
      },
    });`;
};
/** 抽屉组件初始化接口 */
export const genSideSheetgInit = (props: TBindInterfaceProps) => {
  if (!props) {
    return '';
  }
  const { domain, createGqlName, updateGqlName, primaryKeyField } = props || {};
  return `function closeSide() {
      /* 关闭滑动侧边栏 */
      $self.setComponentProps({
        visible: false,
      });
    }
    function getKeys() {
      const sideKey = Object.values($form.indexes).filter(
        (key) => $form.fields[key].decoratorType === "FormItem" &&
        key.includes($self.address.segments[0]));
      /* 包含当前节点的容器组件的key */
      const decoratorKey = Object.values($form.indexes).filter(
       (key) =>!$form.fields[key].decoratorType &&
       $form.fields[key].componentType !== "McButton" &&
         key.includes($self.address.segments[0]));
      const Modified = sideKey.some((item) => $form.getFieldState(item).modified);
      return {
        sideKey,
        decoratorKey,
        Modified,
      };
    }
    $props({
      /** 确认事件 */
      onOk() {
        const { sideKey,decoratorKey } = getKeys();
        /* 收集错误信息 */
        let Error = []; let params ={};
        $form
          .validate()
          .then(async() => {
            if (!Error.length) {
              const operationType = $values?.${LOW_CODE_VAR}?.${OPERATION_TYPE} || '${
    EOperationType.ADD
  }';
               sideKey.forEach(item=>{
                const key = item.split('.')[decoratorKey.length];
                params[key]=$values[key];
              })
              /* 注意不同接口的入参不同,这里的params需要手动拼接--接口定义的入参key */
              if (operationType == '${EOperationType.ADD}'&& ${
    createGqlName ? true : false
  }) { // 新增操作
                res = await $api.${domain}.${createGqlName}(params);
              } else if (operationType == '${EOperationType.EDIT}' && ${
    updateGqlName ? true : false
  }) { // 编辑操作
                if(${primaryKeyField ? true : false}) {
                  params.${primaryKeyField} = $values?.${LOW_CODE_VAR}?.${SELECTED_ROW}?.${primaryKeyField};
                }
                params.syMvcc = $values?.${LOW_CODE_VAR}?.${SELECTED_ROW}?.syMvcc;
                res =await $api.${domain}.${updateGqlName}(params);
              } else {
                $message.error('操作类型有误！');
                return;
              }
              if(res.data[operationType == '${
                EOperationType.ADD
              }' ? '${createGqlName}' : '${updateGqlName}' ]) {
                $message.success(operationType == '${
                  EOperationType.ADD
                }' ? '新增成功' : '修改成功');
                ${triggerQuery()}
                // 设置按钮状态
                ${setButtonEnable(
                  [EOperationType.EDIT, EOperationType.SAVE],
                  false
                )}
                closeSide();
              }
            }
          })
          .catch((err) => {
            if (Object.prototype.toString.call(err) === "[object Array]") {
              Error = sideKey.filter((item) =>
                err.find((ins) => ins.address !== item)
              );
            }
          });
      },
      /** 取消事件 */
      onClose() {
        const { sideKey, Modified } = getKeys();
        if (Modified) {
          $Modal.confirm({
            title: "确定放弃对数据的修改吗?",
            onOk() {
              sideKey.forEach((item) => $form.query(item).take().reset());
              closeSide();
            },
          });
          return;
        }
        closeSide();
      },
    });`;
};

/**
 * 多层对象合并
 * @param target
 * @param sources
 * @returns
 */
export const assiginObj = (target = {}, sources = {}) => {
  let obj = target;
  if (typeof target != 'object' || typeof sources != 'object') {
    return sources; // 如果其中一个不是对象 就返回sources
  }
  for (let key in sources) {
    // 如果target也存在 那就再次合并
    if (target.hasOwnProperty(key)) {
      obj[key] = assiginObj(target[key], sources[key]);
    } else {
      // 不存在就直接添加
      obj[key] = sources[key];
    }
  }

  return obj;
};
import assign from 'lodash/assign';
import cloneDeep from 'lodash/cloneDeep';
export default class TreeHelp {
  /**
   * 列表转树结构
   * @param list 列表数据
   * @param Key
   * @param pKey
   * @param rootId
   */
  public static listToTree(
    list: any[],
    key: string,
    pKey: string,
    rootId: any = null
  ) {
    const treeObj = {};
    const _list = cloneDeep(list);
    let rootKey;
    _list.forEach((item) => {
      if (item[pKey] === undefined) {
        item[pKey] = rootId;
      }
      if (item[pKey] === rootId) {
        rootKey = item[key];
      }
      item['children'] = [];
      treeObj[item[key]] = item;
    });
    return _list.filter((item) => {
      if (item[pKey] !== rootId) {
        if (treeObj[item[pKey]]) {
          treeObj[item[pKey]].children.push(item);
          return false;
        } else if (treeObj[rootKey]) {
          // 此节点，找不到父节点，挂根节点
          treeObj[rootKey].children.push(item);
          return false;
        }
        // 找不到父节点，同时也不存在根节点则平铺出来，不做过滤隐藏
      }
      return true;
    });
  }

  private static rootListToTree<T>(
    list: T[],
    maps: Record<string, T[]>,
    keyName: string,
    childKey = 'children'
  ): T[] {
    const tree: T[] = [];
    list.map((item) => {
      const nItem = assign({}, item);
      tree.push(nItem);
      const children = maps[item[keyName]];
      if (children) {
        nItem[childKey] = TreeHelp.rootListToTree(
          children,
          maps,
          keyName,
          childKey
        );
      }
    });
    return tree;
  }
}

export const listToTree = (
  listData: any[],
  key = 'cd',
  pKey = 'idPar',
  rootId: any = null,
  renderlabel: string = null,
  name: any = null
) => {
  return TreeHelp.listToTree(
    listData.map((item) => {
      return {
        ...item,
        label: item.label || item[renderlabel] || item.na,
        value: item[name] || item[key],
        key: item.key || item[key],
        title: item[renderlabel] || item.title || item.na,
        // expand: true,
      };
    }),
    key,
    pKey,
    rootId
  );
};

/** 获取当前树节点数据 */
export const getTreeNodeData = (tree: any[], key: string) => {
  let data;
  const run = (t: any) => {
    if (t?.key === key) {
      data = t;
      return 1;
    }
    if (t?.children?.length) {
      for (const _t of t.children) {
        if (run(_t)) {
          return 1;
        }
      }
    }
  };

  for (const t of tree) {
    if (run(t)) {
      break;
    }
  }

  return data;
};

export const deepErgodic = <T extends { children?: T[]; [key: string]: any }>(
  tree: T[],
  callback: (node: T, parent: T, path: T[], index: number, _tree: T[]) => T
): T[] => {
  const _tree = cloneDeep(tree);
  const needAnalysisNodes: T[] = [];
  const ergodic = (
    node: T,
    i: number,
    fn: (node: T, parent: T, path: T[], index: number, _tree: T[]) => T
  ) => {
    needAnalysisNodes.push(node);
    let children: T[];
    if (node.children?.length) {
      children = node.children.reduce((total, current, idx) => {
        const _node = ergodic(current, idx, fn);
        return _node ? [...total, _node] : total;
      }, []);
    }
    const _node = fn(
      { ...node, children },
      needAnalysisNodes[needAnalysisNodes.length - 2],
      needAnalysisNodes,
      i,
      _tree
    );
    needAnalysisNodes.pop();
    return _node;
  };
  return _tree.reduce((total, current, i) => {
    const node = ergodic(current, i, callback);
    return node ? [...total, node] : total;
  }, []);
};
