const fs = require('fs');
const util = require('util');
const { join, extname } = require('path');

const mkdir = util.promisify(fs.mkdir);

const writeFile = async (image, dirName) => {
  let dir = join(__dirname, `../uploadFiles`, dirName);

  await mkdir(dir, { recursive: true });

  let name = `${image.name}${Math.floor(Math.random() * 100) + 1}`;
  let pathToFile = join(dir, `${name}${Date.now()}${extname(image.name)}`);

  await image.mv(pathToFile);
  return pathToFile;
};

module.exports = {
  writeFile
};
