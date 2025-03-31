/**
 * @Author: 许伟茂
 * @Description: 绑定参数类型schema定义
 * @Date: 2022/08/10 11:50
 */
import { EParamType } from './types';

export function paramTypeSetting() {
  return {
    paramtype: {
      type: 'string',
      'x-decorator': 'FormItem',
      'x-component': 'ParamTypeSetter',
      'x-component-props': {
        defaultValue: EParamType.CUSTOM,
      },
    },
  };
}
