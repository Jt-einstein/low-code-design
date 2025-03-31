import React from 'react';
import { Empty } from 'antd';

type TState = {
  hasError: boolean;
};

export class ErrorBoundary extends React.Component<any, TState> {
  constructor(props: any) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: any) {
    return { hasError: true, error };
  }

  componentDidCatch() {}

  render() {
    if (this.state.hasError) {
      return (
        <Empty
          style={{ paddingTop: 100 }}
          description="页面渲染错误，请检查配置"
        />
      );
    }

    return this.props.children;
  }
}
