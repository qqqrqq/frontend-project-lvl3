import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import i18next from 'i18next';
import app from './app.js';
import languages from './locales/languages.js';

const init = new Promise((resolve) => {
  const i18Instance = i18next.createInstance();
  i18Instance.init({
    lng: 'ru',
    debug: false,
    resources: languages.ru,
  });

  resolve(i18Instance);
}).then((i18Instance) => {
  const state = {
    i18Instance,
    messageErr: null,
    rssContent: {
      feeds: [],
    },
    validationStatus: {
      isValid: null,
    },
    process: {
      currentProcess: null,
    },
  };

  return state;
});
init.then(app);
