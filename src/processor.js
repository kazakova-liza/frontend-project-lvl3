
import { validate } from './validator.js'
import getRSS from './rssLoader.js'
import parse from './parser.js'
import saveRSS from './saver.js'


const processRss = (url, newFlag, watchedState, i18nextInstance) => {
    validate(url)
        .then(() => {
            if (newFlag) {
                if (watchedState.feeds.find((feed) => feed.url === url) !== undefined) {
                    console.log(url, 'duplicate');
                    throw (i18nextInstance.t('duplicate'));
                }
            }
        })
        .then(() => getRSS(url))
        .then((response) => {
            const parsedRSS = parse(response.data.contents);
            saveRSS(parsedRSS, url, newFlag, watchedState, i18nextInstance);
            const form = document.getElementsByClassName('form-control')[0];
            form.value = '';
        })
        .catch((err) => {
            watchedState.valid = false;
            watchedState.validFeedback = '';
            if (err.errors !== undefined) {
                watchedState.invalidFeedback = err.errors[0];
            }
            watchedState.invalidFeedback = err;

        });
}

export default processRss;