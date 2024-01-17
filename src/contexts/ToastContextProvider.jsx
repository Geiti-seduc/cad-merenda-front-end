// 1. Import necessary React modules
import React, { useRef, createContext } from 'react';
import PropTypes from 'prop-types';
import { Toast } from 'primereact/toast';

export const ToastContext = createContext();

function ToastContextProvider({ children }) {
  const toast = useRef(null);
  const showToast = (severity, summary, detail) => {
    toast.current.show({
      severity, summary, detail, life: 3000,
    });
  };

  const showSuccessToast = (message, title) => {
    toast.current.show({
      severity: 'success', summary: title, detail: message, life: 3000,
    });
  };

  const showErrorToast = (message, title) => {
    toast.current.show({
      severity: 'error', summary: title, detail: message, life: 3000,
    });
  };

  const showInfoToast = (message, title) => {
    toast.current.show({
      severity: 'info', summary: title, detail: message, life: 3000,
    });
  };

  const showContentToast = (severity, content) => {
    toast.current.show({
      severity, content, life: 3000,
    });
  };

  const contextValue = React.useMemo(() => ({
    showToast,
    showSuccessToast,
    showErrorToast,
    showInfoToast,
    showContentToast,
  }), [showToast]);

  return (
    <ToastContext.Provider value={contextValue}>
      <Toast ref={toast} />
      {children}
    </ToastContext.Provider>
  );
}

export const useToast = () => {
  const context = React.useContext(ToastContext);

  if (!context) {
    throw new Error('useToastContext must be used within a ToastContextProvider');
  }

  return context;
};

ToastContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ToastContextProvider;
