import { getComponent } from '../utils';

/**
 * 内置操作默认配置
 */
function sideReactions() {
  return `$props({
  /** 确认事件 */
  onOk() {
    ${getComponent(
    'SideSheet',
    `$form.query(key).take().setComponentProps({
      visible:false
    });`
  )}
    console.log('onOk')
  },
  /** 取消事件 */
  onClose() {
    ${getComponent(
    'SideSheet',
    `$form.query(key).take().setComponentProps({
      visible:false
    });`
  )}
  },
 });`;
}

/**
 * Dialog内置操作默认配置
 */
function dialogReactions() {
  return `function closeSide() {
    /* 关闭滑动侧边栏 */
    $self.setComponentProps({
      visible: false,
    });
  }
  function getKeys() {
    const sideKey =  Object.values($form.indexes).filter(
      (key) => $form.fields[key].decoratorType === "FormItem" &&
      key.includes($self.address.segments[0])
    );
    const Modified = sideKey.some((item) => $form.getFieldState(item).modified);
    return {
      sideKey,
      Modified,
    };
  }
  $props({
    /** 确认事件 */
    onOk() {
      const { sideKey } = getKeys();
      /* 收集错误信息 */
      let Error = [];
      $form
        .validate()
        .then(() => {
          if (!Error.length) {
            closeSide();
          }
        })
        .catch((err) => {
          if (Object.prototype.toString.call(err) === "[object Array]") {
            Error = sideKey.filter((item) =>
              err.find((ins) => ins.address !== item)
            );
          }
        });
    },
    /** 取消事件 */
    onCancel() {
      const { sideKey, Modified } = getKeys();
      if (Modified) {
        $Modal.confirm({
          title: "确定放弃对数据的修改吗?",
          onOk() {
            sideKey.forEach((item) => $form.query(item).take().reset());
            closeSide();
          },
        });
        return;
      }
      closeSide();
    },
  });`;
}
/**
 * 内置操作默认配置
 */
function sideSheetReactions() {
  return `function closeSide() {
    /* 关闭滑动侧边栏 */
    $self.setComponentProps({
      visible: false,
    });
  }
  function getKeys() {
    const sideKey = Object.values($form.indexes).filter(
      (key) => $form.fields[key].decoratorType === "FormItem" &&
      key.includes($self.address.segments[0])
    );
    const Modified = sideKey.some((item) => $form.getFieldState(item).modified);
    return {
      sideKey,
      Modified,
    };
  }
  $props({
    /** 确认事件 */
    onOk() {
      const { sideKey } = getKeys();
      /* 收集错误信息 */
      let Error = [];
      $form
        .validate()
        .then(() => {
          if (!Error.length) {
            closeSide();
          }
        })
        .catch((err) => {
          if (Object.prototype.toString.call(err) === "[object Array]") {
            Error = sideKey.filter((item) =>
              err.find((ins) => ins.address !== item)
            );
          }
        });
    },
    /** 取消事件 */
    onClose() {
      const { sideKey, Modified } = getKeys();
      if (Modified) {
        $Modal.confirm({
          title: "确定放弃对数据的修改吗?",
          onOk() {
            sideKey.forEach((item) => $form.query(item).take().reset());
            closeSide();
          },
        });
        return;
      }
      closeSide();
    },
  });`;
}
export { sideReactions, dialogReactions, sideSheetReactions };
