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
        const { feeds } = contentRssWatcher;
        if (!isNewRss(feeds, data)) {
          throw new Error(state.i18Instance.t('validation.errors.errorUrlExist'));
        }
        return data;
      })
      .then((data) => {
        state.messageError = state.i18Instance.t('validation.isValid');
        validationWatcher.isValid = true;
        validationWatcher.isValid = true;

        return data;
      })
      .then((data) => {
        handlerLoaderRssContent(data, state);
      })
      .catch((err) => {
        state.messageError = err.message;
        validationWatcher.isValid = false;
      });
  });
};

export default handlerForm;
