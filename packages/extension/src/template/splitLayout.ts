/**
 * 可拖拽布局默认配置
 */
function genSplitLayout() {
  return `$props({
  /** 拖动回调 */
  onDrag() {

  },
  /** 拖动开始时的回调 */
  onDragStart() {

  },
  /** 拖拽结束回调 */
  onDragEnd() {

  },
 });`;
}

export { genSplitLayout };
