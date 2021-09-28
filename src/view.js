
const render = (path, value, previousValue, applyData) => {
    const form = document.getElementsByClassName('form-control')[0];
    const feedback = document.getElementsByClassName('invalid-feedback')[0];
    if (path === 'state') {
        if (value) {
            form.classList.add('is-valid');
        }
        else {
            form.classList.add('is-invalid');
        }
    }
    if (path === 'error') {
        feedback.textContent = value;
    }

    form.classList.add('was-validated');
}

export default render;



