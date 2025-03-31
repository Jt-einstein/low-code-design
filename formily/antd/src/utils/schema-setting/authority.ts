/**
 * @Author: 许伟茂
 * @Description: 绑定API字段schema定义
 * @Date: 2022/06/03 23:10
 */

export function authoritySetting() {
  return {
    authority: {
      type: 'string',
      enum: [],
      'x-decorator': 'FormItem',
      'x-component': 'Select',
    },
  };
}
