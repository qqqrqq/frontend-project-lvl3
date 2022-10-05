import _ from 'lodash';
import axios from 'axios';
import parseContent from '../rssParser/parseContent.js';

const handlerLoaderRssContent = (contentRssWatcher, url, state) => {
  const id = _.uniqueId();
  const proxy = 'https://allorigins.hexlet.app/get?';
  axios.get(`${proxy}disableCache=true&url=${encodeURIComponent(url)}/`)
    .catch(() => {
      state.messageErr = state.i18Instance.t('loading.loadErrors.errorNetwork');
      throw new Error();
    })
    .then((response) => parseContent(response, id))
    .then((parsedRSS) => {
      const { feed, topics } = parsedRSS;
      contentRssWatcher.resources.push({ id, url });
      contentRssWatcher.feeds.unshift(feed);
      topics.forEach((top) => contentRssWatcher.topics.push(top));
      state.messageErr = state.i18Instance.t('loading.isLoaded');
      contentRssWatcher.loadError = false;
    })
    .catch(() => {
      contentRssWatcher.loadError = true;
    });
};

export default handlerLoaderRssContent;
