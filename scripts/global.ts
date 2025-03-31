import prettyFormat from 'pretty-format';

global['prettyFormat'] = prettyFormat;

global['sleep'] = (time) => {
  return new Promise((resolve) => {
    let timer = null;
    clearTimeout(timer);
    timer = setTimeout(resolve, time);
  });
};

global['requestAnimationFrame'] = (fn) => {
  let timer = null;
  clearTimeout(timer);
  timer = setTimeout(fn);
  return timer;
};

global.document.documentElement.style['grid-column-gap'] = true;
