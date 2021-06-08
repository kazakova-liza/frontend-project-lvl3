import _ from 'lodash'
import 'bootstrap/dist/js/bootstrap.js'
import validate from './validator.js'

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

form.addEventListener('input', (e) => validate(e.target.value));

// form.addEventListener('input', (e) => validate(e));

console.log(form);

