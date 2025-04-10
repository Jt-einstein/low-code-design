import path from 'path';
import fs from 'fs-extra';
import { GlobSync } from 'glob';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import autoprefixer from 'autoprefixer';
import { Configuration } from 'webpack';

const getWorkspaceAlias = () => {
  const basePath = path.resolve(__dirname, '../../');
  const pkg = fs.readJSONSync(path.resolve(basePath, 'package.json')) || {};
  const results = {};
  const workspaces = pkg.workspaces;
  if (Array.isArray(workspaces)) {
    workspaces.forEach((pattern) => {
      const { found } = new GlobSync(pattern, { cwd: basePath });
      found.forEach((name) => {
        const pkg = fs.readJSONSync(
          path.resolve(basePath, name, './package.json')
        );
        const filePath = path.resolve(basePath, name, './src');
        results[`${pkg.name}$`] = filePath;
        // 处理直接从打包后的包导出的组件
        results[`${pkg.name}/esm`] = filePath;
        results[`${pkg.name}/lib`] = filePath;
      });
    });
  }
  return results;
};

const isDev = process.env.NODE_ENV !== 'production';

export default {
  mode: isDev ? 'development' : 'production',
  devtool: 'eval-cheap-module-source-map',
  stats: {
    entrypoints: false,
    children: false,
  },
  entry: {
    playground: path.resolve(__dirname, './src/App'),
  },
  output: {
    path: path.resolve(__dirname, './build'),
    filename: '[name].[contenthash].bundle.js',
  },
  resolve: {
    modules: ['node_modules'],
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.json'],
    alias: getWorkspaceAlias(),
  },
  /**
   * 这里的外部映射-有时候会导致页面白屏，找不到react
   * 白屏是因为加载不到资源，更换成内网CDN可解决
   * 把React加入到externals时，会导致react-refresh-webpack-plugin插件失效，即局部刷新功能失效
   */
  // externals: {
  //   react: 'React',
  //   'react-dom': 'ReactDOM',
  //   moment: 'moment',
  //   antd: 'antd',
  // },
  module: {
    rules: [
      {
        test: /\.[jt]sx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              '@babel/preset-env',
              '@babel/preset-react',
              '@babel/preset-typescript',
            ],
            cacheDirectory: true, // 开启babel编译缓存
            cacheCompression: false, // 缓存文件不要压缩
            plugins: [isDev && require.resolve('react-refresh/babel')].filter(
              Boolean // 去除数组中的 falsy 值
            ),
          },
        },
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, require.resolve('css-loader')],
      },
      {
        test: /\.less$/,
        use: [
          MiniCssExtractPlugin.loader,
          { loader: 'css-loader' },
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: () => autoprefixer(),
              },
            },
          },
          {
            loader: 'less-loader',
            options: {
              lessOptions: {
                javascriptEnabled: true,
              },
            },
          },
        ],
      },
      // 解析字体文件
      {
        test: /\.(woff|woff2|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
        type: 'asset/inline',
      },
      // 解析图片
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        type: 'asset/resource',
      },
    ],
  },
} as Configuration;
