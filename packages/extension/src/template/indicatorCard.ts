/**
 * 能开接口
 */
function onOpenApiCard({ api, name }) {
  return `const api = async (...args) => {
  const resp = await $mc?.restService({
    method: 'POST',
    data: {
      methodName: '${api}',
      ver: '1.0.0',
      ...args,
    },
  });
  console.log(resp);
  return { data: resp?.data?.${api} };
};
const handleLoadData = async () => {
  try {
    const params = {};     
    const res = await api(params);
    const content =(res.data || [])[0]['${name}']
    $self.setComponentProps({ content  });
  } catch (error) {
    $message.error(error?.message);
  }
};
  
$effect(() => {
  handleLoadData();
}, []);
`;
}
/**
 * gql接口
 */
function onGqlCard({ api, domain, name }) {
  return `const api = async (...args) => {
  const resp = await $api?.${domain}?.${api}(...args);
  console.log(resp);
  return { data: resp?.data?.${api} };
};
const handleLoadData = async () => {
  try {
    const params = {};     
    const res = await api(params);
    const content =(res.data || [])[0]['${name}']
    $self.setComponentProps({ content  });
  } catch (error) {
    $message.error(error?.message);
  }
};
  
$effect(() => {
  handleLoadData();
}, []);
`;
}
/**
 * 其他类型接口
 */
function onOtherCard({ id, name }) {
  return `const handleLoadData = async () => {
  try {
    const res = await $restful?.preview({dataSetId:'${id}'});
    const content =(res?.data?.valuesMap || [])?.[0]?.['${name}']
    $self.setComponentProps({ content  });
  } catch (error) {
    $message.error(error?.message);
  }
};
  
$effect(() => {
  handleLoadData();
}, []);
`;
}
export { onOpenApiCard, onGqlCard, onOtherCard };