const parser = new DOMParser();

const parse = (xmlString) => {
    const parsedData = parser.parseFromString(xmlString, "application/xml");
    console.log(parsedData.documentElement.textContent);
    return parsedData;
}

export default parse;