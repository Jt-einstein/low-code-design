import React from 'react';
import { ErrorBoundary } from '@astraflux/low-code-react';

const DesignerContainer: React.FC = (props) => {
  return (
    <ErrorBoundary>
      <div>{props.children}</div>
    </ErrorBoundary>
  );
};

export default DesignerContainer;
