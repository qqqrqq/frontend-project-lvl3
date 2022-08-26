import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import app from './app.js';

const init = new Promise((resolve) => {
  const state = {
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
  resolve(state);
});

init.then(app);
