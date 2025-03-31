import React from 'react';
import { LocalLayoutWidget } from 'low-code-react';
import { LocalTemplateCatg } from '../type';

export const LocalFormworkWidget: React.FunctionComponent<{
  components: LocalTemplateCatg[];
}> = (props) => {

  return (
    <>
      {(props?.components ?? []).map((item) => {
        const components = (item.children ?? []).map((component) => {
          return {
            Resource: component?.design?.Resource,
          };
        });

        return (
          <LocalLayoutWidget
            title={item?.title}
            sources={components}
            key={item?.key}
          />
        );
      })}
    </>
  );
};
