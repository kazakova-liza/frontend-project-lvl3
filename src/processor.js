import validate from './validator.js';
import getRSS from './rssLoader.js';
import parse from './parser.js';
import saveRSS from './saver.js';

const processRss = (url, newFlag, watchedState, i18nextInstance, schema) => {

  watchedState.status = 'loading';

  validate(url, schema)
    .then(() => {
      if (newFlag) {
        if (watchedState.feeds.find((feed) => feed.url === url) !== undefined) {
          watchedState.status = 'error';
          console.log('duplicate');
          watchedState.feedback = i18nextInstance.t('duplicate');
          throw ('error'); //how to stop executing?
        }
      }
    })
    .then(() => getRSS(url, i18nextInstance))
    .then((response) => {
      const parsedRSS = parse(response.data.contents);
      saveRSS(parsedRSS, url, newFlag, watchedState, i18nextInstance, schema);
      watchedState.status = 'success';
    })
    .catch((err) => {
      watchedState.status = 'invalid';
      watchedState.feedback = '';
      if (err.errors !== undefined) {
        watchedState.feedback = err.errors[0];
      } else {
        watchedState.feedback = err;
      }
    });
};

export default processRss;
