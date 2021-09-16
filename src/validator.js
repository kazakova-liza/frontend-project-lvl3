import * as yup from 'yup'

const schema = yup.string().url().min(2);


const validate = (data) => {
    return schema.validate(data);
}

export default validate;



