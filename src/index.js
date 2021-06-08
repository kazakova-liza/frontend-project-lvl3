import _ from 'lodash'
import 'bootstrap/dist/js/bootstrap.js'
import validate from './validator.js'
import getRSS from './rssLoader.js'


const getComponent = () => {
    const element = document.createElement('div');

    element.innerHTML = `<form>
        <div class="form-group">
            <label for="exampleInputEmail1">RSS stream</label>
            <input class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter name">
            <button type="submit" class="btn btn-primary">Add</button>
        </div>
        </form>`;

    return element;
}


const component = getComponent();

document.body.appendChild(component);

const form = document.getElementsByClassName('form-control')[0];

let isValid;
let url;

form.addEventListener('input', (e) => {
    url = e.target.value;
    isValid = validate(url);
});

if (isValid === true) {
    const content = getRSS(url);
    console.log(content);
}



