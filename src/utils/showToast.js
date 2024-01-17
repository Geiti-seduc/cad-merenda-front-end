export const showSuccessToast = (message, title, toastRef) => {
  const toast = toastRef.current;
  toast.show({
    severity: 'success', summary: title, detail: message, life: 3000,
  });
};

export const showErrorToast = (message, title, toastRef) => {
  const toast = toastRef.current;

  toast.show({
    severity: 'error', summary: title, detail: message, life: 3000,
  });
};

export const showInfoToast = (message, title, toastRef) => {
  const toast = toastRef.current;
  toast.show({
    severity: 'info', summary: title, detail: message, life: 3000,
  });
};
