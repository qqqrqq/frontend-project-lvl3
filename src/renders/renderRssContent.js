const buildRoot = (place) => {
  let text;
  switch (place) {
    case 'feeds':
      text = 'Фиды';
      break;
    case 'posts':
      text = 'Посты';
      break;
    default:
      break;
  }
  const root = document.createElement('div');
  root.classList.add('card', 'border-0');
  const tittle = document.createElement('div');
  tittle.classList.add('card-body');
  const tittleText = document.createElement('h2');
  tittleText.classList.add('card-title', 'h4');

  tittleText.textContent = text;
  tittle.append(tittleText);
  root.append(tittle);
  return root;
};

const buildRootTopic = (topic, watcher) => {
  const {
    title, link, childrenId,
  } = topic;
  const rootTopic = document.createElement('li');
  rootTopic.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-start', 'border-0', 'border-end-0');

  const linkItem = document.createElement('a');
  const styleTopic = watcher.uiState.viewedTopics.includes(childrenId);

  linkItem.classList.add(styleTopic ? ('fw-normal', 'link-secondary') : 'fw-bold');
  linkItem.setAttribute('href', link);
  linkItem.setAttribute('rel', 'noopener noreferrer');
  linkItem.setAttribute('target', '_blank');
  linkItem.setAttribute('data-id', childrenId);
  linkItem.textContent = title;

  linkItem.addEventListener('click', () => {
    if (styleTopic) return;
    watcher.uiState.viewedTopics.push(childrenId);
  });

  const buttonTopic = document.createElement('button');
  buttonTopic.classList.add('btn', 'btn-outline-primary', 'btn-sm');
  buttonTopic.setAttribute('data-id', childrenId);
  buttonTopic.setAttribute('type', 'button');
  buttonTopic.setAttribute('data-bs-toggle', 'modal');
  buttonTopic.setAttribute('data-bs-target', '#modal');
  buttonTopic.textContent = 'Просмотр';

  buttonTopic.addEventListener('click', () => {
    if (styleTopic) return;
    watcher.uiState.viewedTopics.push(childrenId);
  });

  rootTopic.append(linkItem, buttonTopic);

  return rootTopic;
};

const buildFeed = (feed) => {
  const liFeed = document.createElement('li');
  liFeed.classList.add('list-group-item', 'border-0', 'border-end-0');
  const feedT = document.createElement('h3');
  feedT.classList.add('h6', 'm-0');
  feedT.textContent = feed.title;
  const feedP = document.createElement('p');
  feedP.classList.add('m-0', 'small', 'text-black-50');
  feedP.textContent = feed.description;
  liFeed.append(feedT, feedP);
  return liFeed;
};

const renderRssContent = (watcher, i18, update = false) => {
  const { feeds } = watcher;
  const { topics } = watcher;
  const feedsItem = Object.values(feeds).map((feed) => feed);
  const topicsItem = Object.values(topics).map((top) => top);

  const rootFeed = buildRoot('feeds');
  const rootPosts = buildRoot('posts');

  const feedsUl = document.createElement('ul');
  feedsUl.classList.add('list-group', 'border-0', 'rounded-0');

  const postsUl = document.createElement('ul');
  postsUl.classList.add('list-group', 'border-0', 'rounded-0');

  feedsItem.forEach((feed) => {
    const feedId = feed.id;
    const feedItem = buildFeed(feed, feedId);

    const topicsItems = topicsItem.filter(({ id }) => id === feedId)
      .map((topic) => buildRootTopic(topic, watcher));
    feedsUl.append(feedItem);

    topicsItems.forEach((top) => postsUl.append(top));
  });
  rootFeed.append(feedsUl);
  rootPosts.append(postsUl);
  if (update) {
    document.querySelector('.posts').textContent = '';
    document.querySelector('.posts').append(rootPosts);
    return;
  }
  document.querySelector('.feeds').textContent = '';
  document.querySelector('.posts').textContent = '';
  document.querySelector('.feeds').append(rootFeed);
  document.querySelector('.posts').append(rootPosts);
};

export default renderRssContent;
