const { replaceNodeModulesFileText } = require('./replaceFileText');

/**
 * 修改git配置包
 */
function modifyGitConfig() {
  const gitSyncCode = `const _args = (args || []).filter(item => item != '--first-parent');
  console.log('git execSync args', args);
  return execa.sync(command, _args, opts).stdout;`;
  replaceNodeModulesFileText('@lerna/child-process/index.js', 'return execa.sync(command, args, opts).stdout;', gitSyncCode, false);
}

modifyGitConfig();
