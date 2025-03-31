import { createBehavior } from 'low-code-core';
import { AllSchemas } from '../../schemas';
import { AllLocales } from '../../locales';
import { VoidFieldSchema } from '../Field';

export const createArrayBehavior = (name: string, icon?: any) => {
  const propsVoidSchema = new VoidFieldSchema();

  // const propsFieldSchema = new FieldSchema();

  return createBehavior(
    {
      name,
      extends: ['Field'],
      selector: (node) => node.props['x-component'] === name,
      designerProps: {
        droppable: true,
        propsSchema: propsVoidSchema?.createSchema({
          component: AllSchemas[name],
          // decorator: AllSchemas.FormItem,
        }),
        icon,
      },
      designerLocales: AllLocales[name],
    },
    {
      name: `${name}.Addition`,
      extends: ['Field'],
      selector: (node) => node.props['x-component'] === `${name}.Addition`,
      designerProps: {
        allowDrop(parent) {
          return parent.props['x-component'] === name;
        },
        propsSchema: propsVoidSchema?.createSchema({
          component: AllSchemas[name].Addition,
        }),
      },
      designerLocales: AllLocales.ArrayAddition,
    },
    {
      name: `${name}.Remove`,
      extends: ['Field'],
      selector: (node) => node.props['x-component'] === `${name}.Remove`,
      designerProps: {
        allowDrop(parent) {
          return parent.props['x-component'] === name;
        },
        propsSchema: propsVoidSchema?.createSchema(),
      },
      designerLocales: AllLocales.ArrayRemove,
    },
    {
      name: `${name}.Index`,
      extends: ['Field'],
      selector: (node) => node.props['x-component'] === `${name}.Index`,
      designerProps: {
        allowDrop(parent) {
          return parent.props['x-component'] === name;
        },
        propsSchema: propsVoidSchema?.createSchema(),
      },
      designerLocales: AllLocales.ArrayIndex,
    },
    {
      name: `${name}.MoveUp`,
      extends: ['Field'],
      selector: (node) => node.props['x-component'] === `${name}.MoveUp`,
      designerProps: {
        allowDrop(parent) {
          return parent.props['x-component'] === name;
        },
        propsSchema: propsVoidSchema?.createSchema(),
      },
      designerLocales: AllLocales.ArrayMoveUp,
    },
    {
      name: `${name}.MoveDown`,
      extends: ['Field'],
      selector: (node) => node.props['x-component'] === `${name}.MoveDown`,
      designerProps: {
        allowDrop(parent) {
          return parent.props['x-component'] === 'ArrayCards';
        },
        propsSchema: propsVoidSchema?.createSchema(),
      },
      designerLocales: AllLocales.ArrayMoveDown,
    }
  );
};
