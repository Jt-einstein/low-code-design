const defaultScript = () => {
  return `$props({
  /** 点击树节点触发 */
  onSelect(selectedKey,selectedInfo) {
    console.log('onSelect', selectedKey, selectedInfo);
    // 设置选中节点
    $self.setComponentProps({
      selectedKeys: [selectedKey],
    });
  },
  /** 搜索文本框值变化时回调 */
  onSearch(inputValue, searchResults) {
  },
  /** 展开/收起回调 */
  onExpand(expandedKeys, info) {
  },
  /** 点击操作菜单回调 */
  onActionClick(node) {
    switch (key) {
      case 'ADD':
        console.log('新增操作处理', node)
        break;
      case 'EDIT':
        console.log('编辑操作处理', node)
        break;
      case 'SWITCH':
        console.log('启停用操作处理', node)
        break;
      case 'DELETE':
        console.log('删除操作处理', node)
        break;
    }
  },
  /** 开始拖拽节点时调用 */
  onDragStart(info) {
  },
  /** 当拖拽节点到一个可释放目标节点时调用 */
  onDragEnter(info) {
    console.log('onDragEnter',info);
  },
  /** 当拖拽节点被拖到一个可释放目标节点上时调用 */
  onDragOver(info) {
    console.log('onDragOver',info);
  },
  /** 当拖拽节点离开一个可释放目标节点时调用 */
  onDragLeave(info) {
  },
  /** 当拖拽操作结束时调用 */
  onDragEnd(info) {
  },
  /** 当拖拽节点在可释放目标节点上被释放时调用 */
  onDrop(info) {
  },
  /** 节点是否可以放置在目标节点上 */
  allowDrop(info) {
  },
});`;
};

const bindApiScript = (props: { apiScript: Function }) => {
  const { apiScript } = props;
  return `const api = ${apiScript};
  
  const handleInit = async () => {
    try {
      // 仅为模板示例，需根据具体参数自行调整;
      const params = {}
      const resp = await api({ params });
      const treeData = $utils.list2Tree(mockData, 'id', 'parentId', (item) => {
        return item?.parentId === null;
      });
      console.log(treeData);
      $self?.setComponentProps({ treeData });
    } catch (error) {
      $message.error(error?.message);
    }
  };
  
  $effect(() => {
    handleInit();
  }, []);
  
  const mockData = [
    {
      title: 'Asia',
      id: '0',
      parentId: null,
    },
    {
      title: 'China',
      id: '0-0',
      parentId: '0',
    },
    {
      title: 'Beijing',
      id: '0-0-0',
      parentId: '0-0',
    },
    {
      title: 'Shanghai',
      id: '0-0-2',
      parentId: '0-0',
    },
    {
      title: 'Guangzhou',
      id: '0-0-1',
      parentId: '0-0',
    },
    {
      title: 'Japan',
      id: '0-1',
      parentId: '0',
    },
    {
      title: 'Tokyo',
      id: '0-1-0',
      parentId: '0-1',
    },
    {
      title: 'North America',
      id: '1',
      parentId: null,
    },
    {
      title: 'United States',
      id: '1-0',
      parentId: '1',
    },
    {
      title: 'Canada',
      id: '1-1',
      parentId: '1',
    },
  ]`;
};

const treeScript = {
  default: defaultScript,
  bindApi: bindApiScript,
};

export { treeScript };
