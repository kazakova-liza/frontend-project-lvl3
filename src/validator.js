import * as yup from 'yup'

let schema = yup.string().url();


const validate = (data) => {
    schema
        .isValid(data)
        .then(function (valid) {
            valid; // => true
            console.log(valid);
        });
}

export default validate;



