import 'bootstrap/dist/js/bootstrap.js'
import validate from './validator.js'
import getRSS from './rssLoader.js'
import parse from './parser.js'
import { feeds } from './store.js'
import onChange from 'on-change'
import render from './view.js'
import i18next from './messages.js'
import saveRSS from './saver.js'


let url;

let state = {
    valid: null,
    error: '',
    feeds: [],
    posts: []
}

export const watchedState = onChange(state, (path, value) => render(path, value));

const getComponent = () => {
    const element = document.createElement('div');

    element.innerHTML = `
    <div>
        <form novalidate>
            <div class="form-group">
                <label for="rssInput">RSS stream</label>
                <input class="form-control" id="rssInput" required autofocus aria-label='url' placeholder="Enter url">
                <button type="submit" class="btn btn-primary">Add</button>
                <div class="invalid-feedback">
                ${state.error}
                </div>
            </div>
        </form>
        <div class='feeds'>
        <h1>Feeds</h1>
        </div>
        <div class='posts'>
        <h1>Posts</h1>
        </div>

    </div>`;

    return element;
}

const component = getComponent();

document.body.appendChild(component);

const form = document.getElementsByClassName('form-control')[0];
const button = document.getElementsByClassName('btn-primary')[0];

const processRss = (url, newFlag) => {
    validate(url).then(() => {
        if (newFlag) {
            if (feeds.find((feed) => feed.url === url) !== undefined) {
                throw (i18next.t('duplicate'));
            }

        }
        watchedState.valid = true;
        watchedState.error = '';
        getRSS(url).then((response) => {
            const parsedRSS = parse(response.data.contents);
            saveRSS(parsedRSS, url, newFlag);

        })
    }).catch((err) => {
        watchedState.valid = false;
        form.valid = false;
        if (err.errors != undefined) {
            watchedState.error = err.errors[0];
        }
        watchedState.error = err;

    });
}

const updateRss = () => {
    if (feeds.length !== 0) {
        feeds.map((feed) => {
            processRss(feed.url, false);
        });
    }
    setTimeout(updateRss, 5000);
}


button.addEventListener('click', (event) => {
    event.preventDefault();
    event.stopPropagation();
    url = form.value;
    processRss(url, true);
});

setTimeout(updateRss, 5000);




