const { StatusCodes } = require('http-status-codes');

const errorCode = {
  // Wrong data. To send the correct data you need to use the documentation.
  validation: 100,

  // The token in the request was not found.
  tokenNotFound: 110,

  // The token in the request is not correct.
  tokenNotValid: 111,

  // Token lifetime expired.
  tokenExpired: 112,

  /**
   * This email has already been registered.
   * Therefore, we can not register it twice.
   * So, as it is already in our database.
   */
  emailAlreadyRegistered: 120,

  // This email is not found in the database.
  emailNotFound: 121,

  // Password does not match email.
  passwordNotValid: 130,

  // User account was not found.
  accountNotFound: 140,

  // User password was dont match.
  passwordDontMatch: 150,

  // User verification code was not found.
  verificationCodeNotFound: 160,

  // User password not concur.
  passwordNotConcur: 170,

  // User dont have admin rights.
  adminRights: 180,

  // PaymentsInvalid
  paymentsInvalid: 190,

  // paymentsTimeOff
  paymentsTimeOff: 191
};

const error = {
  validation: (res, error) => {
    return res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({
      success: false,
      message: error.message.replace(/"/g, ''),
      error: 'Bad request',
      errorCode: errorCode.validation
    });
  },

  passwordDontMatch: (res) => {
    return res.status(StatusCodes.NOT_FOUND).json({
      statusCode: StatusCodes.NOT_FOUND,
      success: false,
      message: 'Паролі не збігаються',
      error: 'Bad request',
      errorCode: errorCode.validation
    });
  },

  tokenNotFound: () => {
    return {
      success: false,
      message: 'To pass the identification, we need a token.',
      error: 'Token not found',
      errorCode: errorCode.tokenNotFound
    };
  },

  tokenNotValid: (res) => {
    return res.status(StatusCodes.UNAUTHORIZED).json({
      success: false,
      message: 'Token failed validation.',
      error: 'Unauthorized access',
      errorCode: errorCode.tokenNotValid
    });
  },

  tokenExpired: (res) => {
    return res.status(StatusCodes.UNAUTHORIZED).json({
      success: false,
      message: 'Token lifetime expired.',
      error: 'Unauthorized access',
      errorCode: errorCode.tokenExpired
    });
  },

  emailAlreadyRegistered: () => {
    return {
      statusCode: StatusCodes.CONFLICT,
      success: false,
      message: 'This email is already registered.',
      error: 'Conflict',
      errorCode: errorCode.emailAlreadyRegistered
    };
  },

  emailNotFound: (email) => {
    return {
      statusCode: StatusCodes.UNAUTHORIZED,
      success: false,
      message: `This email: '${email}' is not found.`,
      error: 'Access Denied',
      errorCode: errorCode.emailNotFound
    };
  },

  passwordNotValid: () => {
    return {
      statusCode: StatusCodes.UNAUTHORIZED,
      success: false,
      message: 'Password is not valid.',
      error: 'Access Denied',
      errorCode: errorCode.passwordNotValid
    };
  },

  accountNotFound: () => {
    return {
      statusCode: StatusCodes.NOT_FOUND,
      success: false,
      message: 'Account was not found.',
      error: 'Account not found',
      errorCode: errorCode.accountNotFound
    };
  },

  verificationCodeNotFound: () => {
    return {
      statusCode: StatusCodes.NOT_FOUND,
      success: false,
      message: 'Verification code not found.',
      error: 'Code not found',
      errorCode: errorCode.verificationCodeNotFound
    };
  },

  passwordNotConcur: () => {
    return {
      statusCode: StatusCodes.CONFLICT,
      success: false,
      message: 'Паролі не збігаються.',
      error: 'password not concur',
      errorCode: errorCode.passwordNotConcur
    };
  },

  adminRights: (res) => {
    return res.status(StatusCodes.CONFLICT).json({
      success: false,
      message: 'У вас немає прав адміністратора.',
      error: 'You dont have administrator rights',
      errorCode: errorCode.adminRights
    });
  },

  paymentsInvalid: () => {
    return {
      statusCode: StatusCodes.CONFLICT,
      success: false,
      message: 'Щоб авторизуватись вам потрібно оплатити',
      error: 'Щоб авторизуватись вам потрібно оплатити',
      errorCode: errorCode.paymentsInvalid
    };
  },

  paymentsTimeOff: (url) => {
    return {
      statusCode: StatusCodes.CONFLICT,
      success: false,
      message: `${url}`,
      error: 'У вас закінчилась підписка, оплатіть щоб продовжити її.',
      errorCode: errorCode.paymentsTimeOff
    };
  }
};

module.exports = {
  errorCode,
  error
};
