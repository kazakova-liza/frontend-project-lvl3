import _ from 'lodash'
import 'bootstrap/dist/js/bootstrap.js'

function component() {
    const element = document.createElement('div');

    element.innerHTML = `<form></form>`;

    return element;
}

document.body.appendChild(component());