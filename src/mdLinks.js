const {
  handlePath
} = require('./utils/handle_path');

const {
  handleOptions,
  handleArrFiles
} = require('./utils/index');


const mdLinks = async (path, options) => {
  try {
    const arrPath = await handlePath(path);
    if (typeof arrPath === 'string') {
      const resultArr = [];
      return await handleOptions(arrPath,options,resultArr);       
    }

    if (typeof arrPath === 'object') { 
 //return arrPath;  
     let resultArr = [];
return await handleArrFiles(path,options,resultArr); 

     }
  } catch (err) {
    console.log(err);
  }
};

mdLinks('./test/test_dir', {
    validate: true,
    stats: false,
  })
  .then(result => console.log(result));

module.exports.mdLinks;
