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
/*    const choicePath = arrPath[0];
      console.log(choicePath);
      const resultArr = [];
      return await handleOptions(choicePath,options,resultArr); */ 
     }
  } catch (err) {

 console.log(err);
  }
};

mdLinks('./test/test_dir',  {
    validate: false,
    stats: false,
  })
  .then(result => console.log(result));
