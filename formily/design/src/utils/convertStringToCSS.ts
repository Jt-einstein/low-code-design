// 将string转换为 CSS 格式的字符串
export function convertStringToCSS(str) {
  let css = '';
  const lines = str.split('\n');

  for (let line of lines) {
    line = line.trim();

    if (line !== '') {
      css += line + '\n';
    }
  }

  return css;
}