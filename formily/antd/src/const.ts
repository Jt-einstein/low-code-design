// /** 表格阅读态 */
// export const TABLE_READ_TYPE = 'readTable';

// /** form阅读态 */
// export const FORM_READ_TYPE = 'readPretty';

// /** label宽度 */
// export const LABEL_WIDTH = 104;

/** 输入容器宽度 */
export const WRAPPER_WIDTH = 200;

/** 行间距 */
export const ROW_GAP = 12;

/** 列间距 */
export const COLUMN_GAP = 24;

/** 左侧显示标签组件的默认装饰器属性 */
export const DEFAULT_DECORATOR_PROPS = {
  colon: false,
  labelWidth: '104px',
};
/** 产品标识 */
export enum EAppIdentificationMap {
  /** 驾驶舱 */
  COCKPIT = 'cockpit',
  /** 低代码、数据分析子系统 */
  'LOW-CODE' = 'low-code',
}