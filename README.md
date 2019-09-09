# Markdown Links

> Este repositorio esta se desarrollo como una solución al siguiente [plantemiento](https://github.com/Laboratoria/MEX008-FE-md-link.git)

Encuentra y analiza los links dentro de un archivo markdown o de todos los archivo markdown dentro de un repositorio; con análisis de validación y y estadítisco.

## Índice

* [Instalación](#instalación)
* [Uso](#uso)
* [Dependencia Javascript](#dependencia-javascript)
* [CLI](#cli)
* [Extensiones soportadas](#extensiones-soportadas)
* [Estructuras/formatos de links soportados](#estructuras/formatos-de-links-soportados)
***


## Instalación

para instalar globalmente

```Bash
$ npm install --g eriika19/md-links
```

para instalar como dependecia en un proyecto

```Bash
$ npm install eriika19/md-links
```

## Usos

### Dependencia Javascript

- Como dependencia requerida en javascript


```javascript
const mdLinks = require("mdLinks");
```

- Buscar archivos markdown

```javascript
// Caso 1 .- Ruta relativa
mdLinks("./some/example.md")
  .then(links => {
    // => [{ href, text, file }]
  })
  .catch(console.error);

// Caso 2 .- Ruta relativa absoluta
mdLinks("C://user/some/example.md")
  .then(links => {
    // => [{ href, text, file }]
  })
  .catch(console.error);

```

- Obtener estadísticas

  ```javascript

  // Caso 1 .- Obtener estadísticas de links encontrados
 
  mdLinks('path/to/file.md', { stats: true}).then(stats => {
  /*
    {
       Total: <#linksFound>
       Unique: <#linksUnique>
    }
   */
  });


  // Caso 2 .- Obtener estadísticas de links encontrados y links rotos
  mdLinks('path/to/file.md', { stats:true, validate: true}).then(stats => {
  /*
    {
       Total: <#linksFound>
       Unique: <#linksUnique>
       Broken: <#linksBroken>
    }
   */
  };
  ```

### CLI

- Uso básico

  ```Bash
  # archivo único
  md-links <path/to/file.md>

  # búsqueda de archivos markdown en un directorio
  md-links <path/to/directory>
  ```

- Añadir opción de validación `--validate`

  ```Bash
  $ md-links <path/to/directory> --validate
    ./some/example.md http://algo.com/2/3/ ok 200 Link a algo
    ./some/example.md https://otra-cosa.net/algun-doc.html fail 404 algún doc
    ./some/example.md http://google.com/ ok 301 Google
  ```

- Añadir opción de estadísticas del archivo markdown `--stats`

  ```Bash
  md-links <path/to/directory> --stats
    Total: 3
    Unique: 3
  ```

- Validar los links del archivo markdown y obtner estadísticas `--vaidate` `--stats`

  ```Bash
  md-links <path/to/directory> --validate --stats
    Total: 3
    Unique: 3
    Broken: 1
  ```

## Extensiones soportadas

- .md
- .markdown

### Estructuras/formatos de links soportados

- Formatos básicos

  ```md
  [text](http://test.com)
  [text (parenthesis)](http://www.test.com)
  ```



