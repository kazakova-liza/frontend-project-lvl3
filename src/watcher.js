import onChange from 'on-change'

let object = {
    valid: false
};

const onIsValidChange = () => {
    const button = document.getElementsByClassName('btn-primary')[0];
    if (isValid.valid === true) {
        button.disabled = false;
    }
    else {
        button.disabled = true;
    }
}

const isValid = onChange(object, onIsValidChange);

export default isValid;
