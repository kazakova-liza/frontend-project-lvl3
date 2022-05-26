// @ts-check

import i18next from 'i18next';
import onChange from 'on-change';
import * as yup from 'yup';
import axios from 'axios';
import render from './view.js';
import 'bootstrap';
import ru from './locales/ru.js';
import validate from './utils/validator.js';
import proxify from './proxify.js';
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
    feeds: [],
    posts: [],
    ui: {
      viewedPosts: [],
      status: 'input',
      feedback: null,
      currentPostId: null,
    },
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
    event.stopPropagation();
    // console.log(event.target);
    const formData = new FormData(event.target);
    const url = formData.get('url');
    validate(url, watchedState.feeds)
      .then(() => {
        watchedState.ui.status = 'loading';
        const proxifiedUrl = proxify(url);
        return axios.get(proxifiedUrl);
      })
      .then((response) => {
        watchedState.ui.status = 'valid';
        const parsedRSS = parse(response.data.contents, i18nextInstance);
        saveRSS(parsedRSS, url, watchedState);
        watchedState.ui.status = 'success';
        watchedState.ui.feedback = 'success';
        input.value = '';
        // setTimeout(() => processRss(url, false, watchedState, i18nextInstance, schema), 5000);
      })
      .catch((err) => {
        watchedState.ui.status = 'invalid';
        console.log(err);
        if (err.name === 'ValidationError') {
          [watchedState.ui.feedback] = [err.errors[0]];
        } else if (err.isAxiosError) {
          watchedState.ui.feedback = 'networkError';
        } else {
          watchedState.ui.feedback = err;
        }
        // }
      });
  });

  const postsContainer = document.getElementById('posts');
  postsContainer.addEventListener('click', (event) => {
    const { postId } = event.target.dataset;
    watchedState.ui.viewedPosts.push(postId);
    watchedState.ui.currentPostId = postId;
  });
};

export default initApp;
