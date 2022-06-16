const parser = new DOMParser();

const parse = (xmlString) => {
  const parsedString = parser.parseFromString(xmlString, 'application/xml');
  const parserError = parsedString.querySelector('parsererror');
  console.log(parsedString)
  if (parserError) {
    const error = new Error(`parsingError: ${parserError.textContent}`);
    error.isParsingError = true;
    throw error;
  }
  const link = parsedString.querySelector('link').textContent;
  const title = parsedString.querySelector('title').textContent;
  const description = parsedString.querySelector('description').textContent;
  const items = [...parsedString.getElementsByTagName('item')];

  const posts = items.map((item) => {
    const postTitle = item.querySelector('title').textContent;
    const postLink = item.querySelector('link').textContent;
    const postDescription = item.querySelector('description').textContent;

    return {
      title: postTitle,
      link: postLink,
      description: postDescription,
    };
  });

  return {
    link,
    title,
    description,
    posts,
  };
};

export default parse;
