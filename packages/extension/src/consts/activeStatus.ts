import { EActiveStatus } from '../types';

const CActiveStatus = {
  [EActiveStatus.ALL]: '全部',
  [EActiveStatus.ENABLED]: '启用',
  [EActiveStatus.DISABLED]: '停用',
  [EActiveStatus.DELETED]: '已删除',
};

const CActiveStatusEnum = [
  { label: CActiveStatus[EActiveStatus.ALL], value: EActiveStatus.ALL },
  { label: CActiveStatus[EActiveStatus.ENABLED], value: EActiveStatus.ENABLED },
  {
    label: CActiveStatus[EActiveStatus.DISABLED],
    value: EActiveStatus.DISABLED,
  },
  { label: CActiveStatus[EActiveStatus.DELETED], value: EActiveStatus.DELETED },
];

export { CActiveStatus, CActiveStatusEnum };
