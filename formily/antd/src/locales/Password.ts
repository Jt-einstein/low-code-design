import { createLocales } from 'low-code-core';
import { Input } from './Input';

export const Password = createLocales(Input, {
  'zh-CN': {
    title: '密码输入',
    'x-component-props': {

      paramtype: '参数类型',
    }
  },
  'en-US': {
    title: 'Password',
  },
  'ko-KR': {
    title: '비밀번호',
  },
});
