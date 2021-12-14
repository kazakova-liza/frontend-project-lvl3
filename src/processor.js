
import { validate } from './validator.js'
import getRSS from './rssLoader.js'
import parse from './parser.js'
import saveRSS from './saver.js'


const processRss = (url, newFlag, watchedState, i18nextInstance, schema) => {
    const form = document.getElementsByClassName('form-control')[0];
    validate(url, schema)
        .then(() => {
            console.log(form.value);
            if (newFlag) {
                if (watchedState.feeds.find((feed) => feed.url === url) !== undefined) {
                    console.log(form.value);
                    throw (i18nextInstance.t('duplicate'));
                }
            }
        })
        .then(() => getRSS(url))
        .then((response) => {
            console.log(form.value);
            const parsedRSS = parse(response.data.contents);
            saveRSS(parsedRSS, url, newFlag, watchedState, i18nextInstance, schema);
            // const form = document.getElementsByClassName('form-control')[0];
            form.value = '';
            console.log(form.value);
        })
        .catch((err) => {
            console.log(form.value);
            watchedState.valid = false;
            watchedState.validFeedback = '';
            if (err.errors !== undefined) {
                watchedState.invalidFeedback = err.errors[0];
            }
            else {
                watchedState.invalidFeedback = err;
            }


        });
}

export default processRss;