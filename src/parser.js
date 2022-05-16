const parser = new DOMParser();

const parse = (xmlString, i18nextInstance) => {
  const parsedString = parser.parseFromString(xmlString, 'application/xml');
  const parserError = parsedString.querySelector('parsererror');
  if (parserError) {
    throw (i18nextInstance.t('invalidRss'));
  }
  const title = parsedString.querySelector('title');
  const description = parsedString.querySelector('description');
  const items = [...parsedString.getElementsByTagName('item')];

  const posts = items.map((item) => {
    const postTitle = item.getElementsByTagName('title')[0].textContent;
    const link = item.getElementsByTagName('link')[0].textContent;
    const postDescription = item.getElementsByTagName('description')[0].textContent;
    const post = {
      title: postTitle,
      link,
      description: postDescription,
      viewed: false,
    };
    return post;
  });

  return {
    title: title.textContent,
    description: description.textContent,
    posts,
  };
};

export default parse;
