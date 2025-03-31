import baseConfig from './webpack.base';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import CompressionWebpackPlugin from 'compression-webpack-plugin';
import merge from 'webpack-merge';
import { createModuleFederationPlugin } from './webpack.common';

export default merge(baseConfig, {
  mode: 'production',
  plugins: [
    new CompressionWebpackPlugin({
      filename: '[path][base].gz[query]', // 目标资源名称。[file] 会被替换成原资源。[path] 会被替换成原资源路径，[query] 替换成原查询字符串
      algorithm: 'gzip', // 算法
      test: new RegExp('\\.(js|css)$'), // 压缩 js 与 css
      threshold: 1024 * 100, // 只处理比这个值大的资源。按字节计算
      minRatio: 0.8, // 只有压缩率比这个值小的资源才会被处理
    }),
    new MiniCssExtractPlugin({
      filename: '[name].[contenthash].css',
      chunkFilename: '[id].[contenthash].css',
      ignoreOrder: true,
    }),
    ...createModuleFederationPlugin(),
  ],
  optimization: {
    minimize: true,
  },
});
