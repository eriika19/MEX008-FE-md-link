const {
  handlePath
} = require('./utils/handle_path');

const {
  handleOptions,
 // handleArrFiles
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
 const firstPath = arrPath[0];
 console.log(firstPath);
 console.log(typeof firstPath);
     const  resultArr = [];


return await handleOptions(firstPath,options,resultArr); 

     }
  } catch (err) {
    console.log(err);
  }
};

mdLinks('./test/README_test.md', {
    validate: true,
    stats: true,
  })
  .then(result => console.log(result));

//mdLinks('./test/test_dir/test_3.md', {
 

module.exports.mdLinks;
