/**
 * @Author: 许伟茂
 * @Description: 绑定表格模板
 * @Date: 2022/04/14 11:37
 */
import {
  LOW_CODE_VAR,
  SELECTED_ROW,
  ACTIVE_STATUS,
  SELECTED_ROW_KEY,
  PAGE_INFO,
} from '../consts';
import { triggerQuery } from './button';

/** 生成表格代码 */
function genTable() {
  return `/**
 * 绑定表格
 **/
$props({
  //这里可以直接设置组件的属性配置
   rowKey: "id",
   selectedKey: $values?.${LOW_CODE_VAR}?.${SELECTED_ROW_KEY},
  /** 点击表格行 */
  onRowClick(row, selectedKey, event) {
    $form.setValuesIn("${LOW_CODE_VAR}.${SELECTED_ROW_KEY}", selectedKey);
    $form.setValuesIn("${LOW_CODE_VAR}.${SELECTED_ROW}", JSON.parse(JSON.stringify(row)));
  },
  /** 页码改变的回调 */
  onChange(pageIndex, pageSize) {
    /** 设置分页信息 */
    $form.setValuesIn('${LOW_CODE_VAR}.${PAGE_INFO}', {
      pageIndex,
      pageSize
    });
    ${triggerQuery()}
  },
});`;
}

export { genTable };
