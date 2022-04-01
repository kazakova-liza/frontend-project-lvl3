// @ts-check

import i18next from 'i18next';
import onChange from 'on-change';
import * as yup from 'yup';
import render from './view.js';
import 'bootstrap';
import processRss from './processor.js';
import locale from './utils/locales.js';

const setYup = (i18nextInstance) => {
  yup.setLocale({
    string: {
      url: i18nextInstance.t('invalidUrl'),
    },
  });
};

const initApp = () => {
  const state = {
    valid: null,
    invalidFeedback: '',
    validFeedback: '',
    feeds: [],
    posts: [],
    showModal: false,
    currentModalTitle: '',
    currentModalBody: '',
  };
  const i18nextInstance = i18next.createInstance();
  i18nextInstance.init(locale);

  const watchedState = onChange(state, (path, value) => render(path, value));

  setYup(i18nextInstance);
  const schema = yup.string().url();

  const form = document.getElementsByClassName('form-control')[0];
  const addButton = document.getElementsByClassName('btn-primary')[0];

  addButton.addEventListener('click', (event) => {
    event.preventDefault();
    event.stopPropagation();
    const url = form.value;
    console.log(url);
    processRss(url, true, watchedState, i18nextInstance, schema);
  });

  if (watchedState.posts.length > 0) {
    const viewButtons = document.getElementsByClassName('btn-view');
    [...viewButtons].forEach((button) => {
      button.addEventListener('click', (event) => {
        event.preventDefault();
        event.stopPropagation();
        const { id } = event.value;
        const thisPost = watchedState.posts.find((post) => post.id === id);
        thisPost.viewed = true;
      });
    });
  }
};

// initApp();

export default initApp;
