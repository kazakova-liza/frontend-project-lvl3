
import axios from 'axios'


const proxifyUrl = (url) => {
    return `https://hexlet-allorigins.herokuapp.com/get?disableCache=true&url=${url}`;
}


const getRSS = (url) => {
    console.log(url);
    const proxifiedUrl = proxifyUrl(url);
    // console.log(proxifiedUrl);
    return axios.get(proxifiedUrl);
}

export default getRSS;
