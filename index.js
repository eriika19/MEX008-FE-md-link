const fs = require('fs');
const getUrls = require('get-urls');
const request = require('request');



//Desde este archivo debes exportar una función (mdLinks).
// Función asíncrona para obtener el archivo .md como string dando como argumento un path que el usuario va a ingresar
const getFile = (path) => {
  return new Promise((resolve, reject) => {
    fs.readFile(path, 'UTF-8', (err, data) => {
      if (err) reject(err);
      resolve(data);
    });
  });
};


const getLinks = (file) => {
  return getUrls(file);
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

const buildArr = async (path) => {
  try {
    const file = await getFile(path);
    const setLinks = getLinks(file);
    const arrLinks = Array.from(setLinks);
    const resultArr = [];
    for (index = 0; arrLinks.length !== resultArr.length; index++) {
      const link = arrLinks[index];
      resultArr.push({
        file: path,
        href: link,
        text: 'algo',
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
    const setLinks = getLinks(file);
    const arrLinks = Array.from(setLinks);
    const resultArr = [];
    for (index = 0; arrLinks.length !== resultArr.length; index++) {
      const link = arrLinks[index];
      const urlResponse = await validateLink(link);
      resultArr.push({
        file: path,
        href: link,
        text: 'algo',
        line: getLinkLine(file, link),
        response: urlResponse,
        status: 'un status',
      });
    };
    return resultArr;
  } catch (err) {
    console.log(err);
  }
};




const mdLinks = async (path, options) => {
  try {
    if (options === undefined) {
      return await buildArr(path);
    }

    if (options.validate === true) {
      return await validateArr(path);
    }

    if (options.stats === true) {
      return await statsArr(path)
    }
  } catch (err) {
    console.log(err);
  }
};



mdLinks('./README_test.md', {
    validate: true
  })
  .then(result => console.log(result));

module.exports.mdLinks;
