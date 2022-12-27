const { writeFile } = require("../../../utils/fileUploader");

const teaching = {
  post: {
    text: (body) => {
      const text = [];
      for (const textKey in body) {
        if (textKey.includes("text")) {
          text.push({ [textKey]: body[textKey] });
        }
      }
      return text;
    },
    links: (body) => {
      const links = [];
      for (const textKey in body) {
        if (textKey.includes("link")) {
          links.push({ [textKey]: body[textKey] });
        }
      }
      return links;
    },
    images: async (files) => {
      if (files) {
        const images = [];
        for (const fileKey in files) {
          const oneFile = files[fileKey];
          const path = await writeFile(oneFile, "teachingPhotos");
          images.push({ [fileKey]: path });
        }
        return images;
      } else {
        return [];
      }
    }

  }
};


module.exports = {
  teaching
};
