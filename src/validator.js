import * as yup from 'yup'
import i18next from './messages.js'

yup.setLocale({
    string: {
        url: i18next.t('invalidUrl'),
    },
});


const schema = yup.string().url().min(2);


const validate = (data) => {
    return schema.validate(data);
}

export default validate;



