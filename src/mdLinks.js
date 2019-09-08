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

    if (Array.isArray(arrPath)) { 
      const resultArr = [];

      return await handleArrFiles(arrPath,options,resultArr);       

/*       const choicePath = arrPath[1];
      const resultArr = [];
      return await handleOptions(choicePath,options,resultArr); */
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

//mdLinks('./test/test_dir/test_3.md', {
 

module.exports.mdLinks;
