import axios from 'axios';
import proxify from './proxify.js';
import parse from './parser.js';
import saveRSS from './saver.js';

const updateFeeds = (watchedState, i18nextInstance) => {
  watchedState.feeds.forEach((feed) => {
    const proxifiedUrl = proxify(feed.url);
    axios.get(proxifiedUrl).then((response) => {
      const RSS = parse(response.data.contents, i18nextInstance);
      saveRSS(RSS, feed.url, watchedState);
      console.log('updated');
    });
  });
};

export default updateFeeds;
