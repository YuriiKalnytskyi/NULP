const { controller } = require('../../app/helpers/helper');
const { StatusCodes } = require('http-status-codes');
const service = require('./service');

const getProfileInfo = {
  get: async (req, res) => {
    await controller.sendJson(
      res,
      async (connection) => {
        return await service.getProfileInfo.get(connection, req.user.id);
      },
      StatusCodes.CREATED
    );
  }
};

const changePassword = {
  put: async (req, res) => {
    await controller.sendJson(res, async (connection) => {
      return await service.changePassword.put(connection, req.options, req.user.id);
    });
  }
};

const deleteAccount = {
  delete: async (req, res) => {
    await controller.sendJson(res, async (connection) => {
      return await service.deleteAccount.delete(connection, req.options, req.user.id);
    });
  }
};

module.exports = {
  changePassword,
  getProfileInfo,
  deleteAccount
};
