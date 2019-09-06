const fs = require('fs');
const request = require('request');

const getFile = (path) => {
  return new Promise((resolve, reject) => {
    fs.readFile(path, 'UTF-8', (err, data) => {
      if (err) reject(err);
      resolve(data);
    });
  });
};

const getLinkText = (file) => {
  let match;
  const linkRegex = /\[([^\[\]]*?)\]\((https?:\/\/[^\s$.?#].[^\s]*)\)/g;
  const allMatches = [];
  while (( match = linkRegex.exec(file)) !== null) {
      allMatches.push({ text: match[1], href: match[2] })
  }
  return allMatches
}

const getAllMatches = (file) => {
  let match;
  const linkRegex = /\[([^\[\]]*?)\]\((https?:\/\/[^\s$.?#].[^\s]*)\)/g;
  const allMatches = [];
  while ((match = linkRegex.exec(file)) !== null) {
      allMatches.push(match[2])
  }
  return allMatches
}

const getUniqueLinks = (file) => {
const allMatches = getAllMatches(file);
const uniqueLinks = new Set(allMatches);
return uniqueLinks;
};

const getLinkLine = (file, link) => {
  const arrFile = file.split('\n');
  const index = arrFile.findIndex(line => line.indexOf(link) > -1);
  return index + 1;
};

const validateLink = async (link) => {
  return new Promise((resolve, reject) => {
    request(link, (error, response) => {
      if (error) reject(error);
      const resp = response && response.statusCode; // Print the response status code if a response was received
      resolve(resp);
    });
  });
};

const getResponseMsg = async (response) => {
  if (response !== 200) {
    return 'fail';
  } else {
    return 'ok';
  };
};

const buildArr = async (path) => {
  try {
    const file = await getFile(path);
    const arrLinks = getLinkText(file);
    const resultArr = [];
    for (index = 0; arrLinks.length !== resultArr.length; index++) {
      const link = arrLinks[index].href;
      const textLink = arrLinks[index].text;
      resultArr.push({
        file: path,
        href: link,
        text: textLink,
        line: getLinkLine(file, link),
      });
    };
    return resultArr;
  } catch (err) {
    console.log(err);
  }
};

const validateArr = async (path) => {
  try {
    const file = await getFile(path);
    const arrLinks = getLinkText(file);
    const resultArr = [];
    for (index = 0; arrLinks.length !== resultArr.length; index++) {
      const link = arrLinks[index].href;
      const textLink = arrLinks[index].text;
      const urlResponse = await validateLink(link);
      const responseMsg = await getResponseMsg(urlResponse);
      resultArr.push({
        file: path,
        href: link,
        text: textLink,
        line: getLinkLine(file, link),
        status: responseMsg,
        statusCode: urlResponse,
      });
    };
    return resultArr;
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  getFile,
  getLinkText,
  getLinkLine,
  getAllMatches,
  getUniqueLinks,
  validateLink,
  getResponseMsg,
  buildArr,
  validateArr
};
