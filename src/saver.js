import uniqueId from 'lodash/uniqueId';

const saveRSS = (RSS, url, watchedState) => {
  const id = uniqueId();
  watchedState.feeds.push({
    id,
    url,
    title: RSS.title,
    description: RSS.description,
  });
  const posts = [];
  RSS.posts.forEach((item) => posts.push({ id, ...item }));
  watchedState.posts.push(...posts);
};

export default saveRSS;
