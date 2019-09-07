const {
  handlePath
} = require('./utils/handle_path');

const {
  handleOptions
} = require('./utils/index');


const mdLinks = async (path, options) => {
  try {
    const arrPath = handlePath(path);
    if (typeof arrPath === 'string') {
      return result = await handleOptions(arrPath,options);       
    }

    if (typeof arrPath === 'object') {
      return arrPath;      
    }

  //  const result = [];
/*     for (i = 0; result.length !== arrPath.length; i++) {
      const pathFile = arrPath[i];
      const obj = await handleOptions(pathFile, options);
      result.push(obj);
    } */

   // return result;

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
