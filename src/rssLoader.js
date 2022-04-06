import axios from 'axios';

const proxifyUrl = (url) => `https://allorigins.hexlet.app/get?disableCache=true&url=${url}`;

const getRSS = (url, i18nextInstance) => {
  const proxifiedUrl = proxifyUrl(url);
  return axios.get(proxifiedUrl).catch(() => {
    throw (i18nextInstance.t('networkError'));
  });
};

export default getRSS;
