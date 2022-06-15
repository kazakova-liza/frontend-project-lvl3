import axios from 'axios';
import proxify from './proxify.js';
import parse from './parser.js';
import saveRSS from './saver.js';

const updateFeeds = (watchedState) => {
  const promises = watchedState.feeds.map((feed) => {
    const proxifiedUrl = proxify(feed.url);
    return axios.get(proxifiedUrl);
  });
  Promise.all(promises).then((responses) => {
    responses.forEach((response) => {
      const RSS = parse(response.data.contents);
      saveRSS(RSS, watchedState);
    });
  });
};

export default updateFeeds;
