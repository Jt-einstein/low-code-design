import { EchartsOptions, EchartsData } from '../consts/chart';
import { JSONStringify } from '../utils/echarts';

const defaultScript = (props?: { type?: string; isEmpty?: boolean }) => {
  const { type, isEmpty } = props || {};
  if (type) {
    const renderOption = EchartsOptions[type];
    const chartData = EchartsData[type];
    return `
      $effect(() => {
        const option = ${JSONStringify(renderOption?.(chartData))};
        
        ${
          isEmpty === true
            ? `// 没绑定api和字段时显示空态
            $self.setComponentProps({ option, isEmpty: true });`
            : '$self.setComponentProps({ option });'
        }
      }, []);
    `;
  }
  return '';
};

const bindApiScript = (props: {
  apiScript: Function;
  type: string;
  chartsName?: { name: string };
  chartsValue?: { name: string };
}) => {
  const { apiScript, type, chartsName, chartsValue } = props;

  const renderOption = EchartsOptions[type]?.toString();
  const name = chartsName?.name;
  const value = chartsValue?.name;

  if (apiScript && name && value) {
    return `const api = ${apiScript};

    const getOptioin = (data) => {
     
      const renderOption = ${renderOption};
  
      const source = data?.map((item, index) => ({
        ${name}: item.${name},
        ${value}: item.${value},
      }));
      
      return renderOption(source, ${name ? `'${name}'` : undefined}, ${
      value ? `'${value}'` : undefined
    });
    };
  
    const handleLoadData = async () => {
      try {
        const params = {};     
        const res = await api(params);
        const option = getOptioin(res.data);
        $self.setComponentProps({ option, isEmpty: !res.data?.length  });
      } catch (error) {
        $message.error(error?.message);
      }
    };
  
    $effect(() => {
      handleLoadData();
    }, []);`;
  }

  return defaultScript({ type, isEmpty: true });
};

const chartScript = { default: defaultScript, bindApi: bindApiScript };

export { chartScript };
