import * as yup from 'yup';

export default (url, feeds) => {
  const schema = yup
    .string()
    .url()
    .notOneOf(feeds.map((feed) => feed.url), 'duplicate')
    .required();
  return schema.validate(url);
};
