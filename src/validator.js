import * as yup from 'yup';


export default (url, feeds, i18nextInstance) => {
    const schema = yup
        .string()
        .url()
        .notOneOf(feeds.map((feed) => feed.url), 'duplicate');
    return schema.validate(url)
};
