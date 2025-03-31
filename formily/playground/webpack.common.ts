import { container } from 'webpack';
import { dependencies } from './package.json';
import exposes from './exposes/index.json';

export function createModuleFederationPlugin() {
  return [
    new container.ModuleFederationPlugin({
      // 应用名，全局唯一，不可冲突。
      name: 'low-code',
      library: { type: 'var', name: 'mcLowCode' },
      // 暴露的文件名称
      filename: 'remoteEntry.js',
      // 远程应用暴露出的模块名
      exposes: {
        './LowCodeApp': './src/App.tsx',
        ...exposes,
      },
      // 依赖的包 webpack在加载的时候会先判断本地应用是否存在对应的包，如果不存在，则加载远程应用的依赖包。
      shared: {
        react: {
          singleton: true,
          requiredVersion: dependencies.react,
          eager: true,
        },
        'react-dom': {
          singleton: true,
          requiredVersion: dependencies['react-dom'],
          eager: true,
        },
      },
    }),
  ];
}
