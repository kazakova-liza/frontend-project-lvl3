
import validate from './validator.js'
import getRSS from './rssLoader.js'
import parse from './parser.js'
import { feeds } from './store.js'
import i18next from './dictionary.js'
import saveRSS from './saver.js'
import { watchedState } from '../index.js'


const processRss = (url, newFlag) => {
    const form = document.getElementsByClassName('form-control')[0];
    validate(url).then(() => {
        if (newFlag) {
            if (feeds.find((feed) => feed.url === url) !== undefined) {
                throw (i18next.t('duplicate'));
            }
        }
        watchedState.valid = true;
        watchedState.invalidFeedback = '';
        getRSS(url).catch((err) => {
            throw err;
        }).then((response) => {
            const parsedRSS = parse(response.data.contents);
            saveRSS(parsedRSS, url, newFlag);
            watchedState.validFeedback = i18next.t('success');
        })
    }).catch((err) => {
        console.log(err);
        watchedState.valid = false;
        form.valid = false;
        if (err.errors != undefined) {
            watchedState.invalidFeedback = err.errors[0];
        }
        watchedState.invalidFeedback = err;

    });
}

export default processRss;