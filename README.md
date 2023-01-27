# A simple program for studying material (methodology, books, etc.) and viewing news

## Prerequisites
- node.js
- npm package manager
- git
- docker


## Installation
Clone this repository and install node modules
```sh
$ git clone https://github.com/YuriiKalnytskyi/NULP.git
$ cd NULP
$ npm install
```

install node modules BE
```sh
$ cd packages/backend
$ npm install
```

install node modules FE
```sh
$ cd packages/frontend
$ npm install
```

## Available Scripts

In the project directory, you can run:

### `npm run start:local`

Docker must be running or sudo must be added in packages/local-db in package.json

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

### `npm run format:check`

Checks the software code for compliance with the specified standards

### `npm run format:fix`

Gives the program code of the specified standards

### `npm run lint:check`

Checks the software code for compliance with the specified standards
