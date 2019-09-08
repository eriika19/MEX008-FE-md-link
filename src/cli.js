#!/usr/bin/env node

const minimist = require('minimist');
const package = require('../package');
const mdLinks = require('./mdLinks');

const start = new Date();

const error = (err) => {
  console.error(err.errorInfo || err)
  console.error(`Try "${package.name} --help" to see available commands and options`)
  process.exit(1)
};

const help = () => {
  return `
      Usage: 
         ${package.name} path [options]
    
      Path supported:
        /path/to/dir          absolute path to a folder
        /path/to/file.md      absolute path to a file
        ./relative/file.md    relative path to a file
        relative/dir          relative path to a folder
    
      Options:
        --validate        Verify if links are broken
        --stats           Show stats about markdown links with the structure [text](href) found {total: number unique: number} and
                          when validate option is also provided it's gonna show the number of broken links
        -h, --help        Show help
        -v, --version     Show version
        `;
}

const {_: args, ... } = minimist(process.argv.slice(2));

const options = {
  validate: Boolean(opts.validate),
  stats: Boolean(opts.stats)
};

if (opts.v || opts.version) {
  console.info(package.version)
  process.exit(0)
}

if (opts.h || opts.help) {
  console.info(help())
  process.exit(0)
}


mdLinks(args[0], options)
  .then(mdLink => {
    if (options.stats && !options.validate) {
      //const statsArr = mdLink;      
      console.info('/*********   Stats   *********');
      mdLink.forEach(obj => {
        console.info('  Total: ', obj.total)
        console.info('  Unique: ', obj.unique)
      });
      console.info('******************************/')
    };

    if (options.stats && options.validate) {
      //const statsArr = mdLink;      
      console.info('*******  Validate/Stats  *******');
      mdLink.forEach(obj => {
        console.info('  Total:  ', obj.total)
        console.info('  Unique: ', obj.unique)
        console.info('  Broken: ', obj.broken)
      });
      console.info('*******************************')
    }

    if (options.validate && !options.stats) {
      //const statsArr = mdLink;      
      console.info('*********  Validate  *********');
      mdLink.forEach(obj => {
        if (obj.error === true) {
          console.info('  File:   ', obj.file)
          console.info('  Links:  ', obj.links)
          console.info('  Info:   ', obj.info)
        } else {
          console.info('  File:   ', obj.file)
          console.info('  Href:   ', obj.href)
          console.info('  Text:   ', obj.text)
          console.info('  Line:   ', obj.line)
          console.info('  Status: ', obj.status)
          console.info('  Code:   ', obj.statusCode)
        }
      });
      console.info('*******************************')
    };

    if (!options.validate && !options.stats) {
      //const statsArr = mdLink;      
      console.info('*********   md-links  *********');
      mdLink.forEach(obj => {
        if (obj.error === true) {
          console.info('  File:   ', obj.file)
          console.info('  Links:  ', obj.links)
          console.info('  Info:   ', obj.info)
        } else {
          console.info('  File:   ', obj.file)
          console.info('  Href:   ', obj.href)
          console.info('  Text:   ', obj.text)
          console.info('  Line:   ', obj.line)
        }
      });
      console.info('*******************************')
    };

    // Execution time
    console.info('Execution time: %dms', new Date() - start)
    process.exit(0)
  })
  .catch(error);
