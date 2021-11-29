
import { validate } from './validator.js'
import getRSS from './rssLoader.js'
import parse from './parser.js'
import { feeds } from './store.js'
import saveRSS from './saver.js'


const processRss = (url, newFlag, watchedState, i18nextInstance) => {
    console.log(watchedState.valid);
    const form = document.getElementsByClassName('form-control')[0];
    validate(url).then(() => {
        if (newFlag) {
            if (feeds.find((feed) => feed.url === url) !== undefined) {
                throw (i18nextInstance.t('duplicate'));
            }
        }
        watchedState.valid = true;
        watchedState.invalidFeedback = '';
        getRSS(url).catch((err) => {
            throw err;
        }).then((response) => {
            const parsedRSS = parse(response.data.contents);
            saveRSS(parsedRSS, url, newFlag, watchedState);
            watchedState.validFeedback = i18nextInstance.t('success');
        })
        console.log(watchedState.valid);
    }).catch((err) => {
        // console.log(watchedState.valid);
        // console.log(err);
        watchedState.valid = false;
        form.valid = false;
        if (err.errors !== undefined) {
            watchedState.invalidFeedback = err.errors[0];
        }
        watchedState.invalidFeedback = err;
        console.log(watchedState.valid);

    });
}

export default processRss;