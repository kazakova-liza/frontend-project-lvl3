import onChange from 'on-change'
import { state } from './index.js'

const render = (state) => {
    const form = document.getElementsByClassName('form-control')[0];
    const feedback = document.getElementsByClassName('invalid-feedback')[0];
    if (state.valid) {
        form.classList.add('is-valid');
    }
    else {
        form.classList.add('is-invalid');
        feedback.textContent = state.error;
    }
    form.classList.add('was-validated');
}

onChange(state, render(state));


