import { InputNumber, Input } from 'antd';
import { createPolyInput } from '../PolyInput';

const formula = ['calc', 'min', 'max', 'clamp', 'attr', 'var'];

const takeNumber = (value: any) => {
  const num = String(value)
    .trim()
    .replace(/[^\d\.]+/, '');
  if (num === '') return;
  return Number(num);
};

const createUnitType = (type: string) => {
  return {
    type,
    component: InputNumber,
    checker(value: any) {
      if ((formula ?? []).some((item) => String(value)?.includes?.(item))) {
        return false;
      }
      return String(value).includes(type);
    },
    toInputValue(value: any) {
      return takeNumber(value);
    },
    toChangeValue(value: any) {
      return `${value || 0}${type}`;
    },
  };
};

const createFormula = () => {
  return {
    type: '公式',
    component: Input,
    checker(value: any) {
      return (formula ?? []).some((item) => String(value)?.includes?.(item));
    },
    toInputValue(value: any) {
      return `${value || ''}`;
    },
    toChangeValue(value: any) {
      return `${value || ''}`;
    },
  };
};

const createSpecialSizeOption = (type: string) => ({
  type: type,
  checker(value: any) {
    if (value === type) return true;
    return false;
  },
  toChangeValue() {
    return type;
  },
});

const NormalSizeOptions = [
  createSpecialSizeOption('inherit'),
  createSpecialSizeOption('auto'),
  createUnitType('px'),
  createUnitType('%'),
  createUnitType('vh'),
  createUnitType('em'),
  createFormula(),
];

export const SizeInput = createPolyInput(NormalSizeOptions);

export const BackgroundSizeInput = createPolyInput([
  createSpecialSizeOption('cover'),
  createSpecialSizeOption('contain'),
  createUnitType('px'),
  createUnitType('%'),
  createUnitType('vh'),
  createUnitType('em'),
]);
