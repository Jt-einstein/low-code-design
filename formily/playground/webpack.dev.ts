import baseConfig from './webpack.base';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import { ProgressPlugin } from 'webpack';
// import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';
import path from 'path';
import merge from 'webpack-merge';
import ReactRefreshWebpackPlugin from '@pmmmwh/react-refresh-webpack-plugin';
import ModuleFederationExposesPlugin from 'module-federation-exposes-webpack-plugin';
import { createModuleFederationPlugin } from './webpack.common';
// 导入devServer类型定义
import 'webpack-dev-server';

const PORT = 3000;

export default merge(baseConfig, {
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].[contenthash].css',
      chunkFilename: '[id].[contenthash].css',
      ignoreOrder: true,
    }),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: path.resolve(__dirname, './template.ejs'),
      chunk: ['playground'],
      inject: 'body',
    }),
    // 添加进度条
    new ProgressPlugin(),
    new ReactRefreshWebpackPlugin({ overlay: false }),
    new ModuleFederationExposesPlugin({
      exportFile: path.resolve(__dirname, '../design/src/index.ts'),
      generateDir: path.resolve(__dirname, './exposes'),
      transform: (libraryName: string) => {
        return libraryName.replace('./', 'low-code-formily-design/esm/');
      },
    }),
    ...createModuleFederationPlugin(),
    // new BundleAnalyzerPlugin(),
  ],
  devServer: {
    host: '127.0.0.1',
    // open: true,
    port: PORT,
    client: {
      // 关闭当出现编译器错误或警告时，在浏览器中显示全屏覆盖
      overlay: false,
    },
    hot: true,
    proxy: {
      // '/baidubce': {
      //   target: 'https://aip.baidubce.com',
      //   changeOrigin: true, // 是否跨域
      //   pathRewrite: (path) => path.replace(/^\/baidubce/, ''),
      //   secure: false,
      // },
      '/localai': {
        target: 'http://10.168.11.99:6006',
        changeOrigin: true, // 是否跨域
        pathRewrite: (path) => {
          // console.log(path);
          return path.replace(/^\/localai/, '');
        },
      },
      // http://10.168.11.99:6006/prompt
    },
  },
});
