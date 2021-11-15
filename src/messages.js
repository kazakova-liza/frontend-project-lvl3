import i18next from 'i18next';

i18next.init({
    lng: 'ru',
    debug: true,
    resources: {
        en: {
            translation: {
                duplicate: 'This feed already exists',
                invalidUrl: 'This should be a valid URL',
                success: 'RSS has been successfully added'
            }
        },
        ru: {
            translation: {
                duplicate: 'This feed already exists',
                invalidUrl: 'This should be a valid URL',
                success: 'RSS успешно загружен'
            }
        }
    }
});

export default i18next;