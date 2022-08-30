const resetStatus = (watcher, path) => {
  watcher[path] = null;
};

export default resetStatus;
