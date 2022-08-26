import validator from '../validator/validator.js';
import handlerLoaderRssContent from './handlerLoaderRssContent.js';
import isNewRss from '../validator/isNewRss.js';

const handlerForm = (state, validationWatcher, contentRssWatcher, input) => {
  const form = document.querySelector('.rss-form');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const valueInput = input.value;
    validator(valueInput)
      .then((data) => {
        const { feeds } = contentRssWatcher;
        if (!isNewRss(feeds, data)) {
          throw new Error('Url is already in feeds');
        }
        return data;
      })
      .then((data) => {
        input.value = '';
        input.focus();
        validationWatcher.isValid = true;

        return data;
      })
      .then((data) => {
        handlerLoaderRssContent(data, state);
      })
      .catch(() => {
        validationWatcher.isValid = false;
      });
  });
};

export default handlerForm;
