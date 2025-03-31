import { message } from 'antd';
import { TDesigner } from '../type';

/** 导出 */
export const useExport = (designer: TDesigner) => {
  const handleExport = (name: string) => {
    let timer;
    timer && clearTimeout(timer);
    const schema = designer.getSchema();
    const content = JSON.stringify(schema);
    // 构建下载对象
    const blobURL = new Blob([content], { type: 'text/json' });
    const tempLink = document.createElement('a');
    tempLink.style.display = 'none';
    tempLink.href = window.URL.createObjectURL(blobURL);
    tempLink.download = `${name ?? Date.now()}.json`;
    // 模仿点击
    document.body.appendChild(tempLink);
    tempLink.click();
    // 删除DOM、释放对象URL
    timer = setTimeout(() => {
      document.body.removeChild(tempLink);
      window.URL.revokeObjectURL(blobURL as unknown as string);
      message.success('导出成功!');
    }, 200);
  };
  return {
    /** 导出 */
    handleExport,
  };
};
