/**
 * @Author: 许伟茂
 * @Description: 操作类型定义
 * @Date: 2022/04/13 19:35
 */
/* 按钮类型 */
import { EOperationType } from '../types';

const COperationType = {
  [EOperationType.ADD]: 'iconnew-node-1',
  [EOperationType.SAVE]: 'iconpreserve-1',
  [EOperationType.SAVE_ADD]: 'iconpresever-add-1',
  [EOperationType.EDIT]: 'iconedit-1',
  [EOperationType.DELETE]: 'icontrash-1',
  [EOperationType.RESET]: 'iconreset-1',
  [EOperationType.ENABLE]: 'iconenable-1',
  [EOperationType.DISABLE]: 'icondisable-1',
  [EOperationType.REFRESH]: 'iconrefresh-1',
  [EOperationType.PRINT]: 'iconprinting-1',
  [EOperationType.BACK]: 'iconreturn-1',
  [EOperationType.CUSTOM]: '',
};

const COperationTypeName = {
  [EOperationType.ADD]: '新增',
  [EOperationType.SAVE]: '保存',
  [EOperationType.SAVE_ADD]: '保存新增',
  [EOperationType.EDIT]: '编辑',
  [EOperationType.DELETE]: '删除',
  [EOperationType.SEARCH]: '查询',
  [EOperationType.RESET]: '重置',
  [EOperationType.ENABLE]: '启用',
  [EOperationType.DISABLE]: '停用',
  [EOperationType.REFRESH]: '刷新',
  [EOperationType.PRINT]: '打印',
  [EOperationType.BACK]: '返回',
  [EOperationType.CUSTOM]: '自定义',
};

/* 按钮类型 */
const COperationGqlType = {
  [EOperationType.ADD]: '', // 触发保存
  [EOperationType.SAVE]: '',
  [EOperationType.SAVE_ADD]: '',
  [EOperationType.EDIT]: '', // 触发保存
  [EOperationType.DELETE]: 'delete',
  [EOperationType.SEARCH]: 'paged,list,get',
  [EOperationType.RESET]: '',
  [EOperationType.ENABLE]: 'enable',
  [EOperationType.DISABLE]: 'disable',
  [EOperationType.REFRESH]: 'paged,list,get',
  [EOperationType.PRINT]: '',
  [EOperationType.BACK]: '',
  [EOperationType.CUSTOM]: '',
};

export { COperationType, COperationGqlType, COperationTypeName };
