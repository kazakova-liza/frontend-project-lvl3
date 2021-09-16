import * as yup from 'yup'

let schema = yup.string().url().min(2);


const validate = async (data) => {
    const isValid = await schema.isValid(data);
    return isValid;
}

export default validate;



