const cloudinary = require('cloudinary').v2;
const path = require('path');
const DatauriParser = require('datauri/parser');
const config = require('./config.helper');

const { MIMETYPE_TO_EXTENSION_MATCHER } = require('./upload.mimetypes.helper');
const parser = new DatauriParser();

cloudinary.config({
  cloud_name: config.cloudinary.cloudinaryName,
  api_key: config.cloudinary.cloudinaryApiKey,
  api_secret: config.cloudinary.cloudinaryApiSecret
});

function uploadFile(file, folder = null) {
  const file64 = parser.format(path.extname(file.name).toString(), file.data);

  return cloudinary.uploader.upload(file64.content, { folder });
}

async function uploadRawFile(rawFile) {
  const arrData = await rawFile.arrayBuffer();
  const buffer = Buffer.from(arrData);
  const mimetype = rawFile.type;

  if (!MIMETYPE_TO_EXTENSION_MATCHER[mimetype]) {
    return console.log(`Got unknown photo mimetype: ${mimetype}`);
  }

  const file64 = parser.format(MIMETYPE_TO_EXTENSION_MATCHER[mimetype], buffer);
  return cloudinary.uploader.upload(file64.content);
}

module.exports = {
  uploadRawFile,
  uploadFile
};
