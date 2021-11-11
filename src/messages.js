import i18next from 'i18next';

i18next.init({
    lng: 'en',
    debug: true,
    resources: {
        en: {
            translation: {
                'duplicate': 'This feed already exists',
                'invalidUrl': 'This should be a valid URL'
            }
        }
    }
});

export default i18next;