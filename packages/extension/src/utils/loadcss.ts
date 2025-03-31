export const loadcss = (arr) => {
  if (arr && arr[0]?.data) {
    let formatCss = arr[0]?.data;
    let existingStyle = document.getElementById('dynamic-style');
    if (existingStyle) {
      existingStyle.parentNode.removeChild(existingStyle);
    }
    let style = document.createElement('style');
    style.id = 'dynamic-style';
    style.innerHTML = formatCss;
    document.head.appendChild(style);
  }
};