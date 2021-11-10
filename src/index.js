
import validate from './validator.js'
import getRSS from './rssLoader.js'
import 'bootstrap'
// import 'bootstrap/dist/css/bootstrap.min.css';
import parse from './parser.js'
import { feeds } from './store.js'
import onChange from 'on-change'
import render from './view.js'
import i18next from './messages.js'
import saveRSS from './saver.js'
import addBootstrap from './bootstrap/addBootsrap.js'
// import './App.css'


let url;

let state = {
    valid: null,
    error: '',
    feeds: [],
    posts: [],
    showModal: false,
    currentModalTitle: '',
    currentModalBody: ''
}

export const watchedState = onChange(state, (path, value) => render(path, value));

addBootstrap();



const getComponent = () => {
    const element = document.createElement('div');

    element.innerHTML = `
    <div class='app'>
        <h1>RSS stream</h1>
        <form novalidate>
            <div class="form-group">
                <input class="form-control" id="rssInput" required autofocus aria-label='url' placeholder="Enter url">
                <button type="submit" class="btn btn-primary">Add</button>
                <div class="invalid-feedback">
                ${state.error}
                </div>
            </div>
        </form>
        <h1>Feeds</h1>
        <div class='feeds'>
        </div>
        <h1>Posts</h1>
        <div class='posts'>
        </div>
        <div class="modal fade" id="previewModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title"></h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button type="button" class="btn btn-primary">Save changes</button>
                    </div>
                </div>
         </div>

    </div>`;

    return element;
}

const component = getComponent();

document.body.appendChild(component);

const form = document.getElementsByClassName('form-control')[0];
const addButton = document.getElementsByClassName('btn-primary')[0];

// const modal = document.getElementById('myModal')

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

export const updateRss = (url) => {
    processRss(url, false);
    setTimeout(() => updateRss(url), 5000);
}


addButton.addEventListener('click', (event) => {
    event.preventDefault();
    event.stopPropagation();
    url = form.value;
    processRss(url, true);
});

if (state.posts.length > 0) {
    const viewButtons = document.getElementsByClassName('btn-view');
    [...viewButtons].map((button) => {
        button.addEventListener('click', (event) => {
            event.preventDefault();
            event.stopPropagation();
            const id = event.value.id;
            const thisPost = watchedState.posts.find((post) => post.id === id);
            thisPost.viewed = true;
            console.log(state.posts);


        });
    })
}







