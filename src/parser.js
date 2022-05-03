const parser = new DOMParser();

const parse = (xmlString, i18nextInstance) => {
  const parsedString = parser.parseFromString(xmlString, 'application/xml');
  console.log(parsedString);
  const title = parsedString.getElementsByTagName('title')[0];
  const description = parsedString.getElementsByTagName('description')[0];
  if (title === undefined || description === undefined) {
    throw (i18nextInstance.t('invalidRss'));
  }
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
