const KEY_PREFIX = 'manana-care';
const PERSIST_KEY = 'userInfo'; // 持久化缓存key

const getStorageKey = (key: string) => `${KEY_PREFIX}_${key}`;

/** session */
const getSession = (key: string): string | null => {
  const _key = getStorageKey(key);
  return sessionStorage.getItem(_key);
};

const setSession = (key: string, val: string): void => {
  const _key = getStorageKey(key);
  sessionStorage.setItem(_key, val);
};

const removeSession = (key: string): void => {
  const _key = getStorageKey(key);
  sessionStorage.removeItem(_key);
};

/** local */
const getLocal = (key: string): string | null => {
  const _key = getStorageKey(key);
  return localStorage.getItem(_key);
};

const setLocal = (key: string, val: string): void => {
  const _key = getStorageKey(key);
  localStorage.setItem(_key, val);
};

const removeLocal = (key: string): void => {
  const _key = getStorageKey(key);
  localStorage.removeItem(_key);
};

/** 获取当前用户 */
const getCurrentUser = () => {
  const _key = getStorageKey(PERSIST_KEY);
  return JSON.parse(sessionStorage.getItem(_key) || '{}');
};

export default {
  getSession,
  setSession,
  removeSession,
  getLocal,
  setLocal,
  removeLocal,
  getCurrentUser,
};
