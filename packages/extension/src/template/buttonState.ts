/**
 * @Author: 许伟茂
 * @Description: 按钮状态代码模板
 * @Date: 2022/04/14 20:40
 */
import { message } from 'antd';

/** 设置按钮可用状态 */
function setButtonEnable(buttonTypes: string[], isEnable: boolean) {
  if (!buttonTypes?.length) {
    message.error('setButtonState buttonTypes error!');
    return '';
  }

  return `Object.keys($form?.indexes || {}).forEach((key) => {
        const fieldState = $form.getFieldState(key);
        if (
          fieldState?.component?.length > 1 &&fieldState?.component?.[0] == "Operation" && fieldState?.component?.[0] == "McButton" &&
          [${buttonTypes.map(
            (button) => "'" + button + "'"
          )}].includes(fieldState?.component?.[1]?.operationType)
        ) {
          $form.setFieldState(key, { disabled: ${!isEnable} });
        }
    });`;
}

export { setButtonEnable };
