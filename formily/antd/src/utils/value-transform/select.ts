/**
 * 当为单选时会传入single字符串，所以这里需要格式化然后传给组件
 * 这里不能为null或undefined时，否则右侧属性会没有选中效果
 */
export function transformMode(mode: 'multiple' | 'tags') {
  return ['multiple', 'tags'].includes(mode) ? mode : undefined;
}
