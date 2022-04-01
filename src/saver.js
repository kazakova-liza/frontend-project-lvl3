import getId from './utils/idGenerator.js';
import processRss from './processor.js';

const updateRss = (url, watchedState, i18nextInstance, schema) => {
  processRss(url, false, watchedState, i18nextInstance, schema);
  setTimeout(() => updateRss(url, watchedState, i18nextInstance, schema), 5000);
};

const saveRSS = (RSS, url, newFlag, watchedState, i18nextInstance, schema) => {
  let id;
  let existingPosts;
  const title = RSS.getElementsByTagName('title')[0];
  const description = RSS.getElementsByTagName('description')[0];
  const form = document.getElementsByClassName('form-control')[0];
  const addButton = document.getElementsByClassName('btn-primary')[0];
  if (title === undefined || description === undefined) {
    throw (i18nextInstance.t('invalidRss'));
  }
  if (newFlag) {
    id = getId(watchedState);
    watchedState.feeds.push({
      id,
      url,
      title: title.textContent,
      description: description.textContent,
    });
  } else {
    id = watchedState.feeds.find((feed) => feed.url === url).id;
    existingPosts = watchedState.posts.filter((post) => post.id === id);
  }

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

    if (newFlag) {
      watchedState.posts.push(post);
    } else {
      const thisStream = existingPosts.find((stream) => stream.title === postTitle);
      if (thisStream === undefined) {
        watchedState.posts.push(post);
      }
    }
  });
  if (newFlag) {
    watchedState.validFeedback = i18nextInstance.t('success');
    watchedState.valid = true;
    updateRss(url, watchedState, i18nextInstance, schema);
  }
  form.value = '';
  form.readOnly = false;
  addButton.disabled = false;
};

export default saveRSS;
