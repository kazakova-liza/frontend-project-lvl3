
import validate from './validator.js'
import getRSS from './rssLoader.js'
import parse from './parser.js'
import { feeds } from './store.js'
import i18next from './messages.js'
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
        watchedState.message = '';
        getRSS(url).catch((err) => {
            throw err;
        }).then((response) => {
            const parsedRSS = parse(response.data.contents);
            saveRSS(parsedRSS, url, newFlag);
            watchedState.message = i18next.t('success');
        })
    }).catch((err) => {
        console.log(err);
        watchedState.valid = false;
        form.valid = false;
        if (err.errors != undefined) {
            watchedState.message = err.errors[0];
        }
        watchedState.message = err;

    });
}

export default processRss;