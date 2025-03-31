/**
 * @format
 * @Description: Tree相关算法
 * @Autho: 张培博
 * @Date:2019/8/1 15:10
 */

import assign from 'lodash/assign';
import concat from 'lodash/concat';
import filter from 'lodash/filter';
import flowRight from 'lodash/flowRight';
import forEach from 'lodash/forEach';
import isEmpty from 'lodash/isEmpty';
import _map from 'lodash/map';
import reduce from 'lodash/reduce';
import uniqBy from 'lodash/uniqBy';
import cloneDeep from 'lodash/cloneDeep';

import PinYin from './pinYin';

export default class TreeHelper {
  /**
   * List转成Tree结构
   */
  public static list2Tree<T>(
    list: T[],
    keyName: string,
    pkeyName: string,
    isRoot: (item: T) => boolean,
    childKey = 'children'
  ): T[] {
    const maps = {};
    const rooList: T[] = [];

    _map(list, (item) => {
      if (!item[pkeyName] || isRoot(item)) {
        rooList.push(item);
      } else {
        let cList = maps[item[pkeyName]];
        if (!cList) {
          maps[item[pkeyName]] = cList = [];
        }
        cList.push(item);
      }
    });
    const tree = TreeHelper.rootListToTree(rooList, maps, keyName, childKey);

    return tree;
  }

  /**
   * 将Tree结构转换为数组结构（包含根节点)
   * @param treeOrList
   * @param keyName
   * @returns {any[]}
   */
  public static tree2List<T>(treeOrList: T | T[], keyName: string, childKey = 'children') {
    if (isEmpty(treeOrList)) {
      return [];
    }
    return flowRight(
      (_list: any[]) => filter(_list, (item) => !!item), // 排空
      (aMap) =>
        reduce(
          aMap as any,
          (preResult, item) => {
            preResult.push(item);
            return preResult;
          },
          []
        ),
      TreeHelper.buildIdWithSelfMap
    )(treeOrList, keyName, {}, childKey);
  }

  /**
   * 模糊搜索树
   * @param tree
   * @param searchStr
   * @param keyName
   * @param titleName
   * @param pKeyName
   */
  public static getTreeInSearch<T>(
    tree: T | T[],
    searchStr: string,
    keyName: string,
    titleName: string,
    pKeyName: string,
    isRoot: (item: T) => boolean,
    childKey = 'children'
  ): T | T[] {
    if (!searchStr) {
      return tree;
    }
    const _dataMap = TreeHelper.buildIdWithSelfMap(tree, keyName, {}, childKey);
    // //  先登记直接关联项: item[]
    let _list = [];
    for (const [, item] of Object.entries(_dataMap)) {
      if (PinYin.fuzzySearch(item[titleName], searchStr)) {
        _list.push(item);
      }
    }
    //  查找关联项
    _list = concat(_list, TreeHelper.findAllFather(_list, _dataMap, keyName, pKeyName));
    // 去重
    _list = uniqBy(_list, keyName);
    const result = TreeHelper.list2Tree(_list, keyName, pKeyName, isRoot, childKey);
    return Array.isArray(tree) ? result : result[0];
  }

  /**
   * 反向查找树结构上的所有父级节点
   * @param cList: 需要查找父节点的节点
   * @param dataMap
   * @param keyName
   * @param pKeyName
   * @param initMap
   */
  static findAllFather<T>(
    cList: T[],
    dataMap: { [path: string]: T },
    keyName: string,
    pKeyName: string,
    initMap?: Map<string, T>
  ): T[] {
    const _initMap = initMap || new Map();
    const _parentMap = new Map();
    forEach(cList, (item) => {
      // eslint-disable-next-line no-prototype-builtins
      if (dataMap.hasOwnProperty(item[pKeyName])) {
        _parentMap.set(item[pKeyName], dataMap[item[pKeyName]]);
        _initMap.set(item[pKeyName], dataMap[item[pKeyName]]);
      }
    });
    if (_parentMap.size) {
      TreeHelper.findAllFather([..._parentMap.values()], dataMap, keyName, pKeyName, _initMap);
    }
    return _initMap.size ? [..._initMap.values()] : [];
  }

  /**
   * 构建id->T的map结构, todo: Object以数字为键时，会导致从小到大的顺序被遍历出，进而会导致顺序错乱
   * @param treeOrList
   * @param keyName
   * @param preMap
   * @returns {*|{}}
   */
  public static buildIdWithSelfMap<T>(
    treeOrList: T | T[],
    keyName: string,
    preMap = {},
    childKey = 'children'
  ): { [dataIndex: string]: T } {
    const map = preMap || {};
    if (Array.isArray(treeOrList)) {
      _map(treeOrList, (item) => {
        TreeHelper.buildIdWithSelfMap(item, keyName, map, childKey);
      });
      return map;
    }

    map[treeOrList[keyName]] = treeOrList || {};
    _map(treeOrList[childKey], (item) => {
      TreeHelper.buildIdWithSelfMap(item, keyName, map, childKey);
    });
    return map;
  }

  public static buildIdMapByList<T>(
    list: T[],
    keyName: string,
    preMap = {},
    childName = 'children'
  ): { [path: string]: T } {
    const map = preMap;
    _map(list, (item) => {
      map[item[keyName]] = item;
      if (!!item[childName] && item[childName].length > 0) {
        TreeHelper.buildIdMapByList(item[childName], keyName, map, childName);
      }
    });
    return map as { [path: string]: T };
  }

  /**
   * 列表转树结构
   * @param list 列表数据
   * @param Key
   * @param pKey
   * @param rootId
   */
  public static list2tree2(list: any[], key: string, pKey: string, rootId: any = null) {
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
      treeObj[item[key]] = item;
    });
    return _list.filter((item) => {
      if (item[pKey] !== rootId) {
        if (treeObj[item[pKey]]) {
          if (!treeObj[item[pKey]]?.children) {
            treeObj[item[pKey]].children = [];
          }
          treeObj[item[pKey]].children.push(item);
          return false;
        } else if (treeObj[rootKey]) {
          // 此节点，找不到父节点，挂根节点
          if (!treeObj[rootKey]?.children) {
            treeObj[rootKey].children = [];
          }
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
    maps: { [idValue: string]: T[] },
    keyName: string,
    childKey = 'children'
  ): T[] {
    const tree: T[] = [];
    list.map((item) => {
      const nItem = assign({}, item);
      tree.push(nItem);
      const children = maps[item[keyName]];
      if (children) {
        nItem[childKey] = TreeHelper.rootListToTree(children, maps, keyName, childKey);
      }
    });
    return tree;
  }

  public static listToTree(listData: any[], key = 'cd', pKey = 'idPar', rootId: any = null) {
    return TreeHelper.list2tree2(
      listData.map((item) => {
        return {
          ...item,
          label: item.label || item.na,
          value: item[key],
          key: item.key || item[key],
          title: item.title || item.na,
        };
      }),
      key,
      pKey,
      rootId
    );
  }
}
