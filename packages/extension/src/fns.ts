/** 注册脚本方法到页面中 */
export const fns = (fn, name?: string) => {
  fns[fn?.name ?? name] = fn;
  return fn;
};

export const getPropsFinishedIndex = (codes: string) => {
  const codeStack = [];
  let cacheBytes = '';
  for (let i = 0, len = codes?.length; i < len; i++) {
    const code = codes?.[i];
    cacheBytes += code;
    if (/\$props\(\{$/.test(cacheBytes)) {
      codeStack?.push('props');
      continue;
    }
    if (code === '{') {
      codeStack?.push('{');
      continue;
    }
    if (code === '}') {
      const latest = codeStack?.[codeStack?.length - 1];
      if (latest === 'props') {
        for (let j = i + 1; j < codes?.length; j++) {
          if (codes?.[j] === '\n') {
            return j;
          }
          return j + 2;
        }
      }
      codeStack.pop();
      continue;
    }
  }
};

export const getFnFromCodeString = (codes: string[]) => {
  const componentProps = {};
  let cacheBytes = '';
  const codeStack = [];
  for (let i = 0, len = codes?.length; i < len; i++) {
    const code = codes?.[i];
    cacheBytes += code;
    cacheBytes = cacheBytes.replace(/(\/(\*)+.*\*\/)|(\/\/.*\n)/g, '');
    cacheBytes = cacheBytes.replace(/^(\,|\n|\s)+/, '');
    if (cacheBytes.includes('$props({')) {
      cacheBytes = '';
      codeStack.push('props');
      continue;
    }
    if (code === '}') {
      const latest = codeStack.pop();
      if (!['props', 'inFn'].includes(latest)) {
        /* 函数内容去掉开头的空格和换行 */
        componentProps[latest] = cacheBytes.replace(/^(\s|\n)*/, '');
        cacheBytes = '';
      }
      if (codeStack?.length <= 0) {
        break;
      }
      continue;
    }
    /* 1表示只取props下一层的函数，其他函数不提取 */
    if (code === '{') {
      /* 校验形如 onClick(){}类型的声明方式 */
      const namedFunc = '\\(.*\\)\\s*\\{';
      /* 校验形如 onClick：function(){}类型的声明方式 */
      const unnamedFunc = '\\:function\\s*\\(.*\\)\\s*\\{';
      /* 校验形如 onClick：()=>{}类型的声明方式 */
      const arrowFunc = '\\:\\(.*\\)\\s*\\=\\>\\s*\\{';
      const regex = new RegExp(
        `^[A-Za-z_][A-Za-z0-9_]*(${namedFunc}|${unnamedFunc}|${arrowFunc})$`
      );
      if (
        regex.test(cacheBytes.replace(/(\s|\n)+/g, '')) &&
        codeStack.length === 1
      ) {
        const fnName = cacheBytes
          .replace(new RegExp(`${namedFunc}|${unnamedFunc}|${arrowFunc}`), '')
          .replace(/(\s|\n)+/g, '');
        codeStack.push(fnName);
        continue;
      }
      codeStack.push('inFn');
      continue;
    }
  }
  return componentProps;
};
