/**
 * @Author: 许伟茂
 * @Description: 绑定接口schema定义
 * @Date: 2022/03/31 10:31
 */

/** 绑定类型定义 */
export enum EBindType {
  /** graphql */
  GQL = 'gql',
  /** API */
  API = 'api',
  /** 元数据 */
  META = 'meta',
  /** 自定义 */
  CUSTOM = 'custom',
}

/** graphql接口类型定义 */
export enum EGqlType {
  /** 新增 */
  CREATE = 'create',
  /** 修改 */
  UPDATE = 'update',
  /** 删除 */
  DELETE = 'delete',
  /** 启用 */
  ENABLE = 'enable',
  /** 停用 */
  DISABLE = 'disable',
}

/**
 * 绑定类型设置
 */
export const bindTypeSetting = {
  bindType: {
    type: 'string',
    enum: Object.values(EBindType),
    'x-decorator': 'FormItem',
    'x-component': 'Select',
    'x-component-props': {
      defaultValue: EBindType.CUSTOM,
    },
  },
};

/**
 * gql接口设置
 */
export function gqlSetting() {
  return {
    /** 绑定类型设置 */
    ...bindTypeSetting,
    gqlName: {
      type: 'string',
      'x-decorator': 'FormItem',
      'x-component': 'BindGqlSetter',
      'x-component-props': {
        bindType: EBindType.GQL,
        gqlData: '{{$form.values["gqlData"]}}',
      },
      'x-reactions': {
        fulfill: {
          state: {
            visible:
              '{{$form.values["bindType"] == "gql" && $form.values?.["x-component-props"]?.operationType != "save"}}',
          },
        },
      },
    },
    createGqlName: {
      type: 'string',
      'x-decorator': 'FormItem',
      'x-component': 'BindGqlSetter',
      'x-component-props': {
        bindType: EBindType.GQL,
        gqlType: EGqlType.CREATE,
        gqlData: '{{$form.values["createGqlData"]}}',
      },
      'x-reactions': {
        fulfill: {
          state: {
            visible:
              '{{$form.values["bindType"] == "gql" && $form.values?.["x-component-props"]?.operationType == "save"}}',
          },
        },
      },
    },
    updateGqlName: {
      type: 'string',
      'x-decorator': 'FormItem',
      'x-component': 'BindGqlSetter',
      'x-component-props': {
        bindType: EBindType.GQL,
        gqlType: EGqlType.UPDATE,
        gqlData: '{{$form.values["updateGqlName"]}}',
      },
      'x-reactions': {
        fulfill: {
          state: {
            visible:
              '{{$form.values["bindType"] == "gql" && $form.values?.["x-component-props"]?.operationType == "save"}}',
          },
        },
      },
    },
    primaryKeyField: {
      type: 'string',
      'x-decorator': 'FormItem',
      'x-component': 'BindGqlFieldSetter',
      'x-component-props': {
        isRowKey: true,
      },
      'x-reactions': {
        fulfill: {
          state: {
            visible:
              '{{$form.values["bindType"] == "gql" && ' +
              '["save", "delete", "enable", "disable"].includes($form.values?.["x-component-props"]?.operationType)}}',
          },
        },
      },
    },
  };
}

/**
 * formTab设置
 */
export function formTabSetting() {
  return {
    /** 绑定类型设置 */
    ...bindTypeSetting,
    createGqlName: {
      type: 'string',
      'x-decorator': 'FormItem',
      'x-component': 'BindGqlSetter',
      'x-component-props': {
        bindType: EBindType.GQL,
        gqlType: EGqlType.CREATE,
        gqlData: '{{$form.values["createGqlData"]}}',
      },
      'x-reactions': {
        fulfill: {
          state: {
            visible: '{{$form.values["bindType"] == "gql"}}',
          },
        },
      },
    },
    updateGqlName: {
      type: 'string',
      'x-decorator': 'FormItem',
      'x-component': 'BindGqlSetter',
      'x-component-props': {
        bindType: EBindType.GQL,
        gqlType: EGqlType.UPDATE,
        gqlData: '{{$form.values["updateGqlData"]}}',
      },
      'x-reactions': {
        fulfill: {
          state: {
            visible: '{{$form.values["bindType"] == "gql"}}',
          },
        },
      },
    },
    primaryKeyField: {
      type: 'string',
      'x-decorator': 'FormItem',
      'x-component': 'BindGqlFieldSetter',
      'x-component-props': {
        isRowKey: true,
      },
      'x-reactions': {
        fulfill: {
          state: {
            visible: '{{$form.values["bindType"] == "gql"}}',
          },
        },
      },
    },
  };
}

/**
 * Api接口设置
 */
export function apiSetting() {
  return {
    bindType: {
      type: 'string',
      enum: Object.values(EBindType),
      'x-decorator': 'FormItem',
      'x-component': 'Select',
      'x-component-props': {
        defaultValue: EBindType.CUSTOM,
      },
    },
    /** todo 接口domain，后续需要从接口获取 */
    apiDomain: {
      type: 'string',
      // enum: ['bd', 'cd', 'md', 'sc', 'bil', 'pi', 'vis'],
      enum: ['bd', 'cd', 'pi', 'map'],
      'x-decorator': 'FormItem',
      'x-component': 'Select',
      'x-component-props': {
        defaultValue: 'bd',
      },
      'x-reactions': {
        fulfill: {
          state: {
            visible: '{{$form.values["bindType"] == "api"}}',
          },
        },
      },
    },
    apiName: {
      type: 'string',
      'x-decorator': 'FormItem',
      // 'x-component': 'BindApiSetter',
      'x-component-props': {
        bindType: EBindType.API,
      },
      'x-reactions': {
        fulfill: {
          state: {
            visible: '{{$form.values["bindType"] == "api"}}',
          },
        },
      },
    },
  };
}

/**
 * 绑定操作区接口
 */
export function operationSetting() {
  return {
    bindType: {
      type: 'string',
      enum: Object.values(EBindType),
      'x-decorator': 'FormItem',
      'x-component': 'Select',
      'x-component-props': {
        defaultValue: EBindType.CUSTOM,
      },
    },
    createGqlName: {
      type: 'string',
      'x-decorator': 'FormItem',
      'x-component': 'BindGqlSetter',
      'x-component-props': {
        bindType: EBindType.GQL,
        gqlType: EGqlType.CREATE,
        gqlData: '{{$form.values["createGqlData"]}}',
      },
      'x-reactions': {
        fulfill: {
          state: {
            visible: '{{$form.values["bindType"] == "gql"}}',
          },
        },
      },
    },
    updateGqlName: {
      type: 'string',
      'x-decorator': 'FormItem',
      'x-component': 'BindGqlSetter',
      'x-component-props': {
        bindType: EBindType.GQL,
        gqlType: EGqlType.UPDATE,
        gqlData: '{{$form.values["updateGqlName"]}}',
      },
      'x-reactions': {
        fulfill: {
          state: {
            visible: '{{$form.values["bindType"] == "gql"}}',
          },
        },
      },
    },
    deleteGqlName: {
      type: 'string',
      'x-decorator': 'FormItem',
      'x-component': 'BindGqlSetter',
      'x-component-props': {
        bindType: EBindType.GQL,
        gqlType: EGqlType.DELETE,
        gqlData: '{{$form.values["deleteGqlName"]}}',
      },
      'x-reactions': {
        fulfill: {
          state: {
            visible: '{{$form.values["bindType"] == "gql"}}',
          },
        },
      },
    },
    enableGqlName: {
      type: 'string',
      'x-decorator': 'FormItem',
      'x-component': 'BindGqlSetter',
      'x-component-props': {
        bindType: EBindType.GQL,
        gqlType: EGqlType.ENABLE,
        gqlData: '{{$form.values["enableGqlName"]}}',
      },
      'x-reactions': {
        fulfill: {
          state: {
            visible: '{{$form.values["bindType"] == "gql"}}',
          },
        },
      },
    },
    disableGqlName: {
      type: 'string',
      'x-decorator': 'FormItem',
      'x-component': 'BindGqlSetter',
      'x-component-props': {
        bindType: EBindType.GQL,
        gqlType: EGqlType.DISABLE,
        gqlData: '{{$form.values["disableGqlName"]}}',
      },
      'x-reactions': {
        fulfill: {
          state: {
            visible: '{{$form.values["bindType"] == "gql"}}',
          },
        },
      },
    },
    primaryKeyField: {
      type: 'string',
      'x-decorator': 'FormItem',
      'x-component': 'BindGqlFieldSetter',
      'x-component-props': {},
      'x-reactions': {
        fulfill: {
          state: {
            visible: '{{$form.values["bindType"] == "gql"}}',
          },
        },
      },
    },
  };
}
