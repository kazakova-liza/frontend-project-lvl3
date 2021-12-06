
import axios from 'axios'


const getProxyUrl = (url) => {
    return `https://hexlet-allorigins.herokuapp.com/get?disableCache=true&url=${url}`;
    // return `https://hexlet-allorigins.herokuapp.com/get?disableCache=true&url=${encodeURIComponent(url)}`;
}


const getRSS = (url) => {
    const proxyUrl = getProxyUrl(url);
    return axios.get(proxyUrl);
}

export default getRSS;
