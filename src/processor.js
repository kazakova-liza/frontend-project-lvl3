import validate from './validator.js';
import getRSS from './rssLoader.js';
import parse from './parser.js';
import saveRSS from './saver.js';

const processRss = (url, newFlag, watchedState, i18nextInstance, schema) => {

  validate(url, schema, newFlag, watchedState)
    .then(() => {
      watchedState.status = 'loading';
      return getRSS(url, i18nextInstance);
    })
    .then((response) => {
      watchedState.status = 'valid';
      const parsedRSS = parse(response.data.contents);
      saveRSS(parsedRSS, url, newFlag, watchedState, i18nextInstance, schema);
      watchedState.status = 'success';
      watchedState.feedback = 'success';
    })
  // .catch((err) => {
  //   watchedState.status = 'invalid'; //какой тип ошибки?
  //   watchedState.feedback = '';
  //   if (err.errors !== undefined) {
  //     watchedState.feedback = err.errors[0];
  //   } else {
  //     watchedState.feedback = err;
  //   }
  // });
};

export default processRss;
