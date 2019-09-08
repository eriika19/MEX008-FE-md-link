const fs = require('fs');
const {
  isAbsolute,
  resolve,
  join
} = require('path');

const isMarkdownFile = (path) => path.endsWith('.md') || path.endsWith('.markdown');

const findMarkdownFiles = (path) => {
  try {
    const pathsArr = fs.statSync(path).isDirectory() ?
      fs.readdirSync(path).reduce((a, b) => a.concat(findMarkdownFiles(join(path, b))), []) :
      isMarkdownFile(path) ? [path] : []
      if (pathsArr.length < 1) {
    return new Error('path provided has no markdown files');        
      }
      return pathsArr;
   } catch (err) {
    return new Error('path provided not found', err.message || err);
  }
}

const handleDir = async (path) => {
  try {
    const dirPath = isAbsolute(path) ? path : resolve(path);
    const pathsArr = findMarkdownFiles(dirPath);
    if (Array.isArray(pathsArr) !== true) {
      console.log(pathsArr);
    }
   
    return pathsArr;
    
  } catch (error) {
    console.log(error);
  }
}

const handlePath = async (path) => {
  try {
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
    
  } catch (error) {
    console.log(error);

    
  }
  };

//   handlePath('./test/test_dir').then(e => console.log(e));

module.exports = {
  handlePath
};
