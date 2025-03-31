import { action, define, observable } from '@formily/reactive';

export class GlobalUtils {
  /* 系统预置的工具函数 */
  globalMc: any;
  /* 拓展的工具函数 */
  globalExt: any;
  restful: any;

  constructor() {
    this.globalMc = {};
    this.globalExt = {};
    this.makeObservable();
  }

  clear() {
    this.globalMc = {};
    this.globalExt = {};
  }

  makeObservable() {
    define(this, {
      clear: action,
      globalMc: observable.ref,
      globalExt: observable.ref,
    });
  }
}
