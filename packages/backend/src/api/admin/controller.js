const { controller } = require('../../app/helpers/helper');
const { StatusCodes } = require('http-status-codes');
const service = require('./service');


const addNotification = {
  post: async (req, res) => {
    await controller.sendJson(
      res,
      async (connection) => {
        return await service.addNotification.post(connection, req.options);
      },
      StatusCodes.CREATED
    );
  }
};



module.exports = {
  addNotification,
};
