import { BaseFieldSchema, SchemaProps } from './BaseFieldSchema';

export class VoidFieldSchema extends BaseFieldSchema {
  constructor() {
    super();
  }

  createSchema(props?: SchemaProps) {
    return super.createSchema({
      ...props,
      componentStyleGroup: props?.componentStyleGroup ?? true,
    });
  }
}
