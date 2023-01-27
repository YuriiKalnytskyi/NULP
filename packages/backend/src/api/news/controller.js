const { controller } = require('../../app/helpers/helper');
const { StatusCodes } = require('http-status-codes');
const service = require('./service');

const getNews = {
  get: async (req, res) => {
    await controller.sendJson(
      res,
      async (connection) => {
        return await service.getNews.get(connection);
      },
      StatusCodes.CREATED
    );
  }
};

const addNews = {
  put: async (req, res) => {
    await controller.sendJson(res, async (connection) => {
      return await service.addNews.put(connection, req);
    });
  }
};

const deleteNews = {
  delete: async (req, res) => {
    await controller.sendJson(res, async (connection) => {
      return await service.deleteNews.delete(connection, req.options);
    });
  }
};

module.exports = {
  getNews,
  addNews,
  deleteNews
};
