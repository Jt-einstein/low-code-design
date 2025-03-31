/**
 * 删除空值属性字段
 * @param obj 对象
 * @param key 属性key
 */
export function deleteNullValueProperty(obj, key) {
  if (obj?.hasOwnProperty(key) && obj?.[key] === null) {
    delete obj?.[key];
  }
}