const helper = require('../../app/helpers/helper');

const addSignal = {
  post: {
    signal: (signal) => {
      return {
        id: signal.id,
        pairName: signal.pair_name,
        condition: signal.condition,
        enterPrice: signal.enter_price
      };
    }
    // take: (takes) => {
    //     return {
    //         'id': takes.id,
    //         'take': clubData.pair_name,
    //         'condition': clubData.condition,
    //         'enterPrice': clubData.enter_price,
    //     }
    // },
    // stopLoss: (stopLoss) => {
    //     return {
    //         'id': stopLoss.id,
    //         'pairName': clubData.pair_name,
    //         'condition': clubData.condition,
    //         'enterPrice': clubData.enter_price,
    //     }
    // },
  }
};

const userDevices = {
  get: (devices) => {
    const iosTokens = [];
    const androidTokens = [];

    devices.forEach((value) => {
      if (value.device_token && value.device_token.platform === 'ios') {
        iosTokens.push(value.device_token.token);
      } else if (value.device_token && value.device_token.platform === 'android') {
        androidTokens.push(value.device_token.token);
      }
    });
    return { iosTokens, androidTokens };
  }
};
const teaching = {
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
  addSignal,
  userDevices,
  teaching
};
