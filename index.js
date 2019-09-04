const fs = require('fs');
const getUrls = require('get-urls');
/* const request = require('request'); */



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
}

/*  const getLinkLine = (file,link) => {
  const arrFile = file.split('\n');
const line = link.nde
  linksObj.forEach()
for(i=0; i < arrFile.length; i++)
  } */

const mdLinks = async (path,options) => {
  // ...
  try {
    const file = await getFile(path);
    const setLinks = getLinks(file);
    const resultArr = [];
    setLinks.forEach(link => resultArr.push({
      file: path,
      href: link,
      text: 'algo',
      line: '2'
    }));
    return resultArr;   

} catch (err) {
    console.log(err);
}

};



mdLinks('./README_test.md')
 .then(result => console.log(result));

module.exports.mdLinks;


