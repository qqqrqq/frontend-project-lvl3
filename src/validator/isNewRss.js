const isNewRss = (feeds, url) => Object.values(feeds).indexOf(url) < 0;

export default isNewRss;
