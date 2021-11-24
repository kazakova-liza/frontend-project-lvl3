import * as yup from 'yup'


export const setYup = (i18nextInstance) => {
    yup.setLocale({
        string: {
            url: i18nextInstance.t('invalidUrl'),
        },
    });
}


const schema = yup.string().url().min(2);


export const validate = (data) => {
    return schema.validate(data);
}




