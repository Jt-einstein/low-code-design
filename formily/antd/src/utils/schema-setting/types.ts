/**
 * @Author: 许伟茂
 * @Description: 类型定义
 * @Date: 2022/04/14 20:15
 */
/** 字段类型定义 */
export enum EFieldType {
  /** 字段 */
  FIELD = 'field',
  /** 自定义 */
  CUSTOM = 'custom',
  /** 状态字段 */
  STATUS = 'status',
}

/** 参数类型定义 */
export enum EParamType {
  /** 自定义 */
  CUSTOM = 'custom',
  /** 查询入参 */
  QUERY = 'query',
  /** 提交入参 */
  COMMIT = 'commit',
}