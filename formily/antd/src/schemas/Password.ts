import { ISchema } from '@formily/react';
import { paramTypeSetting } from '../utils/schema-setting';
import { Input } from './Input';
export const Password: ISchema = {
  type: 'object',
  properties: {

    ...(Input.properties as any),
    /** 参数类型 */
    ...paramTypeSetting(),
  },
};
