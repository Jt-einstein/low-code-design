const path = require('path');
const { existsSync, readFileSync, writeFileSync } = require('fs');

/**
 * 替换文件内容
 * @param filename 文件名
 * @param oriText 原始字符串
 * @param destText 替换完字符串
 * @param showLog 是否显示日志
 */
function replaceText(filename, oriText, destText, showLog = true) {
  if (existsSync(filename)) {
    console.log('modify file:' + filename);
    let text = readFileSync(filename, 'utf-8');
    if (showLog) {
      console.log('==========================oriText==========================');
      console.log(text);  
    }
    text = text.replace(oriText, destText);
    writeFileSync(filename, text);
    text = readFileSync(filename, 'utf-8');
    if (showLog) {
      console.log(
        '==========================replace result=========================='
      );
      console.log(text);  
    }
  } else {
    console.error('config file[' + filename + '] not exists!');
  }
}

/**
 * 替换NodeModules下的文件内容
 */
function replaceNodeModulesFileText(filename, oriText, destText, showLog = true) {
  const modifyFile = path.resolve(__dirname, '../node_modules/' + filename);
  replaceText(modifyFile, oriText, destText, showLog);
}

exports.replaceText = replaceText;
exports.replaceNodeModulesFileText = replaceNodeModulesFileText;
