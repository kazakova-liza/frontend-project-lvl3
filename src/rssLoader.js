import axios from 'axios';

const getRSS = (url) => {
  const baseURL = new URL('https://allorigins.hexlet.app/get');
  baseURL.searchParams.append('disableCache', 'true').append('url', url);
  baseURL.searchParams.append('url', url);
  return axios.get(baseURL);
};

export default getRSS;
