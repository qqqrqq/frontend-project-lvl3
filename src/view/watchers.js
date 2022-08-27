import onChange from 'on-change';
import renderFormSectionFeedback from '../renders/renderFormSectionFeedback.js';
import resetStatus from '../handlers/resetStatus.js';

const watcherValidation = (state) => {
  const watcher = onChange(state.validationStatus, (path, validationStatus) => {
    if (validationStatus === null) return;
    renderFormSectionFeedback(validationStatus, state.messageError);
    resetStatus(watcher, path);
  });

  return watcher;
};

const watcherLoaderRssContent = (state) => {
  const watcher = onChange(state.rssContent, () => {

  });

  return watcher;
};

export { watcherValidation, watcherLoaderRssContent };
