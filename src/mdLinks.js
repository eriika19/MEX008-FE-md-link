const { getFile, 
  getAllMatches, 
  getUniqueLinks, 
  validateLink,
  buildArr,
  validateArr
} = require('./utils/index');

const mdLinks = async (path, options) => {
    try {
      if (options === undefined) {
        return await buildArr(path);
      }

      if (options.validate === true && options.stats === true) {
        const file = await getFile(path);
        const allMatches = getAllMatches(file);
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
        return await validateArr(path);
      }
  
      if (options.stats === true) {
        const file = await getFile(path);
        const allMatches = getAllMatches(file);
        const uniqueLinks = getUniqueLinks(file);
        const statsArr = {
          Total: allMatches.length,
          Unique: uniqueLinks.size,
        };
        return statsArr;
      }
    } catch (err) {
      console.log(err);
    }
  };
    
  mdLinks('../test/README_test.md', {
      validate: true,
      stats: false,
    })
    .then(result => console.log(result));
  
  module.exports.mdLinks;