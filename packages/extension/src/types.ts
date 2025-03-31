/**
 * @Author: 许伟茂
 * @Description: 类型定义
 * @Date: 2022/04/16 20:23
 */

enum ENodeType {
  /** 设计表单 */
  MC_FORM_TAB = 'McFormTab',
  /** 表单 */
  FORM = 'Form',
  /** 操作区父级 */
  OPERATION_AREA_PARENT = 'McLayout.Operation',
  /** 查询区父级 */
  QUERY_AREA_PARENT = 'McLayout.Header',
  /** 操作区 */
  OPERATION_AREA = 'Operation',
  /** 查询区 */
  QUERY_AREA = 'QueryArea',
  /** 表单区 */
  FORM_AREA = 'FormArea',
  /** 表格 */
  TABLE = 'ArrayTable',
  /** McTable */
  MC_TABLE = 'McTable',
  /** McProTable */
  MC_PROTABLE = 'McProTable',
  /** McButton */
  MC_BUTTON = 'McButton',
  /** McTabPanel */
  MC_TAB_PANEL = 'McFormTab.TabPane',
  /** McTree */
  MC_TREE = 'McTree',
  /** ECharts */
  ECharts = 'ECharts',
  /** McRadio.Group */
  McRadioGroup = 'McRadio.Group',
  /** McCheckbox */
  McCheckbox = 'McCheckbox',
  /** McSelect */
  McSelect = 'McSelect',
  /** McTreeSelect */
  McTreeSelect = 'McTreeSelect',
  /** McTransfer */
  McTransfer = 'McTransfer',
  /** 弹窗 */
  Modal = 'Modal',
  /** 抽屉 */
  SideSheet = 'SideSheet',
  /** 指标卡 */
  IndicatorCard = 'IndicatorCard',
  /** 报表 */
  ReportMap = 'ReportMap',
  /** 抽屉 */
  'Table_Column' = 'McTable.Column',
}

/** 父节点类型 */
type TParentNode = {
  type: ENodeType;
  props: Record<string, any>;
  dataSource: Record<string, any>;
};

/** 操作类型 */
enum EOperationType {
  ADD = 'add',
  SAVE = 'save',
  SAVE_ADD = 'saveAdd',
  EDIT = 'edit',
  DELETE = 'delete',
  SEARCH = 'search',
  RESET = 'reset',
  ENABLE = 'enable',
  DISABLE = 'disable',
  REFRESH = 'refresh',
  PRINT = 'print',
  BACK = 'back',
  CUSTOM = 'custom',
}
/* 屏蔽容器样式的组件 */
const ENoPackType = [
  'McTab',
  'McEditTable',
  'McTable',
  'McButton',
  'AdaptTable',
];

/** 接口类型 */
enum EInterfaceType {
  ALL = 'all',
  QUERY = 'query',
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
}

/** 接口参数类型 */
enum EInterfaceParamType {
  IN = 'in',
  OUT = 'out',
}

type TBindInterfaceProps = {
  /** 归属域 */
  domain?: string;
  /** gql接口名称 */
  gqlName?: string;
  /** 新增gql接口名称 */
  createGqlName?: string;
  /** 更新gql接口名称 */
  updateGqlName?: string;
  /** 操作类型 */
  operationType?: EOperationType;
  /** 主键字段 */
  primaryKeyField?: string;
  /** 是否设计的FormTab */
  isFormTab?: boolean;
};

/** 激活状态 */
enum EActiveStatus {
  /** 全部 */
  ALL = 99999,
  /** 启用 - 1 */
  ENABLED = 1,
  /** 停用 - 2 */
  DISABLED = 2,
  /** 删除 - 3 */
  DELETED = 3,
}

/** 操作区按钮事件 */
enum EOperationBtnType {
  /** 打开页面 */
  OPEN_PAGE = 'open_page',
  /** 打开弹窗 */
  PAGE_DIALOG = 'page_dialog',
  /** 打开抽屉 */
  OPEN_SIDESHEET = 'open_sidesheet',
  /** 打开抽屉 */
  OPEN_POPUP = 'open_popup',
}
/** 按钮-打开页面方式 */
enum EBtnOpenType {
  /** 切换页面 */
  CHECK_PAGE = 'check_page',
  /** 弹出弹窗 */
  SHOW_DIALOG = 'show_dialog',
}
/** 表格事件 */
enum ETableType {
  /** 业务tab新增-弹窗 */
  BUSINESS_TAB = 'business_tab',
  /** 普通事件操作 */
  DEFAULT = 'default',
}
const reportsSet = ['BarChart', 'Dashboard', 'Histogram', 'LineChart', 'Pie', 'RectangleTree', 'ScatterPlot', 'TreeGraph', 'ReportMap'];
export {
  ENoPackType,
  ENodeType,
  EOperationType,
  TParentNode,
  TBindInterfaceProps,
  EActiveStatus,
  EOperationBtnType,
  ETableType,
  EInterfaceType,
  EInterfaceParamType,
  EBtnOpenType,
  reportsSet,
};
