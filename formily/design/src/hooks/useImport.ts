import { message } from 'antd';
import { TDesigner } from '../type';

/** 导入 */
export const useImport = (designer: TDesigner) => {
  const handleImport = (file: File) => {
    const reader = new FileReader();
    reader.readAsText(file);
    reader.onload = function (e: any) {
      const content = e.target.result;
      designer.setSchema(content);
      message.success('导入成功!');
    };
  };
  return {
    /** 导入 */
    handleImport,
  };
};
