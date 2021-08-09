import * as yup from 'yup'

let schema = yup.string().url();


const validate = (data) => {
    const isValid = schema.isValid(data);
    return isValid;
}

export default validate;



