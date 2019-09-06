const getFile = require ('getFile');
//const getLinkText = require ('getLinkText');
const getAllMatches = require ('getAllMatches');
const getUniqueLinks = require ('getUniqueLinks');
//const getLinkLine = require ('getLinkLine');
const validateLink = require ('validateLink');
const buildArr = require ('buildArr');
const validateArr = require ('validateArr');

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
    
  mdLinks('./src/utils/README_test.md', {
      validate: true,
      stats: false,
    })
    .then(result => console.log(result));
  
  module.exports.mdLinks;