import _ from 'lodash'
import 'bootstrap/dist/js/bootstrap.js'

function component() {
    const element = document.createElement('div');

    element.innerHTML = `<form>
        <div class="form-group">
            <label for="exampleInputEmail1">RSS stream</label>
            <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter name">
            <button type="submit" class="btn btn-primary">Add</button>
        </div>
        </form>`;

    return element;
}

document.body.appendChild(component());