# Markdown Links

> Este repositorio se desarrollo como una propuesta al siguiente [planteamiento](https://github.com/Laboratoria/MEX008-FE-md-link.git)

Encuentra y analiza los links dentro de un archivo markdown o de todos los archivo markdown dentro de un repositorio; con análisis de validación y y estadítisco.

## Índice

* [Instalación](#instalación)
* [Uso](#uso)
* [Dependencia Javascript](#dependencia-javascript)
* [CLI](#cli)
* [Extensiones soportadas](#extensiones-soportadas)
* [Estructuras/formatos de links soportados](#estructuras/formatos-de-links-soportados)
* [Demo](#demo)

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
  mdLinks('path/to/file.md', { stats: true}).then(result => {
  /*
    {
       Total: <#links_encontrados>
       Unique: <#links_únicos>
    }
   */
  });


  // Caso 2 .- Obtener estadísticas de links encontrados y links rotos
  mdLinks('path/to/file.md', { stats:true, validate: true}).then(result => {
  /*
    {
       Total: <#links_encontrados>
       Unique: <#links_únicos>
       Broken: <#links_rotos>
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
  **********  Validate  ***********
  File:    ./some/example.md
  Href:    http://algo.com/2/3/
  Text:    prototipo
  Line:    66
  Status:  ok
  Code:    200
  *******************************
  File:    ./some/example.md
  Href:    https://otra-cosa.net/algun-doc.html fail
  Text:    otra cosa
  Line:    78
  Status:  fail
  Code:    404
  *******************************
  Execution time: 861ms
  ```

- Añadir opción de estadísticas del archivo markdown `--stats`

  ```Bash
    $ md-links <path/to/directory> --stats
    File: <path/to/directory>
    Total: 3
    Unique: 3
  ```

- Validar los links del archivo markdown y obtner estadísticas `--vaidate` `--stats`

  ```Bash
    $ md-links <path/to/directory> --validate --stats
    File: <path/to/directory>
    Total: 3
    Unique: 3
    Broken: 1
  ```

## Extensiones soportadas

- [x] .md
- [x] .markdown

### Estructuras/formatos de links soportados

- Formatos básicos

  ```md
  [text](http://test.com)
  [text (parenthesis)](http://www.test.com)
  ```

## Demo

#### Ejemplo:
##### `validación de links de un archivo especificado`

![archivo](/img/md-links_file.png)



#### Ejemplo:
##### ` búsqueda de links de un folder especificado`

![archivo](/img/md-links_path.png)



#### Ejemplo:
##### ` validación y estadística de links de un folder especificado`


![archivo](/img/md-links_dir.png)


