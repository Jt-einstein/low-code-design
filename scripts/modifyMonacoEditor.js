const path = require('path');
const { existsSync, readFileSync, writeFileSync } = require('fs');

/**
 * 替换文件内容
 * @param filename
 * @param oriText
 * @param destText
 */
function replaceText(filename, oriText, destText) {
  if (existsSync(filename)) {
    console.log('modify config file:' + filename);
    let text = readFileSync(filename, 'utf-8');
    console.log('==========================oriText==========================');
    console.log(text);
    text = text.replace(oriText, destText);
    writeFileSync(filename, text);
    text = readFileSync(filename, 'utf-8');
    console.log(
      '==========================replace result=========================='
    );
    console.log(text);
  } else {
    console.log('config file[' + filename + '] not exists!');
  }
}

/**
 * 修改Monaco editor配置
 */
function modifyMonacoEditorConfig() {
  const oriText = 'https://cdn.jsdelivr.net/npm/';
  const destText = 'https://unpkg.com/';
  const monacoConfigFile1 = path.resolve(
    __dirname,
    '../node_modules/@monaco-editor/loader/lib/es/config/index.js'
  );
  replaceText(monacoConfigFile1, oriText, destText);

  const monacoConfigFile2 = path.resolve(
    __dirname,
    '../node_modules/@monaco-editor/loader/lib/cjs/config/index.js'
  );
  replaceText(monacoConfigFile2, oriText, destText);
}

modifyMonacoEditorConfig();
