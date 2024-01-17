global.console = {
  ...global.console,
  error: (message) => {
    if (message.includes('css parsing')) {
      return null;
    }
    throw new Error(message);
  },
};
