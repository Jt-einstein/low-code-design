import { onFieldInputValueChange, onFieldValueChange } from '@formily/core';
import {
  getFnFromCodeString,
  getPropsFinishedIndex,
} from 'low-code-extension';

export const useEventSynchronization = () => {
  const handleEventSynchronization = ({ form }) => {
    /* 响应配置代码同步 */
    onFieldInputValueChange('*(events)', (field) => {
      const propsStartIndex =
        form?.values?.['x-reactions']?.fulfill?.run.indexOf('$props({');
      if (propsStartIndex < 0) {
        form?.setValuesIn('x-reactions', {
          ...form?.values?.['x-reactions'],
          fulfill: {
            ...form?.values?.['x-reactions']?.fulfill,
            run: `$props({${Object.values(field?.value).join(',\n ')}});\n${
              form?.values?.['x-reactions']?.fulfill?.run
            }`,
          },
        });
        return;
      }
      const propsFinishedIndex = getPropsFinishedIndex(
        form?.values?.['x-reactions']?.fulfill?.run
      );
      const prevCode = form?.values?.['x-reactions']?.fulfill?.run ?? '';
      const modifiedString = `${prevCode.slice(
        0,
        propsStartIndex
      )}\n\n$props({\n${Object.values(field?.value).join(
        ',\n'
      )}\n});\n${prevCode.slice(propsFinishedIndex)}`;
      form?.setValuesIn('x-reactions', {
        ...form?.values?.['x-reactions'],
        fulfill: {
          ...form?.values?.['x-reactions']?.fulfill,
          run: modifiedString,
        },
      });
    });
    onFieldValueChange('*(x-reactions)', (field) => {
      if (!field?.value?.fulfill?.run) {
        form?.setValuesIn('events', {});
        return;
      }
      const codes = field?.value?.fulfill?.run.match(/\b\w+\b|[^\w]/g);
      const fns = getFnFromCodeString(codes);
      form?.setValuesIn('events', fns);
    });
  };

  return { handleEventSynchronization };
};
