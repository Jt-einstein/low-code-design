import type { MutableRefObject, Key } from 'react';
import type React from 'react';
import type {
  TableColumnProps as ATableColumnProps,
  TableProps as ATableProps,
  SpinProps,
} from 'antd';

export type TGetRowKey = (record: Record<string, any>) => Key;

/** 提供给外部调用的方法 */
export type TActionType = {
  /**
   * 滚动到指定位置,position默认为top
   * @description.en-US
   */
  scrollByKey: (
    key: Key,
    position?: 'top' | 'bottom',
    selected?: boolean
  ) => void;
  /**
   * 重新计算高度，适用于布局拖拽改动后主动触发
   * @description.en-US
   */
  recalculateHeight: () => void;
  /**
   * 重新计算宽度，适用于布局拖拽改动后主动触发
   * @description.en-US
   */
  recalculateWidth: () => void;
};

export type TRedefineColumn = {
  /**
   * 列的类型
   * @description.en-US click row callback
   */
  type?: 'option';
  /**
   * 是否省略
   * @description.en-US click row callback
   */
  ellipsis?: boolean;
};

export type TTableColumn<T extends Record<string, any> = Record<string, any>> =
  Omit<ATableColumnProps<T>, 'ellipsis'> & TRedefineColumn;

export type TRedefineTableProps<
  T extends Record<string, any> = Record<string, any>
> = {
  /**
   * 单行单击回调
   * @description.en-US click row callback
   */
  onRowClick?: (
    row: T,
    selectedKey: string | number,
    event: React.MouseEvent
  ) => void;
  /**
   * 单行双击回调
   * @description.en-US
   */
  onRowDoubleClick?: (
    row: T,
    selectedKey: string | number,
    event: React.MouseEvent
  ) => void;
  /**
   * 当前选中的行key值
   * @description.en-US
   */
  selectedKey?: string | number;
  /**
   * 表格高度
   * @description.en-US
   */
  height?: string | number;
  /**
   * 是否可拉伸列调节宽度
   * @default true
   * @description.en-US
   */
  resizeColumns?: boolean;
  /**
   * Table action 的引用，便于自定义触发
   * @description.en-US
   */
  actionRef?:
    | MutableRefObject<TActionType | undefined>
    | ((action: TActionType) => void);
  /**
   * 表格列的配置描述
   * @description.en-US
   */
  columns?: TTableColumn<T>[];
  /**
   * 是否显示斑马线
   * @default true
   * @description.en-US
   */
  zebraPattern?: boolean;
  /**
   * 是否加载中或加载失败
   * @default false
   * @description.en-US
   */
  loading?: boolean | SpinProps | 'fail';
  /**
   * 加载失败后点击重新加载的回调
   * @description.en-US
   */
  reloadCallback?: () => void;
};

export type TTableProps<T extends Record<string, any> = Record<string, any>> =
  TRedefineTableProps<T> & Omit<ATableProps<T>, 'columns' | 'loading'>;
