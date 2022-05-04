// @ts-check

import i18next from 'i18next';
import onChange from 'on-change';
import * as yup from 'yup';
import render from './view.js';
import 'bootstrap';
import ru from './locales/ru.js';
import validate from './utils/validator.js';
import getRSS from './rssLoader.js';
import parse from './parser.js';
import saveRSS from './saver.js';

const setYup = (i18nextInstance) => {
  yup.setLocale({
    string: {
      url: i18nextInstance.t('invalidUrl'),
    },
  });
};

const initApp = () => {
  const state = {
    status: 'input',
    feedback: null,
    feeds: [],
    posts: [],
  };

  const i18nextInstance = i18next.createInstance();
  i18nextInstance.init(ru);

  const addButton = document.getElementById('add-button');
  const input = document.getElementById('rss-input');
  const form = document.getElementById('rss-input-form');
  const invalidFeedback = document.getElementById('invalid-feedback');
  const validFeedback = document.getElementById('valid-feedback');
  const feeds = document.getElementById('feeds');
  const posts = document.getElementById('posts');

  const elements = {
    addButton, input, invalidFeedback, validFeedback, feeds, posts,
  };

  const updateView = (path, value) => render(path, value, i18nextInstance, elements);
  const watchedState = onChange(state, updateView);

  setYup(i18nextInstance);

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    // event.stopPropagation();
    const url = input.value;
    validate(url, watchedState.feeds)
      .then(() => {
        watchedState.status = 'loading';
        return getRSS(url, i18nextInstance);
      })
      .then((response) => {
        watchedState.status = 'valid';
        const parsedRSS = parse(response.data.contents, i18nextInstance);
        saveRSS(parsedRSS, url, watchedState);
        watchedState.status = 'success';
        watchedState.feedback = 'success';
        // setTimeout(() => processRss(url, false, watchedState, i18nextInstance, schema), 5000);
      })
      .catch((err) => {
        watchedState.status = 'invalid';
        watchedState.feedback = null;
        if (err.name === 'ValidationError') {
          [watchedState.feedback] = [err.errors[0]];
        } else if (err.message === 'Network Error') {
          watchedState.feedback = i18nextInstance.t('networkError');
        } else {
          watchedState.feedback = err;
        }
        // }
      });
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

export default initApp;
