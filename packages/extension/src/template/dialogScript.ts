const dialogScript = (props: {
  createScript: Function;
  updateScript: Function;
}) => {
  const { createScript, updateScript } = props;

  const _createScript = () => {
    if (!createScript) {
      return '';
    }
    return `const createApi = ${createScript};

    const getCreateParams = () => {
      const fieldsInForm = Object.entries($form?.fields).filter(([key]) => {
        return key.includes($self?.path?.entire);
      });
      return (fieldsInForm ?? []).reduce((total, [, current]) => {
        if (formComponent.includes(current?.componentType)) {
          return { ...total, [current?.props?.name]: current?.value };
        }
        return total;
      }, {});
    };
    
    const handleCreate = async () => {
      const params = $mc.getQueryFieldValues({$form,$self,$values});
      console.log('params',params);
      try {
        const resp = await createApi({ params });
        if (resp) {
          $message.error('新增成功');
        }
      } catch (e) {
        $message.error(e?.message);
      }
    };`;
  };

  const _updateScript = () => {
    if (!updateScript) {
      return '';
    }
    return `const updateApi = ${updateScript};

    const getUpdateParams = () => {
      const fieldsInForm = Object.entries($form?.fields).filter(([key]) => {
        return key.includes($self?.path?.entire);
      });
      const params = (fieldsInForm ?? []).reduce((total, [, current]) => {
        if (formComponent.includes(current?.componentType)) {
          return { ...total, [current?.props?.name]: current?.value };
        }
        return total;
      }, {});
      return { params, id: '', symvcc: '' };
    };
    
    const handleUpdate = async () => {
      const params = getUpdateParams();
      try {
        const resp = await updateApi({ params });
        if (resp) {
          $message.error('修改成功');
        }
      } catch (e) {
        $message.error(e?.message);
      }
    };`;
  };

  return `const formComponent = ['McInput'];

  ${_createScript()}

  ${_updateScript()}
  
  function closeSide() {
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
      const save = [handleCreate, handleUpdate][$values?.mcLowCode?.operationType == "add" ? 0 : 1];
      /* 收集错误信息 */
      let Error = [];
      $form
        .validate()
        .then(() => {
          if (!Error.length) {
            closeSide();
            if (save) {
              save();
            }
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
  });
 `;
};

export { dialogScript };
