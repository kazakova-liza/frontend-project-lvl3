import validate from './validator.js';
import getRSS from './rssLoader.js';
import parse from './parser.js';
import saveRSS from './saver.js';

const processRss = (url, newFlag, watchedState, i18nextInstance, schema) => {
  const form = document.getElementsByClassName('form-control')[0];
  const addButton = document.getElementsByClassName('btn-primary')[0];
  form.readOnly = true;
  addButton.disabled = true;
  validate(url, schema)
    .then(() => {
      if (newFlag) {
        if (watchedState.feeds.find((feed) => feed.url === url) !== undefined) {
          throw (i18nextInstance.t('duplicate'));
        }
      }
    })
    .then(() => getRSS(url, i18nextInstance))
    .then((response) => {
      const parsedRSS = parse(response.data.contents);
      saveRSS(parsedRSS, url, newFlag, watchedState, i18nextInstance, schema);
    })
    .catch((err) => {
      watchedState.valid = false;
      watchedState.validFeedback = '';
      if (err.errors !== undefined) {
        watchedState.invalidFeedback = err.errors[0];
      } else {
        watchedState.invalidFeedback = err;
      }
    });
};

export default processRss;
