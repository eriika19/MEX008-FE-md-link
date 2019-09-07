const fs = require('fs');
const {
  isAbsolute,
  resolve,
  join
} = require('path');

const isMarkdownFile = (path) => path.endsWith('.md') || path.endsWith('.markdown');

const findMarkdownFiles = (path) => {
  try {
    return fs.statSync(path).isDirectory() ?
      fs
      .readdirSync(path)
      .reduce((ac, item) => ac.concat(findMarkdownFiles(join(path, item))), []) :
      isMarkdownFile(path) ? [path] : []
   } catch (err) {
    return new Error('path provided not found', err.message || err);
  }
}

const handleDir = async (path) => {
  const dirPath = isAbsolute(path) ? path : resolve(path);
  const pathsArr = await findMarkdownFiles(dirPath);
  return pathsArr;
}

const handlePath = async (path) => {
      if (!path) {
        return new Error('path was not provided');
      }
    
      if (typeof path !== 'string') {
        return new Error('path must be a string type');
      }
  
      const isMd = isMarkdownFile(path);
  
       if (isMd) {
           return path;
      } 

       if (!isMd) {
const pathsArr = await handleDir(path);
return pathsArr; 
      }  
  };

//   handlePath('./test/test_dir').then(e => console.log(e));

module.exports = {
  handlePath
};
