/** 拼接日历图数据 */
export function getVirtulData(year = '2022') {
  const date = new Date(year + '-07-01').getTime();
  const end = new Date(year + '-12-31').getTime();
  const dayTime = 3600 * 24 * 1000;
  const data = [];
  for (let time = date; time <= end; time += dayTime) {
    data.push([formatterDate(time), Math.floor(Math.random() * 10000)]);
  }
  return data;
}

/** 转换时间戳至yyyy-MM-dd */
export function formatterDate(timestamp) {
  const date = new Date(parseInt(timestamp));
  const Year = date.getFullYear();
  const Moth =
    date.getMonth() + 1 < 10
      ? '0' + (date.getMonth() + 1)
      : date.getMonth() + 1;
  const Day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
  const result = Year + '-' + Moth + '-' + Day;
  return result;
}

/** 解决JSON转换成字符串时function丢失问题 */
export function JSONStringify(option) {
  const CReplaceSign = 'WILLREPLACE';
  return JSON.stringify(
    option,
    (key, val) => {
      if (typeof val === 'function') {
        return (
          CReplaceSign +
          val
            .toString()
            .replace(/\/\/.*/g, '') // 去掉代码中的注释
            .replace(/\s+/g, '')
            .replace('return', 'return ') +
          CReplaceSign
        );
      }
      if (typeof val === 'undefined') {
        return 'undefined';
      }
      return val;
    },
    2
  )
    .replace(new RegExp('"' + CReplaceSign, 'g'), '')
    .replace(new RegExp(CReplaceSign + '"', 'g'), '');
}
