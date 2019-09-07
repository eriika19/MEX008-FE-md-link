   return fs.readdirSync(path).reduce((ac, item) => ac.concat(findMarkdownFiles(join(path, item))), [])
   : isMarkdownFile(path)
   ? [path]
   : [];