import React from 'react';
import ReactDOM from 'react-dom';
import Designer from './Designer';
import { ConfigProvider } from 'antd';
import './style.less';

const App = () => {
  return (
    <ConfigProvider>
      <Designer />
    </ConfigProvider>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
