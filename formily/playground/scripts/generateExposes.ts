import { Project, SyntaxKind, ts, Node } from 'ts-morph';
import path from 'path';
import fs from 'fs-extra';

type Content = {
  name: string;
  content: string;
};

type Options = {
  /** 导出组件的入口文件 */
  exportFile: string;
  /** 生成的文件目录 */
  generateDir: string;
  /** 生成的文件类型, 默认为ts */
  filetype?: 'ts' | 'js';
  /** 转换引入的包名称 */
  transform?: (libraryName: string) => string;
};

/** 根据语法类型过滤节点，返回数组 */
function filterNodeBySyntaxKind(nodes: Node<ts.Node>[], kind: ts.SyntaxKind) {
  return nodes
    .filter((node) => node.getKind() === kind)
    .map((node) => node.getText());
}

/** 根据语法类型过滤节点，返回对象 */
function findNodeBySyntaxKind(nodes: Node<ts.Node>[], kind: ts.SyntaxKind) {
  return filterNodeBySyntaxKind(nodes, kind)?.[0];
}

/** 根据导出index文件获取导出内容 */
export const getExportContent = (
  path: string,
  transform?: Options['transform']
) => {
  const project = new Project();

  // 添加源代码
  const source = project.addSourceFileAtPath(path);

  const content: Content[] = [];

  source.forEachChild((item) => {
    const text = item.getText();

    // 不处理非导出类型语法
    if (item.getKind() !== SyntaxKind.ExportDeclaration) {
      return;
    }

    // 不处理导出类型
    if (text.startsWith('export type')) {
      return;
    }

    const nodes = item.forEachDescendantAsArray();

    // nodes.forEach((node) => {
    //   console.log(node.getKindName(), node.getText());
    // });

    // export { ComponentA, ComponentB } from 'module' => ['ComponentA', 'ComponentB']
    // export { default as Module, Component } from 'module' => ['default', 'Module', 'Component']
    // export * as module from 'module' => []
    const identifiers = filterNodeBySyntaxKind(nodes, SyntaxKind.Identifier);

    // 如果是*号导出时有值，此时identifiers返回为空数组
    // export * as lodash from 'lodash' => '* as lodash'
    // export { Component } from 'module' => ''
    const namespaceExport = findNodeBySyntaxKind(
      nodes,
      SyntaxKind.NamespaceExport
    );

    // export { Component } from 'module' => 'module'
    const stringLiteral = findNodeBySyntaxKind(nodes, SyntaxKind.StringLiteral);

    const libraryName = transform?.(stringLiteral) || stringLiteral;

    // 跳过此次循环的下标
    let breakIndex = -1;

    for (let i = 0; i < identifiers.length; i++) {
      if (breakIndex === i) {
        continue;
      }

      const identifier = identifiers[i];

      // 如果有默认导出, 则跳过下一次循环
      if (identifier === 'default') {
        breakIndex = i + 1;
        content.push({
          name: identifiers[i + 1],
          content: `export { default } from ${libraryName};`,
        });
        continue;
      }

      // 如果包含*号导出
      if (namespaceExport?.includes('* as')) {
        content.push({
          name: identifier,
          content: `export * as default from ${libraryName};`,
        });
        continue;
      }

      content.push({
        name: identifier,
        content: `export { ${identifier} as default } from ${libraryName};`,
      });
    }
  });

  return content;
};

/** 生成导出文件 */
async function generateExposesFile(
  dir: string,
  content: Content[],
  filetype: string
) {
  // 生成目录时先删除旧目录数据
  await fs.remove(dir);
  // 删除后重新创建目录
  await fs.mkdir(dir);

  for (const item of content) {
    const filepath = path.resolve(dir, `${item.name}.${filetype}`);
    await fs.writeFile(filepath, item.content);
  }
}

/** 生成模块联邦exposes JSON配置 */
async function generateExposesJson(dir: string, content: Content[]) {
  const filename = path.resolve(dir, 'index.json');
  // 目录名称
  const dirName = path.basename(dir);
  const map: Record<string, string> = {};

  content.forEach((item) => {
    map[`./${item.name}`] = `./${dirName}/${item.name}`;
  });

  await fs.writeFile(filename, JSON.stringify(map, null, 2));
}

async function generateExposes(options: Options) {
  const { exportFile, generateDir, filetype = 'ts', transform } = options;
  const content = getExportContent(exportFile, transform);
  await generateExposesFile(generateDir, content, filetype);
  await generateExposesJson(generateDir, content);
}

generateExposes({
  exportFile: path.resolve(__dirname, '../../design/src/index.ts'),
  generateDir: path.resolve(__dirname, '../exposes'),
  transform: (libraryName: string) => {
    return libraryName.replace('./', 'low-code-formily-design/esm/');
  },
});
