const isNewRss = (feeds, newUrl) => Object.values(feeds).map(({ url }) => url).indexOf(newUrl) < 0;

export default isNewRss;
