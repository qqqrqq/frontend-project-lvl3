import { watcherValidation, watcherLoaderRssContent } from './view/watchers';
import handlerForm from './handlers/handlerForm';

const app = (state) => {
  const input = document.querySelector('#url-input');

  const validationWatcher = watcherValidation(state);
  const contentRssWatcher = watcherLoaderRssContent(state);

  handlerForm(state, validationWatcher, contentRssWatcher, input);
};

export default app;
