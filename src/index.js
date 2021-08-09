import _ from 'lodash'
import 'bootstrap/dist/js/bootstrap.js'
import validate from './validator.js'
import getRSS from './rssLoader.js'
import parse from './parser.js'
import feeds from './feeds.js'
import isValid from './watcher.js'


let url;

const getComponent = () => {
    const element = document.createElement('div');

    element.innerHTML = `<form>
        <div class="form-group">
            <label for="rssInput">RSS stream</label>
            <input class="form-control" id="rssInput" type="url" required autofocus aria-label='url' placeholder="Enter url">
            <button type="submit" class="btn btn-primary" disabled>Add</button>
        </div>
        </form>`;

    return element;
}

const component = getComponent();

document.body.appendChild(component);

const form = document.getElementsByClassName('form-control')[0];


form.addEventListener('input', (e) => {
    url = e.target.value;
    validate(url).then((valid) => {
        if (valid === true) {
            if (feeds.includes(url)) {
                isValid.valid = false;
            }
            else {
                isValid.valid = true;
                const content = getRSS(url);
                content.then((xmlString) => {
                    const parsedRSS = parse(xmlString);
                    console.log(parsedRSS.documentElement.textContent);
                })
            }
        }
        else {
            isValid.valid = false;
        }
    });
});


