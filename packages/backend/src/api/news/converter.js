const helper = require('../../app/helpers/helper');

const news = {
  post: {
    text: (body) => {
      const text = [];
      for (const textKey in body) {
        if (textKey.includes('text')) {
          text.push({ [textKey]: body[textKey] });
        }
      }
      return text;
    },
    links: (body) => {
      const links = [];
      for (const textKey in body) {
        if (textKey.includes('link')) {
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

          const cloudImageUrl = await helper.cloudinary.uploadFile(oneFile);
          let url = cloudImageUrl.url.split('://');
          let res = 'https://' + url[1];
          images.push({ [fileKey]: res });
        }
        return images;
      } else {
        return [];
      }
    }
  }
};

module.exports = {
  news
};
