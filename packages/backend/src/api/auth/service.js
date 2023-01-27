const helper = require('../../app/helpers/helper');
const bcrypt = require('bcryptjs');

const registration = {
  post: async (connection, options) => {
    const findUser = await connection.Users.findOne({ where: { email: options.email } });

    if (findUser) {
      return helper.doom.error.emailAlreadyRegistered();
    }
    console.log('-----------')
    options.password = bcrypt.hashSync(options.password, 10);

    if (!options.email.split('@')[0].split('.').splice(2, 2).join('').includes('20')) {
      options.role = 'TEACHER';
    }

    await connection.Users.create({ ...options });

    return {
      success: true,
      result: {
        data: 'ok'
      }
    };
  }
};

const login = {
  post: async (connection, options) => {
    const user = await connection.Users.findOne({ where: { email: options.email } });

    if (!user) {
      return helper.doom.error.emailNotFound(options.email);
    }

    if (!bcrypt.compareSync(options.password, user.dataValues.password)) {
      return helper.doom.error.passwordNotValid();
    }

    options.access_token = helper.token.user.accessToken(user.dataValues.id, user.dataValues);

    return {
      success: true,
      result: options
    };
  }
};

const logout = {
  post: async (connection, user) => {
    await connection.Users.update(
      {
        accessToken: null
      },
      {
        where: { id: user.id }
      }
    );
    return {
      success: true,
      result: {
        message: 'Logout successfully.'
      }
    };
  }
};

const forgotPassword = {
  post: async (connection, options) => {
    const user = await connection.Users.findOne({ where: { email: options.email } });
    if (user) {
      const verificationCode = helper.mailer.generateVerifyCode();
      await connection.ForgotPasswords.create({
        code: verificationCode,
        user_id: user.dataValues.id
      });
      await helper.mailer.getMessage(options.email, verificationCode);
    }

    return {
      success: true,
      result: {
        result: 'На вашу електронну адресу надійшов лист з вказівками для скидання паролю.'
      }
    };
  }
};

const verifyCode = {
  post: async (connection, options) => {
    const user = await connection.Users.findOne({ where: { email: options.email } });

    const code = await connection.ForgotPasswords.findOne({
      where: { user_id: user.dataValues.id }
    });
    if (code === null) {
      return helper.doom.error.verificationCodeNotFound();
    }

    return {
      success: true,
      result: {
        result: 'Код скидання паролю успішно підтверджено.'
      }
    };
  }
};

const changePassword = {
  put: async (connection, options) => {
    const foundUser = await connection.Users.findOne({ where: { email: options.email } });
    if (!foundUser) {
      return helper.doom.error.accountNotFound();
    }

    if (options.newPassword !== options.repeatNewPassword) {
      return helper.doom.error.passwordNotConcur();
    }

    const newPassword = bcrypt.hashSync(options.newPassword, 10);

    await connection.Users.update(
      {
        password: newPassword
      },
      {
        where: {
          id: foundUser.dataValues.id
        }
      }
    );
    await connection.ForgotPasswords.destroy({ where: { user_id: foundUser.dataValues.id } });

    return {
      success: true,
      result: {
        result: 'Пароль успішно змінено.'
      }
    };
  }
};

module.exports = {
  registration,
  login,
  logout,
  forgotPassword,
  verifyCode,
  changePassword
};
