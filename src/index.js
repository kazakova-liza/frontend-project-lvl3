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
    error: ''
}

const watchedState = onChange(state, (path, value) => render(path, value));

const getComponent = () => {
    const element = document.createElement('div');

    element.innerHTML = `<form novalidate>
        <div class="form-group">
            <label for="rssInput">RSS stream</label>
            <input class="form-control" id="rssInput" required autofocus aria-label='url' placeholder="Enter url">
            <button type="submit" class="btn btn-primary">Add</button>
            <div class="invalid-feedback">
            ${state.error}
            </div>
        </div>
        </form>`;

    return element;
}

const component = getComponent();

document.body.appendChild(component);

const form = document.getElementsByClassName('form-control')[0];
const button = document.getElementsByClassName('btn-primary')[0];


button.addEventListener('click', (event) => {
    event.preventDefault();
    event.stopPropagation();
    url = form.value;
    validate(url).then(() => {
        if (feeds.length !== 0) {
            watchedState.valid = false;
            watchedState.errors = i18next.t('duplicate');
        }
        else {
            watchedState.valid = true;
            getRSS(url).then((response) => {
                console.log(`Received RSS response: ${JSON.stringify(response)}`)
                const parsedRSS = parse(response.data.contents);
                saveRSS(parsedRSS, url);

            })
        }
    }).catch((err) => {
        console.log(`Error getting RSS: ${err}`);
        watchedState.valid = false;
        watchedState.error = err.errors[0];
        form.valid = false;
    });

});


