import child_process from 'child_process';
import path from 'path';
import fs from 'fs-extra';
import { GlobSync } from 'glob';

type TPkgInfo = { src: string; pkgName: string; dir: string };

/** 获取每个包的源码目录 */
function getPkgInfo() {
  const basePath = path.resolve(__dirname, '../');
  const pkg = fs.readJSONSync(path.resolve(basePath, 'package.json')) || {};
  const workspaces = pkg.workspaces;
  const results: TPkgInfo[] = [];
  if (Array.isArray(workspaces)) {
    workspaces.forEach((pattern) => {
      const { found } = new GlobSync(pattern, { cwd: basePath });
      found.forEach((name) => {
        const pkg = fs.readJSONSync(
          path.resolve(basePath, name, './package.json')
        );
        results.push({
          pkgName: pkg.name as string,
          dir: name,
          src: `${name}/src`,
        });
      });
    });
  }
  return results;
}

function tsChecker() {
  const pkgInfo = getPkgInfo();
  const data = child_process.execSync('git diff --cached --name-only', {
    encoding: 'utf-8',
  });
  const files = data.split('\n').filter((file) => /[\.ts|\.tsx]$/g.test(file));

  const changeInfo: Record<string, TPkgInfo & { files: string[] }> = {};
  pkgInfo.forEach((info) => {
    changeInfo[info.pkgName] = { ...info, files: [] };
    files.forEach((file) => {
      const isExist = file.startsWith(info.src);
      if (isExist) {
        changeInfo[info.pkgName].files.push(file.replace(`${info.dir}/`, ''));
      }
    });
  });


  const pkgs = Object.keys(changeInfo);

  for (const pkgName of pkgs) {
    const pkgInfo = changeInfo[pkgName];
    if (!pkgInfo.files.length) {
      continue;
    }
    const cwd = path.resolve(__dirname, '../', pkgInfo.dir);

    const basePath = path.resolve(__dirname, '../');
    const configPath = path.resolve(basePath, pkgInfo.dir, 'tsconfig.dev.json');
    const pkgJson = {
      extends: '../../tsconfig.json',
      files: pkgInfo.files,
    };

    fs.writeFileSync(configPath, JSON.stringify(pkgJson, null, 2));

    try {
      const command = `yarn tsc --project tsconfig.dev.json --noEmit true`;
      const res = child_process.execSync(command, {
        encoding: 'utf-8',
        cwd,
      });
      console.log(res);
    } catch (err) {
      // console.error(err?.stdout);
      throw new Error(err?.stdout);
    }
  }
}

tsChecker();
