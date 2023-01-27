const { StatusCodes } = require('http-status-codes');
const db = require('../../db/model/index');

async function sendJson(res, action, status = StatusCodes.OK) {
  let result = null;

  result = await action(db);

  if (db === null) {
    return res.status(StatusCodes.NOT_FOUND).json('No connection to the database.');
  }

  if (result?.success) {
    return res.status(status).json({
      ...result.result
    });
  } else {
    return res.status(result.statusCode).json({
      success: result.success,
      message: result.message,
      error: result.error,
      errorCode: result.errorCode
    });
  }
}

module.exports = {
  sendJson
};
