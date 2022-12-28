const { controller } = require("../../app/helpers/helper");
const { StatusCodes } = require("http-status-codes");
const service = require("./service");

const getTeaching = {
  get: async (req, res) => {
    await controller.sendJson(res, async (connection) => {
      return await service.getTeaching.get(connection);
    }, StatusCodes.CREATED);
  }
};

const addTeaching = {
  put: async (req, res) => {
    await controller.sendJson(res, async (connection) => {
      return await service.addTeaching.put(connection, req);
    });
  }
};

const deleteTeaching = {
  delete: async (req, res) => {
    await controller.sendJson(res, async (connection) => {
      return await service.deleteTeaching.delete(connection, req.options);
    });
  }
};


module.exports = {
  getTeaching,
  addTeaching,
  deleteTeaching
};
