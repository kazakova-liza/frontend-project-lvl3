import 'bootstrap/dist/js/bootstrap.js'
import validate from './validator.js'
import getRSS from './rssLoader.js'
import parse from './parser.js'
import feeds from './feeds.js'


let url;

export let state = {
    valid: null,
    error: ''
}

const getComponent = () => {
    const element = document.createElement('div');

    element.innerHTML = `<form novalidate>
        <div class="form-group">
            <label for="rssInput">RSS stream</label>
            <input class="form-control" id="rssInput" required autofocus aria-label='url' placeholder="Enter url">
            <button type="submit" class="btn btn-primary">Add</button>
            <div class="invalid-feedback">
            ${state.error}
            </div>
        </div>
        </form>`;

    return element;
}

const component = getComponent();

document.body.appendChild(component);

const form = document.getElementsByClassName('form-control')[0];
const button = document.getElementsByClassName('btn-primary')[0];


button.addEventListener('click', (event) => {
    url = form.value;
    validate(url).then(() => {
        if (feeds.includes(url)) {
            event.preventDefault();
            event.stopPropagation();
            state.valid = false;
            state.errors = 'This feed already exists';
        }
        else {
            state.valid = true;
            const content = getRSS(url);
            content.then((xmlString) => {
                const parsedRSS = parse(xmlString);
                console.log(parsedRSS.documentElement.textContent);
            })
        }
    }).catch((err) => {
        event.preventDefault();
        event.stopPropagation();
        state.valid = false;
        state.error = err.errors[0];
        form.valid = false;
    });

});


