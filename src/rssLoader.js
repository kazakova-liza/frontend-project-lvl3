
import axios from 'axios'


const proxifyUrl = (url) => {
    return `https://hexlet-allorigins.herokuapp.com/get?disableCache=true&url=${encodeURIComponent(url)}`;
}


const getRSS = (url) => {
    const proxifiedUrl = proxifyUrl(url);
    return axios.get(proxifiedUrl).catch(() => {
        throw new Error('network');
    });;
}

export default getRSS;
