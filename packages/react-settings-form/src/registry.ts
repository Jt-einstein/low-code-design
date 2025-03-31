// 明日cdn
// const mcCDN = 'https://cdn.mananacare.cn';

// 本地cdn
const localCDN = '/low-code-cdn';

// 国外cdn
// const unpkgCDN = 'https://unpkg.com';

// 饿了么cdn
// const elemeCDN = 'https://github.elemecdn.com';

/** 获取 子应用域名 地址 */
export const getPublicPath = () => {
  return window.__INJECTED_PUBLIC_PATH_BY_QIANKUN__?.replace(/\/$/, '');
};

/** 获取 CDN 地址 */
export const getNpmCDNRegistry = () => {
  /** 子应用域名 */
  const hostname = getPublicPath();
  return `${hostname || ''}/low-code-cdn`;
};

/** 初始化monaco编辑器 CDN 地址 */
export const initNpmCDNRegistry = (loader) => {
  loader.config({
    paths: {
      vs: `${
        window['_muLowcodeCDN'] || getNpmCDNRegistry()
      }/monaco-editor@0.36.1/min/vs`,
    },
  });
};
