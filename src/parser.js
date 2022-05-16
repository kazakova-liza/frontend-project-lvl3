const parser = new DOMParser();

const parse = (xmlString, i18nextInstance) => {
  const parsedString = parser.parseFromString(xmlString, 'application/xml');
  const parserError = parsedString.querySelector('parsererror');
  if (parserError) {
    throw (i18nextInstance.t('invalidRss'));
  }
  const title = parsedString.querySelector('title').textContent;
  const description = parsedString.querySelector('description').textContent;
  const items = [...parsedString.getElementsByTagName('item')];

  const posts = items.map((item) => {
    const postTitle = item.querySelector('title').textContent;
    const link = item.querySelector('link').textContent;
    const postDescription = item.querySelector('description').textContent;

    return {
      title: postTitle,
      link,
      description: postDescription,
    };
  });

  return {
    title,
    description,
    posts,
  };
};

export default parse;
