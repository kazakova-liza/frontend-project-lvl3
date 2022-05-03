import axios from 'axios';


const getRSS = (url, i18nextInstance) => {
  const proxifiedUrl = new URL('https://allorigins.hexlet.app/get?disableCache=true&url=', url);
  return axios.get(proxifiedUrl).catch(() => {
    throw (i18nextInstance.t('networkError'));
  });
};

export default getRSS;
