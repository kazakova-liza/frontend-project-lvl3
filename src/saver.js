import uniqueId from 'lodash/uniqueId.js';

const saveRSS = (RSS, watchedState) => {
  const existingFeed = watchedState.feeds.find((feed) => feed.url === RSS.link);
  let existingPosts = [];
  let feedId;
  if (!existingFeed) {
    feedId = uniqueId();
    watchedState.feeds.push({
      id: feedId,
      url: RSS.link,
      title: RSS.title,
      description: RSS.description,
    });
  } else {
    feedId = existingFeed.id;
    existingPosts = watchedState.posts.filter((post) => post.feedId === existingFeed.id);
  }
  const posts = [];
  RSS.posts.forEach((item) => {
    if (existingFeed) {
      const existingPost = existingPosts.find((post) => post.title === item.title);
      if (!existingPost) {
        posts.push({
          feedId, ...item, viewed: false, id: uniqueId(),
        });
      }
    } else {
      posts.push({
        feedId, ...item, viewed: false, id: uniqueId(),
      });
    }
  });
  watchedState.posts.push(...posts);
};

export default saveRSS;
