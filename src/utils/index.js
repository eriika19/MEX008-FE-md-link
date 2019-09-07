const {
    getFile, 
    getAllLinks, 
    getUniqueLinks, 
    getLinkText,
    getLinkLine,
    validateLink
      } = require('./get_links.js');

      const {
handlePath
          } = require('./handle_path.js');


  const getResponseMsg = async (response) => {
  if (response !== 200) {
    return 'fail';
  } else {
    return 'ok';
  };
};

const buildArr = async (path, resultArr) => {
  try {
    const file = await getFile(path);
    const arrLinks = getLinkText(file);
    //const resultArr = [];
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

const validateArr = async (path, resultArr) => {
  try {
    const file = await getFile(path);
    const arrLinks = getLinkText(file);
    //const resultArr = [];
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

const handleOptions = async (path, options,resultArr) => {
  if (options === undefined) {
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
      if (200 !== urlResponse) {
        counter++;
      }
    };  
    const bothArr = {
      Total: allMatches.length,
      Unique: uniqueLinks.size,
      Broken: counter,
    };
    return bothArr;
  }

  if (options.validate === true) {
    return await validateArr(path,resultArr);
  }

  if (options.stats === true) {
    const file = await getFile(path);
    const allMatches = getAllLinks(file);
    const uniqueLinks = getUniqueLinks(file);
    const statsArr = {
      Total: allMatches.length,
      Unique: uniqueLinks.size,
    };
    return statsArr;
  }
};

 const handleArrFiles = async (path,options, resultArr) => {
  try {
    const arrPath = await handlePath(path);
return arrPath;

/*     const firstPath = arrPath[0];
    const firstresult = await handleOptions(firstPath,options,resultArr);
    return firstresult; */
/*for (let index = 1; i < arrFiles.length; index++) {
  const indexPath = arrFiles[index];
  const indexresult = await handleOptions(indexPath,options,resultArr); 
  indexresult.forEach(element => {
    firstresult.push(element);
  });
}
return firstresult;  */
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
