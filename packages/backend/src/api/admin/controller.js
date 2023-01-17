const { controller } = require('../../app/helpers/helper');
const { StatusCodes } = require('http-status-codes');
const service = require('./service');

const addSignal = {
  post: async (req, res) => {
    await controller.sendJson(
      res,
      async (connection) => {
        return await service.addSignal.post(connection, req.options);
      },
      StatusCodes.CREATED
    );
  }
};

const takes = {
  post: async (req, res) => {
    await controller.sendJson(
      res,
      async (connection) => {
        return await service.takes.post(connection, req.options);
      },
      StatusCodes.CREATED
    );
  },
  put: async (req, res) => {
    await controller.sendJson(
      res,
      async (connection) => {
        return await service.takes.put(connection, req.options);
      },
      StatusCodes.CREATED
    );
  }
};

const stopLoss = {
  post: async (req, res) => {
    await controller.sendJson(
      res,
      async (connection) => {
        return await service.stopLoss.post(connection, req.options);
      },
      StatusCodes.CREATED
    );
  },
  put: async (req, res) => {
    await controller.sendJson(
      res,
      async (connection) => {
        return await service.stopLoss.put(connection, req.options);
      },
      StatusCodes.CREATED
    );
  }
};

const closeSignal = {
  post: async (req, res) => {
    await controller.sendJson(
      res,
      async (connection) => {
        return await service.closeSignal.post(connection, req.options);
      },
      StatusCodes.CREATED
    );
  }
};

const news = {
  post: async (req, res) => {
    await controller.sendJson(
      res,
      async (connection) => {
        return await service.news.post(connection, req.options);
      },
      StatusCodes.CREATED
    );
  },
  delete: async (req, res) => {
    await controller.sendJson(
      res,
      async (connection) => {
        return await service.news.delete(connection, req.options);
      },
      StatusCodes.CREATED
    );
  }
};

const teaching = {
  post: async (req, res) => {
    await controller.sendJson(
      res,
      async (connection) => {
        return await service.teaching.post(connection, req);
      },
      StatusCodes.CREATED
    );
  },
  delete: async (req, res) => {
    await controller.sendJson(
      res,
      async (connection) => {
        return await service.teaching.delete(connection, req.options);
      },
      StatusCodes.CREATED
    );
  }
};

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

const addOnePayments = {
  post: async (req, res) => {
    await controller.sendJson(
      res,
      async (connection) => {
        return await service.addOnePayments.post(connection, req.options);
      },
      StatusCodes.CREATED
    );
  }
};

// *************************************** ACADEMY *******************************************

const addLesson = {
  post: async (req, res) => {
    await controller.sendJson(
      res,
      async (connection) => {
        return await service.addLesson.post(connection, req.options);
      },
      StatusCodes.CREATED
    );
  }
};

const addHomework = {
  post: async (req, res) => {
    await controller.sendJson(
      res,
      async (connection) => {
        return await service.addHomework.post(connection, req);
      },
      StatusCodes.CREATED
    );
  }
};

const reviewHomework = {
  post: async (req, res) => {
    await controller.sendJson(
      res,
      async (connection) => {
        return await service.reviewHomework.post(connection, req.options);
      },
      StatusCodes.CREATED
    );
  }
};

const addMethodology = {
  post: async (req, res) => {
    await controller.sendJson(
      res,
      async (connection) => {
        return await service.addMethodology.post(connection, req);
      },
      StatusCodes.CREATED
    );
  }
};

module.exports = {
  addSignal,
  takes,
  stopLoss,
  closeSignal,
  news,
  teaching,
  addNotification,
  addOnePayments,
  addHomework,
  addMethodology,
  addLesson,
  reviewHomework
};
