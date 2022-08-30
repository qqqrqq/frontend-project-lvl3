import validator from '../validator/validator.js';
import handlerLoaderRssContent from './handlerLoaderRssContent.js';
import isNewRss from '../validator/isNewRss.js';

const handlerForm = (state, validationWatcher, contentRssWatcher, input) => {
  const form = document.querySelector('.rss-form');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const valueInput = input.value;

    validator(state.i18Instance, valueInput)
      .then((data) => {
        const { resources } = contentRssWatcher;
        if (!isNewRss(resources, data)) {
          throw new Error(state.i18Instance.t('validation.errors.errorUrlExist'));
        }
        return data;
      })
      .then((data) => {
        state.messageErr = state.i18Instance.t('validation.isValid');
        validationWatcher.isValid = true;
        return data;
      })
      .then((data) => {
        handlerLoaderRssContent(contentRssWatcher, data, state);
      })
      .catch((err) => {
        state.messageErr = err.message;

        validationWatcher.isValid = false;
      });
  });
};

export default handlerForm;
