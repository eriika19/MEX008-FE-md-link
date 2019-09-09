
const fs = require('fs');
const request = require('request');

const getFile = async (path) => {
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

  const getAllLinks = (file) => {
  let match; 
  const linkRegex = /\[([^\[\]]*?)\]\((https?:\/\/[^\s$.?#].[^\s]*)\)/g;
  const allMatches = [];
  while (( match = linkRegex.exec(file)) !== null) {
    allMatches.push(match[2])
  }

  return allMatches
}  


 const getRawLinks = (file) => {
  let match; 
  const linkRegex = /https?:\/\/[^\s$.?#].[^)|\s]*/g;
  const allMatches = [];
  while ((match = linkRegex.exec(file)) !== null) {
      allMatches.push(match[0])
  }

  return allMatches
} 

const getUniqueLinks = (file) => {
const allMatches = getAllLinks(file);
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
      if (error) {resolve(error.code);};
      const resp = response && response.statusCode; // Print the response status code if a response was received
      resolve(resp);
    });
  });
};

// parenthesis const linkRegex = /\((https?:\/\/[^\s$.?#].[^\s]*)\)/g;

// ultimate const linkRegex = /https?:\/\/[^\s$.?#].[^)|\s]*/g;

/* getAllLinks('./test/data/README_test.md')
.then(result => console.log(result)); */

module.exports = {
getFile, 
getAllLinks,
getLinkText,
getUniqueLinks,
getLinkLine,
validateLink, 
getRawLinks
  };