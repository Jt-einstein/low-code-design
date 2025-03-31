/**
 * @Author: 许伟茂
 * @Description: 操作区schema
 * @Date: 2022/04/14 20:11
 */
import { ITreeNode } from 'low-code-core';
import { EOperationType, template } from 'low-code-extension';

const { genAdd, genEdit } = template;

export const operationAreaSetting: ITreeNode[] = [
  {
    componentName: 'Field',
    props: {
      type: 'void',
      'x-component': 'Operation',
      'x-component-props': {
        title: 'Operation',
      },
    },
    children: [
      {
        componentName: 'Field',
        props: {
          type: 'string',
          'x-component': 'McButton',
          'x-component-props': {
            operationType: EOperationType.ADD,
          },
          'x-reactions': {
            fulfill: {
              run: genAdd(),
            },
          },
        },
      },
      {
        componentName: 'Field',
        props: {
          type: 'string',
          'x-component': 'McButton',
          'x-component-props': {
            operationType: EOperationType.EDIT,
          },
          'x-reactions': {
            fulfill: {
              run: genEdit(),
            },
          },
        },
      },
      {
        componentName: 'Field',
        props: {
          type: 'string',
          'x-component': 'McButton',
          'x-component-props': {
            operationType: EOperationType.DELETE,
          },
        },
      },
    ],
  },
];
