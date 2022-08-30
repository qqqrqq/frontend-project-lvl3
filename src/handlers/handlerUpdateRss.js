import axios from 'axios';
import parseContent from '../rssParser/parseContent.js';

const checkNewRss = (watcher, state) => {
  const { topics: oldTopics, resources } = watcher;
  const proxy = 'https://allorigins.hexlet.app/get?';

  const promises = resources.map((res) => axios.get(`${proxy}disableCache=true&url=${encodeURIComponent(res.url)}/`)
    .catch(() => {
      state.messageErr = state.i18Instance.t('updating.errors.errorNetwork');
      throw new Error();
    })
    .then((resp) => parseContent(resp.data, res.id))
    .catch(() => {
      state.messageErr = state.i18Instance.t('updating.errors.errorResourse');
      throw new Error();
    }));

  Promise.all(promises)
    .then((parsedResources) => {
      parsedResources.forEach((parsedRss) => {
        const { topics, feed } = parsedRss;
        const { id: currentId } = feed;

        const oldTopicsWithCurrentId = oldTopics.filter(({ id }) => currentId === id)
          .map(({ title }) => title);
        const newTopics = topics.filter(({ title }) => !oldTopicsWithCurrentId.includes(title));
        if (newTopics.length === 0) return;
        newTopics.forEach((newTopic) => watcher.topics.push(newTopic));
      });
    })
    .then(() => {
      watcher.updateRss.errorUpdate = false;
    })
    .catch(() => {
      watcher.updateRss.errorUpdate = true;
      throw new Error();
    });
};

const getTimer = (watcher) => watcher.updateRss.timerID;

const setTimer = (watcher, state, status) => {
  const timerID = getTimer(watcher);
  if (timerID) {
    clearInterval(timerID);
  }

  if (status) {
    const newTimerId = setTimeout(() => {
      checkNewRss(watcher, state);
      watcher.updateRss.timerID = newTimerId;
    }, 5000);
    return;
  }

  const wrongTimerId = setTimeout(() => {
    checkNewRss(watcher, state);
    watcher.updateRss.timerID = wrongTimerId;
  }, 30000);
};

export { getTimer, setTimer };
