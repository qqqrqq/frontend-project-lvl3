import _ from 'lodash';

const parseContent = (response, id) => {
  try {
    const parser = new DOMParser();

    const content = parser.parseFromString(response.data || response.contents, 'text/xml');

    const feed = {
      title: content.querySelector('channel title').textContent,
      description: content.querySelector('channel description').textContent,
      id,
    };

    const topics = Array.from(content.querySelectorAll('item')).map((item) => {
      const top = {
        title: item.querySelector('title').textContent,
        link: item.querySelector('link').textContent,
        description: item.querySelector('description').textContent,
        id,
        childrenId: `#id${_.uniqueId()}`,
      };
      return top;
    });
    return { feed, topics };
  } catch {
    throw new Error('errorParsing');
  }
};

export default parseContent;
