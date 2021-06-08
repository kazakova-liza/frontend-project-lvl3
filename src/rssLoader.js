
import axios from 'axios'


const getRSS = (url) => {
    const content = axios.get(url)
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
