import { Key, useEffect } from 'react';
import type React from 'react';
import type { TRedefineTableProps } from '../type';

export type THandleRow<T> = {
  record: T;
  rowKey: Key;
  selectedKey: TRedefineTableProps<T>['selectedKey'];
  onRowClick: TRedefineTableProps<T>['onRowClick'];
  onRowDoubleClick: TRedefineTableProps<T>['onRowDoubleClick'];
  hasSelectedKey: boolean;
  setInnerSelectedKey: (value: Key) => void;
};

/** onRow处理*/
export function handleRow<T extends Record<string, any>>(props: THandleRow<T>) {
  let timer = null; let halftimer = null;
  const {
    record,
    rowKey,
    onRowClick,
    onRowDoubleClick,
    hasSelectedKey,
    setInnerSelectedKey,
  } = props;
  /** 维护一个变量用于计算当前是单击还是双击 */
  let clickTimes = 0;

  useEffect(() => {
    return () => {
      clearTimeout(timer);
      clearTimeout(halftimer);
    };
  }, []);

  return {
    onClick: (event: React.MouseEvent) => {
      timer && clearTimeout(timer);
      // 当没有双击事件的时候，单击不再延迟，但是要节流，一秒最多触发两次
      if (!onRowDoubleClick) {
        if (clickTimes === 0) {
          onRowClick && onRowClick(record, rowKey, event);
          // 当没有传selectedKey时，点击会改变内部key
          if (!hasSelectedKey) {
            setInnerSelectedKey(rowKey);
          }
          clickTimes++;
          timer = setTimeout(() => {
            clickTimes = 0;
          }, 500);
        }
      } else {
        /** 用延时区分单击双击 */
        clickTimes++;
        halftimer && clearTimeout(halftimer);
        halftimer = setTimeout(() => {
          if (clickTimes === 1) {
            onRowClick && onRowClick(record, rowKey, event);
            // 当没有传selectedKey时，点击会改变内部key
            if (!hasSelectedKey) {
              setInnerSelectedKey(rowKey);
            }
          }
          if (clickTimes === 2) {
            onRowDoubleClick && onRowDoubleClick(record, rowKey, event);
            // 当没有传selectedKey时，点击会改变内部key
            if (!hasSelectedKey) {
              setInnerSelectedKey(rowKey);
            }
          }
          clickTimes = 0;
        }, 250);
      }
    },
  };
}
