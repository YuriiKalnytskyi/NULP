// const { controller } = require('../../app/helpers/helper');
const models = require('../../db/model/index');

const registration = {
  post: async (req, res) => {
    await models.Users.create({
      ...req.options
    });

    return res.status(200).json('ok');
  }
};

const login = {
  post: async (req, res) => {

    return res.status(200).json('ok');
  }
};

const logout = {};

const forgotPassword = {};

const verifyCode = {};

const updatePassword = {};

module.exports = {
  registration,
  login,
  forgotPassword,
  updatePassword,
  logout,
  verifyCode
};
