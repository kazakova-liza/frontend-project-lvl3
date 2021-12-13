import i18next from 'i18next'
import onChange from 'on-change'
import render from './src/view.js'
import 'bootstrap'
// import 'bootstrap/dist/css/bootstrap.min.css';
import processRss from './src/processor.js'
import addBootstrap from './src/bootstrap/addBootsrap.js'
import locale from './src/utils/locales.js'
import getComponent from './src/component.js'
import * as yup from 'yup'

const setYup = (i18nextInstance) => {
    yup.setLocale({
        string: {
            url: i18nextInstance.t('invalidUrl'),
        },
    });
}

const initApp = () => {
    const state = {
        valid: null,
        invalidFeedback: '',
        validFeedback: '',
        feeds: [],
        posts: [],
        showModal: false,
        currentModalTitle: '',
        currentModalBody: ''
    };
    const i18nextInstance = i18next.createInstance();
    i18nextInstance.init(locale);

    const watchedState = onChange(state, (path, value) => render(path, value));

    addBootstrap();

    setYup(i18nextInstance);
    const schema = yup.string().url();
    getComponent();

    const form = document.getElementsByClassName('form-control')[0];
    const addButton = document.getElementsByClassName('btn-primary')[0];


    addButton.addEventListener('click', (event) => {
        event.preventDefault();
        event.stopPropagation();
        const url = form.value;
        processRss(url, true, watchedState, i18nextInstance, schema);
    });

    if (watchedState.posts.length > 0) {
        const viewButtons = document.getElementsByClassName('btn-view');
        [...viewButtons].map((button) => {
            button.addEventListener('click', (event) => {
                event.preventDefault();
                event.stopPropagation();
                const id = event.value.id;
                const thisPost = watchedState.posts.find((post) => post.id === id);
                thisPost.viewed = true;
            });
        })
    }
}

initApp();

export default initApp;