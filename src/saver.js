import getId from './utils/idGenerator.js';

const saveRSS = (RSS, url, watchedState, i18nextInstance) => {
  // let id;
  // let existingPosts;
  const title = RSS.getElementsByTagName('title')[0];
  const description = RSS.getElementsByTagName('description')[0];
  if (title === undefined || description === undefined) {
    throw (i18nextInstance.t('invalidRss'));
  }
  // if (newFlag) {
  const id = getId(watchedState);
  watchedState.feeds.push({
    id,
    url,
    title: title.textContent,
    description: description.textContent,
  });
  // } else {
  //   id = watchedState.feeds.find((feed) => feed.url === url).id;
  //   existingPosts = watchedState.posts.filter((post) => post.id === id);
  // }

  const items = [...RSS.getElementsByTagName('item')];

  items.forEach((item) => {
    const postTitle = item.getElementsByTagName('title')[0].textContent;
    const link = item.getElementsByTagName('link')[0].textContent;
    const postDescription = item.getElementsByTagName('description')[0].textContent;
    const post = {
      id,
      title: postTitle,
      link,
      description: postDescription,
      viewed: false,
    };

    // if (newFlag) {
    watchedState.posts.push(post);
    // } else {
    //   const thisStream = existingPosts.find((stream) => stream.title === postTitle);
    //   if (thisStream === undefined) {
    //     watchedState.posts.push(post);
    //   }
    // }
  });
  // if (newFlag) {
  //   watchedState.status = 'success';
  //   watchedState.feedback = 'success';
  // }
  // watchedState.status = 'input';
};

export default saveRSS;
