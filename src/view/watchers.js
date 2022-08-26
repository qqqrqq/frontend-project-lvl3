import onChange from 'on-change';
import renderFormSectionFeedback from '../renders/renderFormSectionFeedback.js';

const watcherValidation = (state) => {
  const watcher = onChange(state.validationStatus, (path, validationStatus) => {
    renderFormSectionFeedback(validationStatus);
  });

  return watcher;
};

const watcherLoaderRssContent = (state) => {
  const watcher = onChange(state.rssContent, () => {

  });

  return watcher;
};

export { watcherValidation, watcherLoaderRssContent };
