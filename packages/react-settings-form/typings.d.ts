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

interface Window {
  /** 获取子应用域名 */
  __INJECTED_PUBLIC_PATH_BY_QIANKUN__: string;
}
