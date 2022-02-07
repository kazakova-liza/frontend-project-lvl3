const parser = new DOMParser();

const parse = (xmlString) => {
  const parsedData = parser.parseFromString(xmlString, 'application/xml');
  return parsedData;
};

export default parse;
