import { Modal, Spin, ModalProps } from 'antd';
import React from 'react';
import ReactDOM from 'react-dom';

export type TDialogComponentProps<T> = T & {
  close: (args: any) => void;
};

export const createDialog =
  <T, P>(
    Component: React.FunctionComponent<TDialogComponentProps<T>>,
    dialogPorps?: ModalProps,
    operation?: {
      widthDialog?: boolean;
    }
  ) =>
  (props: T) =>
    new Promise((res: (args: P) => void) => {
      let timer = null;

      timer && clearTimeout(timer);

      const div = document.createElement('div');
      document.body.appendChild(div);

      const close = () => {
        div.parentNode.removeChild(div);
      };

      const handleClose = (args: any) => {
        res(args);
        close();
      };

      const renderElement = () => {
        if (operation?.widthDialog) {
          return (
            <Modal
              {...dialogPorps}
              visible
              getContainer={() => div}
              onCancel={() => close()}
              footer={null}
            >
              <Component {...props} close={handleClose} />
            </Modal>
          );
        }
        return <Component {...props} mountedDiv={div} close={handleClose} />;
      };

      const render = () => {
        timer = setTimeout(() => {
          const el = renderElement();
          ReactDOM.render(el, div);
        });
      };

      render();
      return { close };
    });

export const handleAddMask = () => {
  const div = document.createElement('div');
  document.body.appendChild(div);

  const close = () => {
    if (div?.parentNode?.removeChild) {
      div.parentNode.removeChild(div);
    }
  };

  const renderElement = () => {
    return (
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 9999999,
          background: 'rgba(255,255,255,0.5)',
        }}
      >
        <Spin />
      </div>
    );
  };

  const render = () => {
    let halftimer = null;
    halftimer && clearTimeout(halftimer);
    halftimer = setTimeout(() => {
      const el = renderElement();
      ReactDOM.render(el, div);
    });
  };

  render();

  return close;
};
