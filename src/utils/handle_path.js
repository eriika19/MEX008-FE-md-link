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
      fs.readdirSync(path).reduce((a, b) => a.concat(findMarkdownFiles(join(path, b))), []) :
      isMarkdownFile(path) ? [path] : []

   } catch (err) {
    return new Error('path provided not found', err.message || err);
  }
}

const handleDir = (path) => {
  try {
    const dirPath = isAbsolute(path) ? path : resolve(path);
    const pathsArr = findMarkdownFiles(dirPath);

        if (pathsArr.length < 1) {
    console.log (new Error('path provided has no markdown files'));     
      }  

    return pathsArr;
    
  } catch (error) {
    console.log(error);
  }
}

const handlePath = (path) => {
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
const pathsArr = handleDir(path);
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
