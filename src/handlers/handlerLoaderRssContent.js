const handlerLoaderRssContent = (url, state) => {
  state.rssContent.feeds.push(url);
};

export default handlerLoaderRssContent;
