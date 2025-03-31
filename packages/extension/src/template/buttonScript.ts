import { EOperationType } from '../types';

const defaultScript = () => {
  return `$props({
  onClick(){
    console.log($self);
  }
});`;
};

const bindApiDefault = (props: { apiScript: Function }) => {
  const { apiScript } = props;
  return `const api = ${apiScript};
  
const handleClick = async () => {
  try {
    // 仅为模板示例，需根据具体参数自行调整;
    const params = $values || {};
    const resp = await api({ params });
    $self?.setValue(resp);
  } catch (error) {
    $message.error(error?.message);
  }
};

$props({
  onClick(){
    handleClick();
  }
});`;
};

const bindApi = (props: {
  operationType: EOperationType;
  apiScript: Function;
}) => {
  const { operationType, apiScript } = props;
  switch (operationType) {
    case EOperationType.SAVE:
    case EOperationType.SAVE_ADD:
      return bindApiDefault({ apiScript });
    case EOperationType.DELETE:
      return bindApiDefault({ apiScript });
    case EOperationType.ENABLE:
      return bindApiDefault({ apiScript });
    case EOperationType.DISABLE:
      return bindApiDefault({ apiScript });
    default:
      /** 普通事件代码 */
      return bindApiDefault({ apiScript });
  }
};

const buttonScript = { defaultScript, bindApi };

export { buttonScript };
