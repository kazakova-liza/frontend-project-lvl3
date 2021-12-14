
import axios from 'axios'


const proxifyUrl = (url) => {
    return `https://hexlet-allorigins.herokuapp.com/get?disableCache=true&url=${url}`;
}


const getRSS = (url) => {
    const proxifiedUrl = proxifyUrl(url);
    // console.log(proxifiedUrl);
    return axios.get(proxifiedUrl).catch(() => {
        throw i18nextInstance.t('invalidRss');
    });
}

export default getRSS;
