import axios from 'axios';

const getRSS = (url) => {
  const proxifiedUrl = new URL(`https://allorigins.hexlet.app/get?disableCache=true&url=${url}`);
  return axios.get(proxifiedUrl);
};

export default getRSS;
