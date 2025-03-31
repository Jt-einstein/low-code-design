let watermark = {} as any;

function setWatermark(args) {
  //声明一个怪异一点的变量，确保id的唯一性
  let id = '111.222.333.456';
  let xIndex = 15;//绘制文本的 x 坐标位置
  let yIndex = 65;//绘制文本的 y 坐标位置
  let xInterval = 25;//有多个参数时的行间间隔
  if (document.getElementById(id) !== null) {
    document.body.removeChild(document.getElementById(id));
  }
  //利用canvas绘制水印信息
  let can = document.createElement('canvas');
  can.width = 250;
  can.height = 150;
  let cans = can.getContext('2d');
  cans.rotate(-20 * Math.PI / 180);
  cans.font = '17px Vedana';
  // ziti yanse
  cans.fillStyle = 'rgba(200, 200, 200, 0.30)';
  cans.textAlign = 'left';
  cans.textBaseline = 'middle';
  for (let i = 0; i < args.length; i++) {
    cans.fillText(args[i], xIndex, yIndex); //绘制水印文案
    yIndex += xInterval;//设置每行间隔
  }
  //创建div用于显示
  let div = document.createElement('div');
  div.id = id;
  div.style.pointerEvents = 'none';
  div.style.top = '70px';
  div.style.left = '90px';
  div.style.position = 'fixed';
  div.style.zIndex = '100000';
  div.style.width = document.documentElement.clientWidth - 50 + 'px';
  div.style.height = document.documentElement.clientHeight - 50 + 'px';
  //div承载水印显示
  div.style.background = 'url(' + can.toDataURL('image/png') + ') left top repeat';
  document.body.appendChild(div);
  return id;
}

function createObserver(id, args) {
  // 创建一个观察器实例并传入回调函数
  let observer = new MutationObserver(() => {
    if (document.getElementById(id) === null) {
      id = setWatermark(args);
    }
  });

  let option = {
    'childList': true,//子元素的变动
    'subtree': true//所有下属节点（包括子节点和子节点的子节点）的变动
  };

  observer.observe(document.body, option);//观察body下节点的变化
}

watermark.set = function () {
  let args = Array.prototype.slice.apply(arguments);
  let id = setWatermark(args);

  // 创建观察器检测如果水印被去掉了，自动给加上
  createObserver(id, args);

  //在窗口大小改变之后,自动触发加水印事件
  window.onresize = function () {
    setWatermark(args);
  };
};

export { watermark };