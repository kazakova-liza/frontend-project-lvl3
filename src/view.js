import onChange from 'on-change'

let object = {
    valid: false
};

const render = (state) => {
    const button = document.getElementsByClassName('btn-primary')[0];
    if (result.valid === true) {
        button.disabled = false;
    }
    else {
        button.disabled = true;
    }
}

const result = onChange(object, render);


export default result;
