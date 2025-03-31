const formItemScript = (props: { apiScript: Function }) => {
  const { apiScript } = props;
  return `const api = ${apiScript};

const transferFormItemDataSource = (data) => {
  // 仅为模板示例，数据源转换方法需自行编写;
  return {
    options: [
      { lable: '选项1', value: 'xuanxiang1' },
      { lable: '选项2', value: 'xuanxiang2' },
      { lable: '选项3', value: 'xuanxiang3' },
    ],
  };
};
  
const handleInit = async () => {
  try {
    // 仅为模板示例，需根据具体参数自行调整;
    const params = {};
    if (!api) {
      return;
    }
    const resp = await api({ params });
    $self?.setDataSource(transferFormItemDataSource(resp?.data));
  } catch (error) {
    $message.error(error?.message);
  }
};

$effect(() => {
  handleInit();
}, []);`;
};

export { formItemScript };
