const { StatusCodes } = require('http-status-codes');

const { controller } = require('../../app/helpers/helper');
const service = require('./service');

const registration = {
  post: async (req, res) => {
    await controller.sendJson(res, async (connection)=> {
      return await service.registration.post(connection, req.options);
    }, StatusCodes.CREATED)
  }
};

const login = {
  post: async (req, res) => {
    await controller.sendJson(res, async (connection)=> {
      return await service.login.post(connection, req.options);
    })
  }
};

const logout = {
  post: async (req, res) => {
    await controller.sendJson(res, async (connection) => {
      return await service.logout.post(connection, req.user);
    });
  }
};

const forgotPassword = {
  post: async (req, res) => {
    await controller.sendJson(res, async (connection) => {
      return await service.forgotPassword.post(connection, req.options);
    });
  }
};

const verifyCode = {
  post: async (req, res) => {
    await controller.sendJson(res, async (connection) => {
      return await service.verifyCode.post(connection, req.options);
    });
  }
};

const updatePassword = {
  put: async (req, res) => {
    await controller.sendJson(res, async (connection) => {
      return await service.changePassword.put(connection, req.options);
    });
  }
};

module.exports = {
  registration,
  login,
  forgotPassword,
  updatePassword,
  logout,
  verifyCode
};
