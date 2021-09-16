import _ from 'lodash'
import 'bootstrap/dist/js/bootstrap.js'
import validate from './validator.js'
import getRSS from './rssLoader.js'
import parse from './parser.js'
import feeds from './feeds.js'
import result from './view.js'


let url;

const getComponent = () => {
    const element = document.createElement('div');

    element.innerHTML = `<form novalidate>
        <div class="form-group">
            <label for="rssInput">RSS stream</label>
            <input class="form-control" id="rssInput" type="url" required autofocus aria-label='url' placeholder="Enter url">
            <button type="submit" class="btn btn-primary">Add</button>
            <div class="invalid-feedback">
            Please enter a valid URL.
            </div>
        </div>
        </form>`;

    return element;
}

const component = getComponent();

document.body.appendChild(component);

const form = document.getElementsByClassName('form-control')[0];
const button = document.getElementsByClassName('btn-primary')[0];

const state = {
    valid: null,
    errors: []
}

button.addEventListener('click', (event) => {
    url = form.value;
    validate(url).then((valid) => {
        if (valid === true) {
            if (feeds.includes(url)) {
                event.preventDefault();
                event.stopPropagation();
                result.valid = false;
                // form.classList.add('is-invalid');
            }
            else {
                result.valid = true;
                // form.classList.add('is-valid');
                const content = getRSS(url);
                content.then((xmlString) => {
                    const parsedRSS = parse(xmlString);
                    console.log(parsedRSS.documentElement.textContent);
                })
            }
        }
        else {
            event.preventDefault();
            event.stopPropagation();
            // form.classList.add('is-invalid');
            result.valid = false;
            form.valid = false;
        }
        form.classList.add('was-validated');
    });
});


