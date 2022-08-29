import onChange from 'on-change';
import renderFormSectionFeedback from '../renders/renderFormSectionFeedback.js';
import resetStatus from '../handlers/resetStatus.js';
import renderRssContent from '../renders/renderRssContent.js';
import renderModal from '../renders/renderModal.js';
import handlerBtnsOpenModal from '../handlers/handlerBtnsOpenModal.js';
import { getTimer, setTimer } from '../handlers/handlerUpdateRss.js';

const watcherValidation = (state) => {
  const watcher = onChange(state.validationStatus, (path, validationStatus) => {
    if (validationStatus === null) return;
    renderFormSectionFeedback(validationStatus, state.messageErr);
    resetStatus(watcher, path);
  });

  return watcher;
};

const watcherLoaderRssContent = (state) => {
  const watcher = onChange(state.rssContent, (path, value) => {
    switch (path) {
      case ('loadError'): {
        if (value === true) {
          renderFormSectionFeedback(false, state.messageErr);
          resetStatus(watcher, path);
        }
        if (value === false) {
          renderRssContent(watcher, state.i18Instance);
          renderFormSectionFeedback(true, state.messageErr);
          handlerBtnsOpenModal(watcher);
          resetStatus(watcher, path);
          if (!getTimer(watcher)) setTimer(watcher, state, true);
        }
        break;
      }
      case ('uiState.activeModalTopic'): {
        renderModal(value);
        break;
      }
      case ('uiState.viewedTopics'): {
        renderRssContent(watcher, state.i18Instance, true);
        break;
      }
      case ('updateRss.errorUpdate'): {
        if (value === true) {
          setTimer(watcher, state, false);
          resetStatus(watcher.updateRss, 'errorUpdate');
        }
        if (value === false) {
          renderRssContent(watcher, state.i18Instance, true);
          handlerBtnsOpenModal(watcher);
          resetStatus(watcher.updateRss, 'errorUpdate');
        }
        break;
      }
      case ('updateRss.timerID'): {
        setTimer(watcher, state, true);
        break;
      }
      default:
        break;
    }
  });

  return watcher;
};

export { watcherValidation, watcherLoaderRssContent };
