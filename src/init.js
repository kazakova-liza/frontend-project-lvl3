import i18next from 'i18next'
import onChange from 'on-change'
import render from './view.js'

const initApp = () => {
    const i18nextInstance = i18next.createInstance();
    i18nextInstance.init({
        lng: 'ru',
        debug: true,
        resources: {
            en: {
                translation: {
                    duplicate: 'This feed already exists',
                    invalidUrl: 'This should be a valid URL',
                    success: 'RSS has been successfully added'
                }
            },
            ru: {
                translation: {
                    duplicate: 'This feed already exists',
                    invalidUrl: 'This should be a valid URL',
                    success: 'RSS успешно загружен'
                }
            }
        }
    });

    let state = {
        valid: null,
        invalidFeedback: '',
        validFeedback: '',
        feeds: [],
        posts: [],
        showModal: false,
        currentModalTitle: '',
        currentModalBody: ''
    }

    const watchedState = onChange(state, (path, value) => render(path, value));

    return watchedState;
}

export default initApp;