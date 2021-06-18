
import axios from 'axios'


const getProxyUrl = (url) => {
    return `https://hexlet-allorigins.herokuapp.com/get?url=${encodeURIComponent(url)}`;
}


const getRSS = (url) => {
    const proxyUrl = getProxyUrl(url);
    const content = axios.get(proxyUrl)
        .then(function (response) {
            console.log(response);
            return response;
        })
        .catch(function (error) {
            console.log(error);
        })
    // .then(function () {
    //     // always executed
    // });
    return content;
}

export default getRSS;
