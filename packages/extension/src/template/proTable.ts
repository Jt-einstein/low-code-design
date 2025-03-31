
/**
 * 内置操作默认配置
 */
function proTableDefault() {
  return `$props({
  /** Table 的数据发生改变时触发 */
  onDataSourceChange(dataSource) {
    console.log('onDataSourceChange',dataSource)
  },
  /** 数据加载完成后触发,会多次触发 */
  onLoad(dataSource) {
    console.log('onLoad',dataSource)
  },
  /** loading 被修改时触发，一般是网络请求导致的 */
  onLoadingChange(loading) {
    console.log('onLoadingChange',loading)
  },
  /** 数据加载失败时触发 */
  onRequestError(error) {
    console.log('onRequestError',error)
  },
  /** 提交表单时触发 */
  onSubmit(params) {
    console.log('onSubmit',params)
  },
  /** 重置表单时触发 */
  onReset(size) {
    console.log('onReset',size)
  },
 });
 /**
* 页面初始化调用
**/ 
$effect(() => {
  // $self.setComponentProps({
  //   dataSource: [];
  // })
}, []);`;
}

export { proTableDefault };