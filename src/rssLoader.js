
import axios from 'axios'


const getProxyUrl = (url) => {
    return `https://hexlet-allorigins.herokuapp.com/get?url=${encodeURIComponent(url)}`;
}


const getRSS = (url) => {
    const proxyUrl = getProxyUrl(url);
    const content = axios.get(proxyUrl)
        .then(function (response) {
            console.log(response);
            return response; //data/contents
        })
        .catch(function (error) {
            console.log(error);
        })
    return content;
}

export default getRSS;
