/**
 * @Author: 许伟茂
 * @Description: 全局配置
 * @Date: 2022/04/11 18:50
 */
import { action, define } from '@formily/reactive';

export class McConfig {
  /** 最近选择的域 */
  latestDomain: string;

  constructor() {
    this.makeObservable();
  }

  /** 获取最近选择的domain */
  getLatestDomain() {
    return this.latestDomain;
  }

  /** 设置最近选择的domain */
  setLatestDomain(domain: string) {
    this.latestDomain = domain;
  }

  makeObservable() {
    define(this, {
      setLatestDomain: action,
      getLatestDomain: action,
    });
  }
}
