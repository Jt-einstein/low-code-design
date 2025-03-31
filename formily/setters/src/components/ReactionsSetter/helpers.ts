import {
  ACTIVE_STATUS,
  EOperationType,
  LOW_CODE_VAR,
  MCTAB_SIDE,
  OPERATION_TYPE,
  PAGE_INFO,
  SELECTED_ROW,
  SELECTED_ROW_KEY,
  TRIGGER_QUERY,
} from 'low-code-extension';

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
function getComponent(name: string, action: string, moreAction?: string) {
  return `Object.keys($form?.indexes || {}).forEach((key) => {
  const fieldState = $form.getFieldState(key);
  if (fieldState?.component?.length > 1 && fieldState?.component?.[0] == '${name}') {
    ${action}
  }
  ${moreAction ? moreAction : ''}})`;
}
export const GlobalHelper = `
/** 
 * You can use the built-in context variables
 * 
 * 1. \`$self\` is the current Field Model 
 * 
 * 2. \`$form\` is the current Form Model 
 * 
 * 3. \`$deps\` is the dependencies value
 * 
 * 4. \`$observable\` function is used to create an persistent observable state object
 *
 * 5. \`$memo\` function is is used to create a persistent data
 * 
 * 6. \`$effect\` function is used to handle side-effect logic
 * 
 * 7. \`$props\` function is used to set component props to current field
 * 
 * Document Links
 * 
 * https://react.formilyjs.org/api/shared/schema#%E5%86%85%E7%BD%AE%E8%A1%A8%E8%BE%BE%E5%BC%8F%E4%BD%9C%E7%94%A8%E5%9F%9F
 **/
`;

export const BooleanHelper = `
/** 
 * Example 1
 * Static Boolean
 **/
false

/** 
 * Example 2
 * Equal Calculation
 **/
$deps.VariableName === 'TARGET_VALUE'

/** 
 * Example 3
 * Not Equal Calculation
 **/
$deps.VariableName !== 'TARGET_VALUE'

/** 
 * Example 4
 * And Logic Calculation
 **/
$deps.VariableName1 && $deps.VariableName2

/** 
 * Example 5
 * Grater Logic Calculation
 **/
$deps.VariableName > 100

/** 
 * Example 6
 * Not Logic Calculation
 **/
!$deps.VariableName

${GlobalHelper}
`;

export const DisplayHelper = `
/** 
 * Example 1
 * Static Mode
 **/
'none'

/** 
 * Example 2
 * Equal Condition Associated
 **/
$deps.VariableName === 'TARGET_VALUE' ? 'visible' : 'none'

/** 
 * Example 3
 * Not Equal Condition Associated
 **/
$deps.VariableName !== 'TARGET_VALUE' ? 'visible' : 'hidden'

/** 
 * Example 4
 * And Logic Condition Associated
 **/
$deps.VariableName1 && $deps.VariableName2 ? 'visible' : 'none'

/** 
 * Example 5
 * Grater Logic Condition Associated
 **/
$deps.VariableName > 100 ? 'visible' : 'hidden'

/** 
 * Example 6
 * Not Logic Condition Associated
 **/
!$deps.VariableName ? 'visible' : 'none'

${GlobalHelper}
`;

export const PatternHelper = `
/** 
 * Example 1
 * Static Mode
 **/
'readPretty'

/** 
 * Example 2
 * Equal Condition Associated
 **/
$deps.VariableName === 'TARGET_VALUE' ? 'editable' : 'disabled'

/** 
 * Example 3
 * Not Equal Condition Associated
 **/
$deps.VariableName !== 'TARGET_VALUE' ? 'editable' : 'readOnly'

/** 
 * Example 4
 * And Logic Condition Associated
 **/
$deps.VariableName1 && $deps.VariableName2 ? 'editable' : 'readPretty'

/** 
 * Example 5
 * Grater Logic Condition Associated
 **/
$deps.VariableName > 100 ? 'editable' : 'readOnly'

/** 
 * Example 6
 * Not Logic Condition Associated
 **/
!$deps.VariableName ? 'editable' : 'disabled'

${GlobalHelper}
`;

export const StringHelper = `
/** 
 * Example 1
 * Static String
 **/
'Normal String Text'

/** 
 * Example 2
 * Associated String
 **/
$deps.VariableName === 'TARGET_VALUE' ? 'Associated String Text' : ''

${GlobalHelper}
`;

export const AnyHelper = `
/** 
 * Example 1
 * String Type
 **/
'String'

/** 
 * Example 2
 * String Array
 **/
['StringArray']

/** 
 * Example 3
 * Object Array
 **/
[{ key: 'ObjectArray' }]

/** 
 * Example 4
 * Boolean
 **/
true

/** 
 * Example 5
 * RegExp
 **/

/\d+/

/** 
 * Example 1
 * Associated String Value
 **/
$deps.VariableName + 'Compose String'

/** 
 * Example 2
 * Associated Array Value
 **/
[ $deps.VariableName ]

/** 
 * Example 3
 * Associated Object Value
 **/
{
  key : $deps.VariableName
}

/** 
 * Example 4
 * Associated Boolean Value
 **/
!$deps.VariableName

${GlobalHelper}
`;

export const DataSourceHelper = `
/** 
 * Example 1
 * Static DataSource
 **/
[
  { label : "item1", value: "1" },
  { label : "item2", value: "2" }
]

/** 
 * Example 2
 * Associated DataSource
 **/
[
  { label : "item1", value: "1" },
  { label : "item2", value: "2" },
  ...$deps.VariableName
]

${GlobalHelper}
`;

export const ComponentPropsHelper = `
/** 
 * Example 1
 * Static Props
 **/
{
  placeholder: "This is placeholder"
}

/** 
 * Example 2
 * Associated Props
 **/
{
  placeholder: $deps.VariableName
}

${GlobalHelper}
`;

export const DecoratorPropsHelper = `
/** 
 * Example 1
 * Static Props
 **/
{
  labelCol:6
}

/** 
 * Example 2
 * Associated Props
 **/
{
  labelCol: $deps.VariableName
}

${GlobalHelper}
`;

export const FulfillRunHelper = `
/* 点击事件 */
$props({
  onClick() {
    console.log("onClick");
  },
});

/* 组件内数据响应 */
const state = $observable({
  keyword:''
})

$props({
  onSearch(keyword){
    state.keyword = keyword
  }
})
/* 数据源 */
$effect(()=>{
  $self.loading = true
  fetch(\`//some.domain/getSomething?q=\${state.keyword}\`)
    .then(response=>response.json())
    .then(({ data })=>{
      $self.loading = false
      $self.dataSource = data
    },()=>{
      $self.loading = false
    })
},[ state.keyword ])

/* 数据源驱动响应 */
const state = $observable({
  keyword:''
})

$props({
  onSearch(keyword){
    state.keyword = keyword
  }
})

$effect(()=>{
  $self.loading = true
  fetch(\`//some.domain/getSomething?q=\${state.keyword}&other=\${$deps.VariableName}\`)
    .then(response=>response.json())
    .then(({ data })=>{
      $self.loading = false
      $self.dataSource = data
    },()=>{
      $self.loading = false
    })
},[ state.keyword, $deps.VariableName ])

${GlobalHelper}
`;

export const RunHelper = {
  McButton: `McButton
  /* 事件 */
$props({
  /* 点击时的回调 */
  onClick() {
    console.log("onClick");
  },
});
${GlobalHelper}`,
  McCheckbox: `McCheckbox
  /* 事件 */
 $props({
  /* 输入框内容变化时的回调 */
  onChange() {
     console.log("onChange");
   },
 });
 /* 数据源 */
 $effect(()=>{
   $self.loading = true
   fetch('//some.domain/getSomething')
     .then(response=>response.json())
     .then(({ data })=>{
       $self.loading = false
       $self.dataSource = data
     },()=>{
       $self.loading = false
     })
 },[])
 ${GlobalHelper}`,
  McCollapse: `McCollapse
 /* 事件 */
  $props({
    /* 输入框内容变化时的回调 */
   onChange() {
      console.log("onChange");
    },
  });
  ${GlobalHelper}`,
  McInput: `McInput
  /* 事件 */
  $props({
  /* 输入框内容变化时的回调 */
  onChange() {
    console.log("onChange");
    },
  /* 按下回车的回调 */
  onPressEnter() {
    console.log("onPressEnter");
  },
  });
  ${GlobalHelper}`,
  AdaptInput: `AdaptInput
  /* 事件 */
  $props({
  /* 输入框内容变化时的回调 */
  onChange() {
    console.log("onChange");
    },
  /* 输入的回调 */
  onInput() {
    console.log("onInput");
  },
  });
  ${GlobalHelper}`,
  'McInput.TextArea': `McInput.TextArea
  /* 事件 */
  $props({
    /* 按下回车的回调 */
    onPressEnter() {
      console.log("onPressEnter");
    },
    /* resize 回调 */
    onResize() {
      console.log("onResize");
    },
  });
  ${GlobalHelper}`,
  'McInput.Password': `McInput.Password
  /* 事件 */
$props({
  /* 输入框内容变化时的回调 */
  onChange() {
    console.log("onChange");
  },
});
${GlobalHelper}`,
  McNumber: `McNumber
  /* 事件 */
  $props({
  /* 变化回调 */
  onChange() {
    console.log("onChange");
    },
  /* 按下回车的回调 */
  onPressEnter() {
    console.log("onPressEnter");
    },
  /*点击上下箭头的回调 */
  onStep() {
    console.log("onStep");
  },
  });
  ${GlobalHelper}`,
  'McRadio.Group': `McRadio.Group
  /* 事件 */
  $props({
    /* 变化回调 */
    onChange() {
      console.log("onChange");
    },
  });
  /* 数据源 */
  $effect(()=>{
    $self.loading = true
    fetch('//some.domain/getSomething')
      .then(response=>response.json())
      .then(({ data })=>{
        $self.loading = false
        $self.componentProps.dataSource = data
      },()=>{
        $self.loading = false
      })
  },[])
  ${GlobalHelper}`,
  McSearch: `McSearch
  /* 事件 */
  $props({
  /* 选中 option 时的回调, 仅在传入 options 时生效 */
  onSelect() {
      console.log("onSelect");
    },
    /* 点击搜索图标、清除图标，或按下回车键时的回调 */
    onSearch() {
      console.log("onSearch");
    },
  });`,
  McSelect: `McSelect
  /* 事件 */
  $props({
    /* 选中 option，或 input 的 value 变化时，调用此函数 */
    onChange() {
      console.log("onChange");
    },
    /* 文本框值变化时回调 */
    onSearch() {
      console.log("onSearch");
    },
    /* 被选中时调用，参数为选中项的 value (或 key) 值 */
    onSelect() {
      console.log("onSelect");
    },
    /* 清除内容时回调 */
    onClear() {
        console.log("onClear");
      },
    /* 取消选中时调用，参数为选中项的 value (或 key) 值，仅在 multiple 或 tags 模式下生效 */
    onDeselect() {
      console.log("onDeselect");
    },
    /* 展开下拉菜单的回调 */
    onDropdownVisibleChange() {
      console.log("onDropdownVisibleChange");
    },
    /* 获得焦点时回调 */
    onFocus() {
      console.log("onFocus");
    },
    /* 按键按下时回调 */
    onInputKeyDown() {
      console.log("onInputKeyDown");
    },
    /* 鼠标移入时回调 */
    onMouseEnter() {
      console.log("onMouseEnter");
    },
    /* 鼠标移出时回调 */
    onMouseLeave() {
      console.log("onMouseLeave");
    },
  });
  /* 数据源 */
  $effect(()=>{
    $self.loading = true
    fetch('//some.domain/getSomething')
      .then(response=>response.json())
      .then(({ data })=>{
        $self.loading = false
        $self.componentProps.dataSource = data
      },()=>{
        $self.loading = false
      })
  },[])
  ${GlobalHelper}`,
  McSwitch: `McSwitch
  /* 事件 */
  $props({
  /* 变化时回调函数 */
  onChange() {
      console.log("onChange");
    },
    /* 点击时回调函数 */
    onClick() {
      console.log("onClick");
    },
  });
  ${GlobalHelper}`,
  McTab: `McTab
  /* 事件 */
$props({
  /* 切换面板的回调 */
  onChange() {
    console.log("onChange");
  },
  /* 新增和删除页签的回调，在 type="editable-card" 时有效 */
  onEdit() {
      console.log("onEdit");
    },
  /* tab 被点击的回调 */
  onTabClick() {
      console.log("onTabClick");
    },
  /* tab 滚动时触发 */
  onTabScroll() {
      console.log("onTabScroll");
    },
});
${GlobalHelper}`,
  McTable: `McTable
  /** 单行单击回调 */
  onRowClick(row, selectedKey, event) {
    $form.setValuesIn("${LOW_CODE_VAR}.${SELECTED_ROW_KEY}", selectedKey);
    $form.setValuesIn("${LOW_CODE_VAR}.${SELECTED_ROW}", JSON.parse(JSON.stringify(row)));
    $form.setValuesIn("${LOW_CODE_VAR}.${ACTIVE_STATUS}", row?.${ACTIVE_STATUS});
  },
  /** 单行双击回调 */
  onRowDoubleClick(row, selectedKey, event) {
    $form.setValuesIn("${LOW_CODE_VAR}.${SELECTED_ROW}", JSON.parse(JSON.stringify(row)));
    $form.setValuesIn("${LOW_CODE_VAR}.${ACTIVE_STATUS}", row?.${ACTIVE_STATUS});
    ${openSideCode(false, EOperationType.EDIT)}
    console.log('onRowDoubleClick',row, selectedKey, event)
  },
  /** 页码改变的回调 */
  onChange(page, pageSize) {
      /** 设置分页信息 */
    $form.setValuesIn('${LOW_CODE_VAR}.${PAGE_INFO}', {
      pageIndex,
      pageSize
    });
    // 触发查询
  $form.setValuesIn('${LOW_CODE_VAR}.${TRIGGER_QUERY}', new Date());
  },
  /** pageSize 变化的回调 */
  onShowSizeChange(current, size) {
    /** 设置分页信息 */
    $form.setValuesIn('${LOW_CODE_VAR}.${PAGE_INFO}', {
      pageIndex,
      pageSize
    });
   // 触发查询
  $form.setValuesIn('${LOW_CODE_VAR}.${TRIGGER_QUERY}', new Date());
  )};
  },
  /* 数据源 */
  $effect(()=>{
    $self.loading = true
    fetch('//some.domain/getSomething')
      .then(response=>response.json())
      .then(({ data })=>{
        $self.loading = false
        $self.componentProps.dataSource = data
      },()=>{
        $self.loading = false
      })
  },[])
  /* 回调设置选中行 */
  $effect(() => {
    $self.setComponentProps({ selectedKey: $values?.mcLowCode?.selectedRowKey });
  }, [$values?.mcLowCode?.selectedRowKey]);
  /* 回调设置分页信息 */
$effect(() => {
  $form.setValuesIn("mcLowCode.pageInfo", {
    pageSize: $self.componentProps?.pageSize || 20,
    pageIndex: $self.componentProps?.current || 1,
  });
  $form.setValuesIn('mcLowCode._triggerQuery', new Date());
}, [$self.componentProps?.pageSize,$self.componentProps?.current]);
${GlobalHelper}`,
  McTimePicker: `McTimePicker
  /* 事件 */
  $props({
    /* 时间发生变化的回调 */
    onChange() {
      console.log("onChange");
    },
    /* 面板打开/关闭时的回调 */
    onOpenChange() {
        console.log("onOpenChange");
      },
  });
  ${GlobalHelper}`,
  McTransfer: `McTransfer
  /* 事件 */
  $props({
  /* 选项在两栏之间转移时的回调函数 */
  onChange() {
      console.log("onChange");
    },
  /* 选项列表滚动时的回调函数 */
  onScroll() {
    console.log("onScroll");
  },
  /* 搜索框内容时改变时的回调函数 */
  onSearch() {
    console.log("onSearch");
  },
  /* 点选中项发生改变时的回调函数 */
  onSelectChange() {
    console.log("onSelectChange");
  },
  });
  /* 数据源 */
  $effect(()=>{
    $self.loading = true
    fetch('//some.domain/getSomething')
      .then(response=>response.json())
      .then(({ data })=>{
        $self.loading = false
        $self.componentProps.dataSource = data
      },()=>{
        $self.loading = false
      })
  },[])
  ${GlobalHelper}`,
  McTree: `McTree
  /* 事件 */
  $props({
    /* 展开/收起回调 */
    onExpand() {
      console.log("onExpand");
    },
    /* 搜索文本框值变化时回调 */
    onSearch() {
      console.log("onSearch");
    },
    /* 点击树节点触发 */
    onSelect() {
        console.log("onSelect");
    },
    /* 双击事件的回调 */
    onDoubleClick() {
        console.log("onDoubleClick");
    },
    /* 点击复选框触发 */
    onCheck() {
        console.log("onCheck");
    },
    /* 正在编辑树节点的时候触发 */
    onNodeInput() {
        console.log("onNodeInput");
    },
    /* 树节点结束编辑的时候触发 */
    onNodeInputEnd() {
        console.log("onNodeInputEnd");
    },
    /* 开始拖拽节点时调用 */
    onDragStart() {
        console.log("onDragStart");
    },
    /* 当拖拽节点到一个可释放目标节点时调用 */
    onDragEnter() {
        console.log("onDragEnter");
    },
    /* 当拖拽节点被拖到一个可释放目标节点上时调用 */
    onDragOver() {
        console.log("onDragOver");
    },
    /* 当拖拽节点离开一个可释放目标节点时调用 */
    onDragLeave() {
        console.log("onDragLeave");
    },
    /* 当拖拽操作结束时调用 */
    onDragEnd() {
        console.log("onDragEnd");
    },
    /* 当拖拽节点在可释放目标节点上被释放时调用 */
    onDrop() {
        console.log("onDrop");
    },
  });
  /* 数据源 */
  $effect(()=>{
    $self.loading = true
    fetch('//some.domain/getSomething')
      .then(response=>response.json())
      .then(({ data })=>{
        $self.loading = false
        $self.componentProps.dataSource = data
      },()=>{
        $self.loading = false
      })
  },[])
  ${GlobalHelper}`,
  McTreeSelect: `McTreeSelect
  /* 事件 */
  $props({
  /* 选中树节点时调用此函数 */
  onChange() {
      console.log("onChange");
    },
  /* 展开下拉菜单的回调 */
  onDropdownVisibleChange() {
    console.log("onDropdownVisibleChange");
  },
  /* 文本框值变化时回调 */
  onSearch() {
    console.log("onSearch");
  },
  /* 被选中时调用 */
  onSelect() {
    console.log("onSelect");
  },
  /* 展示节点时调用 */
  onTreeExpand() {
    console.log("onTreeExpand");
  },
  });
  /* 数据源 */
  $effect(()=>{
    $self.loading = true
    fetch('//some.domain/getSomething')
      .then(response=>response.json())
      .then(({ data })=>{
        $self.loading = false
        $self.componentProps.dataSource = data
      },()=>{
        $self.loading = false
      })
  },[])
  ${GlobalHelper}`,
  McUpload: `McUpload
  /* 事件 */
  $props({
  /* 上传文件改变时的状态效 */
  onChange() {
    console.log("onChange");
  },
  /* 当文件被拖入上传区域时执行的回调功能 */
  onDrop() {
      console.log("onDrop");
  },
  /* 点击下载文件时的回调，如果没有指定，则默认跳转到文件 url 对应的标签页 */
  onDownload() {
      console.log("onDownload");
  },
  /* 点击文件链接或预览图标时的回调 */
  onPreview() {
      console.log("onPreview");
  },
  /* 点击移除文件时的回调，返回值为 false 时不移除。支持返回一个 Promise 对象，Promise 对象 resolve(false) 或 reject 时不移除 */
  onRemove() {
      console.log("onRemove");
  },
  });
  ${GlobalHelper}`,
  McEditTable: `McEditTable
  /** 单行单击回调 */
  onRowClick(row, selectedKey, event) {
    console.log('onRowClick',row, selectedKey, event)
  },
  /** 单行双击回调 */
  onRowDoubleClick(row, selectedKey, event) {
    console.log('onRowDoubleClick',row, selectedKey, event)
  },
  /** 页码改变的回调 */
  onChange(page, pageSize) {
    console.log('onChange',page, pageSize)
  },
  /** pageSize 变化的回调 */
  onShowSizeChange(current, size) {
    ${getComponent(
      'McEditTable',
      `$form.query(key).take().setComponentProps({
      pageSize:size
    })`
    )};
  },
  /* 数据源 */
  $effect(()=>{
    $self.loading = true
    fetch('//some.domain/getSomething')
      .then(response=>response.json())
      .then(({ data })=>{
        $self.loading = false
        $self.componentProps.dataSource = data
      },()=>{
        $self.loading = false
      })
  },[])
  /* 回调设置选中行 */
  $effect(() => {
    $self.setComponentProps({ selectedKey: $values?.mcLowCode?.selectedRowKey });
  }, [$values?.mcLowCode?.selectedRowKey]);
  /* 回调设置分页信息 */
  $effect(() => {
    $form.setValuesIn("mcLowCode.pageInfo", {
      pageSize: $self.componentProps?.pageSize || 20,
      pageIndex: $self.componentProps?.current || 1,
    });
    $form.setValuesIn('mcLowCode._triggerQuery', new Date());
  }, [$self.componentProps?.pageSize,$self.componentProps?.current]);
  ${GlobalHelper}`,
  SideSheet: `SideSheet
  /* 事件 */
    $props({
    /* 确认按钮回调 */
    onOk() {
        console.log("onOk");
      },
      /* 取消按钮回调 */
      onClose() {
        console.log("onClose");
      },
    });
    ${GlobalHelper}`,
  McDatePicker: `McDatePicker
  /* 事件 */
    $props({
    /* 弹出日历和关闭日历的回调 */
    onOpenChange() {
        console.log("onOpenChange");
      },
    /* 日历面板切换的回调 */
    onPanelChange() {
      console.log("onPanelChange");
    },
    /* 时间发生变化的回调 */
    onChange() {
      console.log("onChange");
    },
    /* 点击确定按钮的回调 */
    onOk() {
      console.log("onOk");
    },
    });
    ${GlobalHelper}`,
  McFormTab: `McFormTab
    /* 事件 */
      $props({
      /* 关闭抽屉 */
      onClose() {
        Object.keys($form?.indexes || {}).forEach((key) => {
          const fieldState = $form.getFieldState(key);
          if (
            fieldState?.component?.length > 1 &&
            fieldState?.component?.[0] == "McFormTab"
          ) {
            $form.query(key).take().setComponentProps({
              showSide: false,
            });
          }
        });
        },
      /* 抽屉-确认按钮操作 */
      onSubmit() {
        /* 抽屉-确认按钮操作 */
        let Error = [];
        const sideKey = Object.values($form?.indexes || {}).filter(
          (key) =>
            $form.getFieldState(key)?.component?.length > 1 &&
            $form.getFieldState(key)?.component?.[0] == "FormArea"
        );
        /* 找出表单下所有的key */
        const sideKeys = Object.values($form?.indexes || {}).filter(
          (key) => key.includes(sideKey[0]) && key !== sideKey[0]
        );
        $form
          .validate()
          .then(() => {
            if (!Error.length) {
              /* 接下来处理业务逻辑 */
              const params = Object.assign({}, $form?.values?.tabs?.scRes);
              console.log("表单值", params);
              Object.keys($form?.indexes || {}).forEach((key) => {
                const fieldState = $form.getFieldState(key);
                if (
                  fieldState?.component?.length > 1 &&
                  fieldState?.component?.[0] == "McFormTab"
                ) {
                  $form.query(key).take().setComponentProps({ showSide: false });
                }
              });
            }
          })
          .catch((err) => {
            if (Object.prototype.toString.call(err) === "[object Array]") {
              Error = sideKeys.filter((item) =>
                err.find((ins) => ins.address !== item)
              );
            }
          });
      },
      /* 抽屉-编辑按钮操作 */
      onEdit() {
        Object.keys($form?.indexes || {}).forEach((key) => {
          const fieldState = $form.getFieldState(key);
          if (
            fieldState?.component?.length > 1 &&
            fieldState?.component?.[1]?.tabmark == "mctab_side"
          ) {
            $form.query(key).take().setPattern("editable");
          }
        });
      },
      ${GlobalHelper}`,
  MobileDatePicker: `MobileDatePicker
  /* 事件 */
 $props({
  /* 关闭时触发 */
  onClose() {
     console.log("onClose");
   },
  /* 选择日期变化时触发 */
  onSelect() {
     console.log("onSelect");
   },
  /* 点击确认按钮时触发 */
  onConfirm() {
     console.log("onConfirm");
   },
 });
 /* 初始化-设置值 */
 $effect(()=>{
  $self.value = [];
 },[])
 ${GlobalHelper}`,
  MobilePicker: `MobilePicker
  /* 事件 */
 $props({
  /* 配置选项数据 */
  columns:[],
  /* 选项改变时触发 */
  onSelect() {
     console.log("onSelect");
   },
  /* 点击确认时触发 */
  onConfirm() {
     console.log("onConfirm");
   },
  /* 取消时触发 */
  onCancel() {
     console.log("onCancel");
   },
  /* 关闭时触发 */
  onClose() {
     console.log("onClose");
   }
 });
 /* 初始化-设置值 */
 $effect(()=>{
  $self.value = [];
 },[])
 ${GlobalHelper}`,
  MobileCascadePicker: `MobileCascadePicker
  /* 事件 */
 $props({
  /* 配置选项数据 */
 options:[],
  /* 选项改变时触发 */
  onSelect() {
     console.log("onSelect");
   },
  /* 点击确认时触发 */
  onConfirm() {
     console.log("onConfirm");
   },
  /* 取消时触发 */
  onCancel() {
     console.log("onCancel");
   },
  /* 关闭时触发 */
  onClose() {
     console.log("onClose");
   }
 });
 /* 初始化-设置值 */
 $effect(()=>{
  $self.value = [];
 },[])
 ${GlobalHelper}`,
  MobilePickerView: `MobilePickerView
  /* 事件 */
 $props({
  /* 配置选项数据 */
  columns:[],
  /* 选项改变时触发 */
  onChange() {
     console.log("onChange");
   },
 });
 /* 初始化-设置值 */
 $effect(()=>{
  $self.value = [];
 },[])
 ${GlobalHelper}`,
  MobileCascadePickerView: `MobileCascadePickerView
  /* 事件 */
 $props({
  /* 配置选项数据 */
 options:[],
  /* 选项改变时触发 */
  onChange() {
     console.log("onChange");
   },
 });
 /* 初始化-设置值 */
 $effect(()=>{
  $self.value = [];
 },[])
 ${GlobalHelper}`,
  MobileDatePickerView: `MobileDatePickerView
  /* 事件 */
 $props({
  /* 选项改变时触发 */
  onChange() {
     console.log("onChange");
   },
 });
 /* 初始化-设置值 */
 $effect(()=>{
  $self.value = [];
 },[])
 ${GlobalHelper}`,
  MobileDialog: `MobileDialog
  /* 事件 */
 $props({
  /* 关闭时触发 */
  onClose() {
     console.log("onClose");
   },
 });
 ${GlobalHelper}`,
  MobileModal: `MobileModal
  /* 事件 */
 $props({
  /* 关闭时触发 */
  onClose() {
     console.log("onClose");
   },
 });
 ${GlobalHelper}`,
  MobilePopup: `MobilePopup
  /* 事件 */
 $props({
  /* 点击时触发，常用于阻止事件冒泡 */
  onClick() {
     console.log("onClick");
   },
  /* 关闭时触发 */
  onClose() {
     console.log("onClose");
   },
  /* 关闭时触发 */
  onMaskClick() {
     console.log("onMaskClick");
   },
 });
 ${GlobalHelper}`,
  MobileNavBar: `MobileNavBar
  /* 事件 */
 $props({
  /* 点击返回区域后的回调 */
  onBack() {
     console.log("onBack");
   },
 });
 ${GlobalHelper}`,
  MobileCalendarPicker: `MobileCalendarPicker
  /* 事件 */
 $props({
  /* 关闭时触发 */
  onClose() {
     console.log("onClose");
   },
  /* 点击背景蒙层时触发 */
  onMaskClick() {
     console.log("onMaskClick");
   },
  /* 选择日期变化时触发 */
  onChange() {
     console.log("onConfirm");
   },
  /* 点击确认按钮时触发 */
  onConfirm() {
     console.log("onConfirm");
   },
 });
 /* 初始化-设置值 */
 $effect(()=>{
  $self.value = [];
 },[])
 ${GlobalHelper}`,
  MobileCalendarPickerView: `MobileCalendarPickerView
  /* 事件 */
 $props({
  /* 选择日期变化时触发 */
  onChange() {
     console.log("onChange");
   },
 });
 /* 初始化-设置值 */
 $effect(()=>{
  $self.value = [];
 },[])
 ${GlobalHelper}`,
  MobileCalendar: `MobileCalendar
  /* 事件 */
 $props({
  /* 选择日期变化时触发 */
  onChange(val) {
     console.log("onChange",val);
   },
  /* 选择日期变化时触发 */
  onPageChange(year, month) {
     console.log("onPageChange ",year, month);
   },
 });
 /* 初始化-设置值 */
 $effect(()=>{
  $self.value = [];
 },[])
 ${GlobalHelper}`,
};
