declare module '*.css';
declare module '*.less';
declare module '*.png';
declare module '*.svg' {
  export function ReactComponent(
    props: React.SVGProps<SVGSVGElement>
  ): React.ReactElement;
  const url: string;
  export default url;
}
/* eslint-disable */
interface Window {
  /** 获取子应用域名 */
  __INJECTED_PUBLIC_PATH_BY_QIANKUN__: string;
  /** 是否在微应用中运行 */
  __POWERED_BY_QIANKUN__: boolean;
  /** 部署配置 */
  low_code_app_mcSetting: {
    env: string;
  };
}
