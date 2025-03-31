/**
 * @Author: 许伟茂
 * @Description: 绑定拾取器schema定义
 * @Date: 2022/05/20 10:57
 */

/**
 * 绑定拾取器
 */
export function pickerSetting() {
  return {
    pickerName: {
      type: 'string',
      'x-decorator': 'FormItem',
      'x-component': 'BindPickerSetter',
      'x-component-props': {},
    },
  };
}
