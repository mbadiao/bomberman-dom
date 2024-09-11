# bomberman-dom

# Table of Contents

- [**Description**](#description)
- [**Tech Stack**](#tech-stack)
    - [Languages](#languages)
    - [Development](#development)
    - [OS & Version Control](#os-version-control)
- [**Installation**](#installation)
  - [Cloning](#cloning)
  - [File System](#file-system)
  - [Running](#running)
- [**Usage**](#usage)
  - [GEDOM](#gedom)
    - [Virtual Node](#virtual-node)
    - [Router](#router)
    - [State](#state)
- [**Gameplay**](#gameplay)
- [**Aknowledgements**](#aknowledgements)
  - [Contributors](#contributors)
  - [Peers](#peers)
  - [Testers](#testers)
  - [Auditors](#auditors)
- [**Sources**](#sources)
- [**License**](#license)

## Description

###### [_Table of Contents ⤴️_](#table-of-contents)

## Tech Stack

### Languages

Click on badges to get to the code...

[![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)]()
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)]()
[![JAVASCRIPT](https://img.shields.io/badge/JavaScript-323330?style=for-the-badge&logo=javascript&logoColor=F7DF1E)]()
[![GO](https://img.shields.io/badge/Go-00ADD8?style=for-the-badge&logo=go&logoColor=white)]()

### Development

[![SHELL SCRIPT](https://img.shields.io/badge/Shell_Script-121011?style=for-the-badge&logo=gnu-bash&logoColor=white)](./gitify.sh)
[![MARKDOWN](https://img.shields.io/badge/Markdown-000000?style=for-the-badge&logo=markdown&logoColor=white)](#table-of-contents)

### OS & Version Control

[![GITHUB](https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white)](https://github.com)

###### [_Table of Contents ⤴️_](#table-of-contents)

## Installation

### Cloning

```bash
$ git clone http://learn.zone01dakar.sn/git/jefaye/bomberman-dom
$ cd bomberman-dom/
```
### File System

    .
    ├── public
    │   ├── assets
    │   │   ├── avatar
    │   │   │   ├── actor.png
    │   │   │   ├── ennemi.png
    │   │   │   └── money.png
    │   │   ├── bomb
    │   │   │   └── bomb.png
    │   │   ├── map
    │   │   │   ├── bloc.png
    │   │   │   └── mur.png
    │   │   ├── soundEffect
    │   │   │   ├── sound_bomb.mp3
    │   │   │   └── title-screen.mp3
    │   │   ├── bumberman.png
    │   │   ├── images-removebg-preview.png
    │   │   └── mainbg.jpeg
    │   ├── src
    │   │   ├── components
    │   │   │   ├── avatar.js
    │   │   │   ├── bomb.js
    │   │   │   ├── grid.js
    │   │   │   └── powerUp.js
    │   │   ├── core
    │   │   │   ├── node.js
    │   │   │   ├── router.js
    │   │   │   └── state.js
    │   │   ├── interface
    │   │   │   ├── barreScore.js
    │   │   │   ├── menuPause.js
    │   │   │   └── sound.js
    │   │   ├── utils
    │   │   │   └── viewport.js
    │   │   └── app.js
    │   ├── index.css
    │   └── index.html
    ├── audit.todo
    ├── gitify.sh
    ├── go.mod
    ├── LICENSE
    ├── main.go
    └── README.md

    11 directories, 31 files


### Running

###### [_Table of Contents ⤴️_](#table-of-contents)

## Usage

### GEDOM

_GEDOM_ is a framework-like tool that is meant to be used in any web application to simplify **DOM Manipulation**. It uses the concept of **DOM Abstraction** to create web components without having to use all those DOM methods. As an example, _GEDOM_ will be use to create a basic [**TodoMVC**](https://todomvc.com/) web application.

#### [Virtual Node](./public/src/core/node.js)

The Virtual Node is a class that generates a component, given a 'properties' object as arguments.  
Basically, the properties object would be in this configuration:

```js
  const properties = {
    tag: /* HTML tag name (default: 'div') */ ,
    attrs: {
      // attribute: value
      // ...
    },
    content: /* custom text content */ ,
    listeners: {
      // event: callback function
      // ...
    },
    children: [
      // Virtual Node || Properties object
      // ...
    ]
  }
```

Calling the **render()** method on an instance of a Virtual Node will **create the element** through the tag field value, then **set attributes, content and listeners**, then **add all given children** and finally **return** the created element that can now be append to any element of the **DOM**.

###### [_Table of Contents ⤴️_](#table-of-contents)


#### [Router](./public/src/core/router.js)

###### [_Table of Contents ⤴️_](#table-of-contents)


#### [State](./public/src/core/state.js)

###### [_Table of Contents ⤴️_](#table-of-contents)

## Gameplay

###### [_Table of Contents ⤴️_](#table-of-contents)

## Aknowledgements

### Contributors

[![fakeita](https://img.shields.io/badge/Zone01-fakeita-yellow)](http://learn.zone01dakar.sn/git/fakeita)
[![aliouniang](https://img.shields.io/badge/Zone01-aliouniang-yellow)](http://learn.zone01dakar.sn/git/aliouniang)
[![mamadbah](https://img.shields.io/badge/Zone01-mamadbah-yellow)](http://learn.zone01dakar.sn/git/mamadbah)
[![jefaye](https://img.shields.io/badge/Zone01-jefaye-yellow)](http://learn.zone01dakar.sn/git/jefaye)

### Peers

[![](https://img.shields.io/badge/Zone01-green)](http://learn.zone01dakar.sn/git/)

### Testers

[![](https://img.shields.io/badge/Zone01-green)](http://learn.zone01dakar.sn/git/)

### Auditors

[![](https://img.shields.io/badge/Zone01-green)](http://learn.zone01dakar.sn/git/)
[![](https://img.shields.io/badge/Zone01-green)](http://learn.zone01dakar.sn/git/)
[![](https://img.shields.io/badge/Zone01-green)](http://learn.zone01dakar.sn/git/)
[![](https://img.shields.io/badge/Zone01-green)](http://learn.zone01dakar.sn/git/)
[![](https://img.shields.io/badge/Zone01-green)](http://learn.zone01dakar.sn/git/)

###### [_Table of Contents ⤴️_](#table-of-contents)

## Sources

###### [_Table of Contents ⤴️_](#table-of-contents)

## License