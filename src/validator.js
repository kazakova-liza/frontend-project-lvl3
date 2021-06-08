import * as yup from 'yup'

// let schema = yup.object().shape({
//     url: yup.string().required().url(),
// });

// let schema = yup.object().shape({
//     url: yup.string().url(),
// });

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



