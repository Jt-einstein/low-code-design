export interface IReaction {
  componentName(arg0: string, componentName: any);
  dependencies?: {
    [key: string]: string;
  };
  fulfill?: {
    state?: {
      [key: string]: string;
    };
    schema?: {
      [key: string]: string;
    };
  };
}
