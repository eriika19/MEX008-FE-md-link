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


  const getLinkLine = (file,link) => {
  const arrFile = file.split('\n');
const index = arrFile.findIndex(line => line.indexOf(link) > -1);
return index + 1;
};
  

const validateLink = async (link) => {
  request
  .get(link)
  .on('response', function(response) {
    console.log(response.headers['content-type']); // 'image/png'
    return response.statusCode; // 200
  })
 .pipe(request.put('http://mysite.com/img.png'))
};

const mdLinks = async (path,options) => {
  try {
    const file = await getFile(path);
    const setLinks = getLinks(file);
    const resultArr = [];
    setLinks.forEach( async (link) => 
      resultArr.push({
      file: path,
      href: link,
      text: 'algo',
      line: getLinkLine(file,link),
      status: validateLink(link),
    }));
    return resultArr;   

} catch (err) {
    console.log(err);
}
};


mdLinks('./README_test.md')
 .then(result => console.log(result));

module.exports.mdLinks;


