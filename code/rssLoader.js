
import axios from 'axios'


const getProxyUrl = (url) => {
    return `https://hexlet-allorigins.herokuapp.com/get?url=${encodeURIComponent(url)}`;
}


const getRSS = (url) => {
    const proxyUrl = getProxyUrl(url);
    return axios.get(proxyUrl);
}

export default getRSS;
