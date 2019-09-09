const {
    getFile, 
    getAllLinks, 
    getUniqueLinks, 
    getLinkText,
    getLinkLine,
    validateLink,
    getRawLinks
      } = require('./get_links.js');

  const getResponseMsg = (response) => {
  if (response !== 200 && response !== 201) {
    return 'fail';
  } else {
    return 'ok';
  };
};

const buildArr = async (path, resultArr) => {
  try {
  const file = await getFile(path);
  const arrLinks = getLinkText(file);

  if (arrLinks.length < 1) {
    const rawLinks = getRawLinks(file);
      if (rawLinks.length > 0) {
        return [{
          file: path,
          links: rawLinks.length,
          info: 'the markdown file has no links with the next structure: "[text_of_link](href_of_link)"'
        }];
     }
     return [{
      file: path,
      links: rawLinks.length,
      info: 'the markdown file has no links'
    }];
      }
      for (index = 0; arrLinks.length !== resultArr.length; index++) {
      //  if(arrLinks[index] === undefined) {break;};        
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

const validateArr = async (path, resultArr) => {
  try {
    const file = await getFile(path);
    const arrLinks = getLinkText(file);

    if (arrLinks.length < 1) {
      const rawLinks = getRawLinks(file);
        if (rawLinks.length > 0) {
          return [{
            file: path,
            links: rawLinks.length,
            info: 'the markdown file has no links with the next structure: "[text_of_link](href_of_link) to validate"'
          }];
       }
       return [{
        file: path,
        links: rawLinks.length,
        info: 'the markdown file has no links to validate'
      }];
        }
      for (index = 0; arrLinks.length !== resultArr.length; index++) {
    //    if(arrLinks[index] === undefined) {break};
        const link = arrLinks[index].href;
        const textLink = arrLinks[index].text;
        const urlResponse = await validateLink(link);
        const responseMsg = getResponseMsg(urlResponse);
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
    return new Error(err);
    
  }
};

const handleOptions = async (path, options,resultArr) => {
  if (options === undefined || (options.validate === false && options.stats === false)) {
    return await buildArr(path,resultArr);
  }

  if (options.validate === true && options.stats === true) {
    const file = await getFile(path);
    const allMatches = getAllLinks(file);
    const uniqueLinks = getUniqueLinks(file);
    const arrLinks = Array.from(uniqueLinks);
    let counter = 0;
    for (i = 0; i < arrLinks.length; i++) {
      const link = arrLinks[i];
      const urlResponse = await validateLink(link);
      if (200 !== urlResponse && 201 !== urlResponse) {
        counter++;
      }
    };  
    const bothArr = [{
      File: path,
      Total: allMatches.length,
      Unique: uniqueLinks.size,
      Broken: counter,
    }];
    return bothArr;
  }

  if (options.validate === true) {
    return await validateArr(path,resultArr);
  }

  if (options.stats === true) {
    const file = await getFile(path);
    const allMatches = getAllLinks(file);
    const uniqueLinks = getUniqueLinks(file);
    const statsArr = [{
      File: path,
      Total: allMatches.length,
      Unique: uniqueLinks.size,
    }];
    return statsArr;
  }
};

  const handleArrFiles = async (arrPath,options, resultArr) => {
  try {
   const arrPromises = arrPath.map(async (filePath) => {
     const obj = await handleOptions(filePath,options,resultArr);
     if (obj === undefined) { return [] };
return obj; 
});
return Promise.all(arrPromises)      
.then(results =>
  Promise.all(results.reduce((a, b) => a.concat(b), []))
)
    } catch (error) {
  console.log(error);
  }
}  

module.exports = {
  getResponseMsg,
  buildArr,
  validateArr, 
  handleOptions, 
  handleArrFiles
};
