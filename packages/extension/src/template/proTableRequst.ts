import { omit } from '../utils/mcLoash';
const proTableRequst = (bindTableset) => {
  return `const id = '${bindTableset?.tableId}';
  const handleInit = async (param) => {
  const rest = ${omit}(param,['routeName','idSoft','created_at'])
    if (id) {
      const res = await $ext?.previewMetricList({
            metricCodeList: [id],
            previewMetricParams: {
              variables: rest
            },
      });
      if (res.data) {
        return {
          data: res.data?.[0]?.valuesMap,
          success: true,
          total:res.data?.[0]?.totalCount || 0, 
        };
      }
    }
  };

  $effect(() => {
    $self.setComponentProps({ request: handleInit });
  }, []);`;
}
export { proTableRequst };