const converter = require('./converter');

const getNews = {
  get: async (connection) => {
    const news = await connection.News.findAll();

    return {
      success: true,
      result: {
        news: news
      }
    };
  }
};

const addNews = {
  put: async (connection, req) => {
    let text = await converter.news.post.text(req.body);
    let images = await converter.news.post.images(req.files);
    let links = await converter.news.post.links(req.body);

    await connection.News.create({
      title: req.body.title,
      description: { text, images, links }
    });

    return {
      success: true,
      result: {
        message: 'Teaching successfully created'
      }
    };
  }
};

const deleteNews = {
  delete: async (connection, options) => {
    await connection.News.destroy({ where: { id: options.newsId } });

    return {
      success: true,
      result: {
        result: 'Teaching was successfully deleted'
      }
    };
  }
};

module.exports = {
  getNews,
  addNews,
  deleteNews
};
