const parser = new DOMParser();

const parse = (xmlString) => {
  const parsedString = parser.parseFromString(xmlString, 'application/xml');
  const parserError = parsedString.querySelector('parsererror');
  if (parserError) {
    const error = new Error('parsingError');
    error.isParsingError = true;
    throw error;
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
