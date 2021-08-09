import onChange from 'on-change'

let isValid;

const onIsValidChange = () => {
    const button = document.getElementsByClassName('btn-primary')[0];
    if (validity === true) {
        button.disabled = false;
    }
    else {
        button.disabled = true;
    }
}

const validity = onChange(isValid, onIsValidChange);

export default validity;
