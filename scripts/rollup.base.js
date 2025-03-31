import typescript from 'rollup-plugin-typescript2';
import resolve from 'rollup-plugin-node-resolve';
import postcss from 'rollup-plugin-postcss';
import commonjs from '@rollup/plugin-commonjs';
import NpmImport from 'less-plugin-npm-import';
import externalGlobals from 'rollup-plugin-external-globals';
import { terser } from 'rollup-plugin-terser';
import url from '@rollup/plugin-url';
// import { babel } from '@rollup/plugin-babel';
import path from 'path';

const presets = () => {
  const externals = {
    antd: 'Antd',
    vue: 'Vue',
    react: 'React',
    moment: 'moment',
    'react-is': 'ReactIs',
    '@alifd/next': 'Next',
    'mobx-react-lite': 'mobxReactLite',
    'react-dom': 'ReactDOM',
    '@ant-design/icons': 'icons',
    '@vue/composition-api': 'VueCompositionAPI',
    '@formily/reactive-react': 'Formily.ReactiveReact',
    '@formily/reactive-vue': 'Formily.ReactiveVue',
    '@formily/reactive': 'Formily.Reactive',
    '@formily/path': 'Formily.Path',
    '@formily/shared': 'Formily.Shared',
    '@formily/validator': 'Formily.Validator',
    '@formily/core': 'Formily.Core',
    '@formily/json-schema': 'Formily.JSONSchema',
    '@formily/react': 'Formily.React',
    'low-code-shared': 'Designable.Shared',
    'low-code-core': 'Designable.Core',
    'low-code-react': 'Designable.React',
    'low-code-react-sandbox': 'Designable.ReactSandbox',
    'low-code-react-settings-form': 'Designable.ReactSettingsForm',
    'low-code-extension': 'Designable.Extension',
  };
  return [
    typescript({
      tsconfig: './tsconfig.json',
      tsconfigOverride: {
        compilerOptions: {
          module: 'ESNext',
          declaration: false,
        },
      },
    }),
    resolve({
      preferBuiltins: true,
      browser: true,
    }),
    postcss({
      extract: true,
      minimize: true,
      // extensions: ['.css', '.less', '.sass'],
      use: {
        less: {
          plugins: [new NpmImport({ prefix: '~' })],
          javascriptEnabled: true,
        },
        sass: {},
        stylus: {},
      },
    }),
    commonjs(),
    url(),
    // babel({
    //   babelHelpers: 'bundled',
    //   extensions: ['ts', 'tsx', '.js', '.jsx'],
    //   exclude: 'node_modules/**',
    // }),
    externalGlobals(externals),
  ];
};

const inputFilePath = path.join(process.cwd(), 'src/index.ts');

export const removeImportStyleFromInputFilePlugin = () => ({
  name: 'remove-import-style-from-input-file',
  transform(code, id) {
    // 样式由 build:style 进行打包，所以要删除入口文件上的 `import './style'`
    if (inputFilePath === id) {
      return code.replace(`import './style';`, '');
    }

    return code;
  },
});

export default (filename, targetName, ...plugins) => [
  {
    input: 'src/index.ts',
    output: {
      format: 'umd',
      file: `dist/${filename}.umd.development.js`,
      name: targetName,
    },
    plugins: [...presets(), ...plugins],
  },
  {
    input: 'src/index.ts',
    output: {
      format: 'umd',
      file: `dist/${filename}.umd.production.js`,
      name: targetName,
    },
    plugins: [...presets(), terser(), ...plugins],
  },
];
