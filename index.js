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

const getResponseMsg = async (response) => {
  if (226 < response) {
    return 'fail';
  } else {
    return 'ok';
  };
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
      const responseMsg = await getResponseMsg(urlResponse);
      resultArr.push({
        file: path,
        href: link,
        text: 'algo',
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




const mdLinks = async (path, options) => {
  try {
    if (options === undefined) {
      return await buildArr(path);
    }

    if (options.validate === true && options.stats === true) {
      const file = await getFile(path);
      const setLinks = getLinks(file);
      const arrLinks = Array.from(setLinks);
      let counter = 0;
      for (i = 0; i < arrLinks.length; i++) {
        const link = arrLinks[i];
        const urlResponse = await validateLink(link);
        if (226 < urlResponse) {
          counter++;
        }
      };

      const bothArr = {
        Total: arrLinks.length,
        Unique: arrLinks.length,
        Broken: counter,
      };
      return bothArr;
    }

    if (options.validate === true) {
      return await validateArr(path);
    }

    if (options.stats === true) {
      const file = await getFile(path);
      const uniqueLinks = getLinks(file).size;
      const statsArr = {
        Total: uniqueLinks,
        Unique: uniqueLinks,
      };
      return statsArr;
    }
  } catch (err) {
    console.log(err);
  }
};



mdLinks('./README_test.md', {
    validate: true,
    stats: true,
  })
  .then(result => console.log(result));

module.exports.mdLinks;
