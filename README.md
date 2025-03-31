<h1>low code</h1>

---

## Introduction

If you are worrying about something builder, Such as form builder/table builder/chart builder/app builder etc.
Designable is your perfect choice.

## Features

- 🚀 High performance, Smooth and beautiful drag and drop experience
- 💡 Full scene coverage
- 🎨 Support Low Code and No Code
- 🏅 Strong scalability


## Test
- `yarn test`：执行所有测试用例
- `yarn test formily/antd`： 执行`formily/antd`包下的所有的测试用例
- `yarn test formily/antd/src/__tests__/mcui.test.tsx`： 执行`mcui.test.tsx`单个文件的测试用例
- `test:coverage`： 执行全部测试用例并生成覆盖率报表

## 迭代版本升级
- 新建分支 version_1.6
- `yarn prelease`
- 选择`Custom Version`选项
- 输入下个版本号，如1.5.0升级到1.6.0，输入：`1.6.0-dev.0`

## 编译发布
- `执行脚本publish.sh`
- 发布dev版本：
- `sh publish.sh dev`
- 发布正式版本：
- `sh publish.sh`