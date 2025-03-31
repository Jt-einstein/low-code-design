const path = require('path');
const { existsSync, readFileSync, writeFileSync } = require('fs');

/**
 * 替换库版本
 * @param filename 文件名
 * @param packageType 包类型
 * @param packageName 包名
 * @param version 版本
 */
function replacePackageVersion(filename, packageType, packageName, version) {
  if (existsSync(filename)) {
    console.log('modify file:' + filename);
    let text = readFileSync(filename, 'utf-8');
    const packageJson = JSON.parse(text) || {};
    console.log('ori version:', packageJson[packageType][packageName]);
    // console.warn('packageJson', packageJson);
    packageJson[packageType][packageName] = version;
    console.log('new version:', version);
    writeFileSync(filename, JSON.stringify(packageJson, null, 2));
    text = readFileSync(filename, 'utf-8');
    // console.log(
    //   '==========================replace result=========================='
    // );
    // console.log(text);
  } else {
    console.log('replacePackageVersion file[' + filename + '] not exists!');
  }
}

/**
 * 修改包
 */
function modifyPackages() {
  const { argv } = process;
  console.error('modifyPackages argv', argv);
  if (argv?.length < 3) {
    console.error('modifyPackages argv error!');
    return;   
  }
}

modifyPackages();
