import React from 'react';
import { LowCodeRender } from 'low-code-formily-render';
import { Engine, TreeNode } from 'low-code-core';
import { getEngineSchema } from '../utils/schema';
import { useCustomComponentsToPreviewContext } from './CustomComponents';

export interface IProps {
  tree: TreeNode;
  engine: Engine;
  extendScope;
}
export const PreviewWidget: React.FC<IProps> = (props) => {
  const { engine, extendScope } = props;
  // const { graphql, restful } = useLowCode();
  const customPrevComponents = useCustomComponentsToPreviewContext();
  const schema = getEngineSchema(engine);
  // const { idWatermark } = useDataSourceContext();

  return (
    <LowCodeRender
      customComponents={customPrevComponents}
      schema={schema}
      extendScope={extendScope}
    />
  );
};
