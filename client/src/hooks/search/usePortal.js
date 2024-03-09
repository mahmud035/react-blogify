import { createPortal } from 'react-dom';

const usePortal = () => {
  const mountElement = document.getElementById('portal-root');

  const renderPortal = (component) => {
    return createPortal(component, mountElement);
  };

  return { renderPortal };
};

export default usePortal;
