/**
 * @Author: 许伟茂
 * @Description: 按钮代码模板
 * @Date: 2022/04/14 12:56
 */

import { setButtonEnable } from './buttonState';
import {
  LOW_CODE_VAR,
  MCTAB_SIDE,
  OPERATION_TYPE,
  SELECTED_ROW_KEY,
  SHOW_SIDE,
  TRIGGER_QUERY,
} from '../consts';
import { EOperationType } from '../types';

/**
 * 打开侧边栏
 * @param flag 标识
 * @param operationType 操作类型
 * @returns
 */
function openSideCode(flag: boolean, operationType: EOperationType) {
  return `/* 打开抽屉 */
  Object.keys($form?.indexes || {}).forEach((key) => {
    const fieldState = $form.getFieldState(key);
    if (fieldState?.component?.length > 1 &&
      fieldState?.component?.[0] == "McFormTab") {
      $form.query(key).take().setComponentProps({
        showSide:true,
        isSideEdit: ${operationType === 'edit' ? true : false}
      })
    }
    if (fieldState?.component?.length > 1 &&
      (fieldState?.component?.[1]?.tabmark == '${MCTAB_SIDE}')) {
        $form.query(key).take().setPattern('editable');
    }
  });
  // 设置操作类型
  $form.setValuesIn('${LOW_CODE_VAR}.${OPERATION_TYPE}', '${operationType}');
  `;
}

/**
 * 生成新增代码
 */
function genAdd() {
  return `$props({
  onClick() {
    ${setButtonEnable([EOperationType.SAVE], true)}
    // 设置新增类型
    $form.setValuesIn('${LOW_CODE_VAR}.${OPERATION_TYPE}', '${EOperationType.ADD
    }');
  },
});`;
}

/**
 * 生成编辑代码
 */
function genEdit() {
  return `$props({
  onClick() {
    ${setButtonEnable([EOperationType.SAVE], true)}
    // 设置编辑类型
    $form.setValuesIn('${LOW_CODE_VAR}.${OPERATION_TYPE}', '${EOperationType.EDIT
    }');
  },
});`;
}

/** 生成重置代码 */
function genReset() {
  return `$props({
  /** 点击事件 */
  onClick() {
    $form.reset();
  },
});`;
}

/** 触发查询 */
function triggerQuery() {
  return `// 触发查询
  $form.setValuesIn('${LOW_CODE_VAR}.${TRIGGER_QUERY}', new Date());
  `;
}

/**
 * 弹窗-新增
 */
function sideAdd() {
  return `$props({
  onClick() {
    ${openSideCode(false, EOperationType.ADD)}
    // 设置弹窗标识
  $form.setValuesIn('${LOW_CODE_VAR}.${SHOW_SIDE}', ${true});
  },
});`;
}

/**
 * 弹窗-编辑
 */
function sideEdit() {
  return `$props({
  onClick() {
    ${openSideCode(false, EOperationType.EDIT)}
    // 设置弹窗标识
  $form.setValuesIn('${LOW_CODE_VAR}.${SHOW_SIDE}', ${true});
  },
});
/** 按钮状态处理 */
$effect(() => {
  $self.setPattern($values?.${LOW_CODE_VAR}?.${SELECTED_ROW_KEY} ? "editable": "disabled");
}, [$values?.${LOW_CODE_VAR}?.${SELECTED_ROW_KEY}]);
`;
}


/**
 * 打开页面-弹窗/抽屉/弹出层
 */
function openComponent(key) {
  return `$props({
  onClick() {
    // 设置新增类型
    $form.setValuesIn('${LOW_CODE_VAR}.${OPERATION_TYPE}',$self.componentProps.${OPERATION_TYPE});
    $form.query('${key}').take().setComponentProps({
      visible:true
    })
  },
});`;
}
/**
 * 打开指定页面-弹窗
 */
function openInDialog(key, mainKey, currentWorkspaceId) {
  const clickFn = `$props({
    onClick() {
      $form.query('${key}').take().visible = true;
      $form.query('${currentWorkspaceId}').take().visible = false;
      // 设置弹窗标识
      $form.setValuesIn('${LOW_CODE_VAR}.${OPERATION_TYPE}', 'add');
      },
    });`;
  const effect = `$effect(()=>{
    $form.query('${key}').take().visible = false;
  },[])`;
  if (key === mainKey) {
    return clickFn;
  }
  return `
    ${clickFn}
    ${effect}
  `;
}
/**
 * 子表Tab切换Tab展示
 */
function sideTab(flag) {
  return `$props({
    onClick() {
      Object.keys($form?.indexes || {}).forEach((key) => {
        const fieldState = $form.getFieldState(key);
        if (
          fieldState?.component?.length > 1 &&
          fieldState?.component?.[0] == "SecondaryTab"
        ) {
          $form.query(key).take().setComponentProps({
            visible:${flag}
          })
        }
      });
      // 设置弹窗标识
      $form.setValuesIn('${LOW_CODE_VAR}.${SHOW_SIDE}', ${flag});
    },
  });`;
}
/**
 * 主界面-表单-返回
 */
function backTab() {
  return `function closeSide() {
    /* 关闭抽屉 */
    Object.keys($form?.indexes || {}).forEach((key) => {
      const fieldState = $form.getFieldState(key);
      if (
        fieldState?.component?.length > 1 &&
        fieldState?.component?.[0] == "SecondaryTab"
      ) {
        $form.query(key).take().setComponentProps({
          visible: false,
        });
      }
    });
    // 设置弹窗标识
    $form.setValuesIn('${LOW_CODE_VAR}.${SHOW_SIDE}', ${false});
  }
  $props({
    onClick() {
      const sideKey = Object.values($form?.indexes || {}).filter(
        (key) =>
          $form.getFieldState(key)?.component?.length > 1 &&
          $form.getFieldState(key)?.component?.[0] == "FormArea"
      );
      /* 找出表单下所有的key */
      const sideKeys = Object.values($form?.indexes || {}).filter(
        (key) => key.includes(sideKey[0]) && key !== sideKey[0]
      );
      const Modified = sideKeys.some(
        (item) => $form.getFieldState(item).modified
      );
      if (Modified) {
        $Modal.confirm({
          title: "确定放弃对数据的修改吗?",
          onOk() {
            sideKeys.map((item) => {
              $form.query(item).take().reset();
            });
            closeSide();
          },
        });
        return;
      }
      closeSide();
    },
  });
  `;
}
export {
  openInDialog,
  sideAdd,
  sideEdit,
  genAdd,
  genEdit,
  sideTab,
  genReset,
  backTab,
  triggerQuery,
  openSideCode,
  openComponent,
};
