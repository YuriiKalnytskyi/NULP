const helper = require('../../app/helpers/helper');
const bcrypt = require('bcryptjs');

const getProfileInfo = {
  get: async (connection, userId) => {
    const user = await connection.Users.findOne({ where: { id: userId } });

    return {
      success: true,
      result: user.dataValues
    };
  }
};
const getNotification = {
  get: async (connection, userId) => {
    const notification = await connection.Notifications.findAll()

    return {
      success: true,
      result: { notification : notification }
    };
  }
};

const changePassword = {
  put: async (connection, options, userId) => {
    const user = await connection.Users.findOne({ where: { id: userId } });

    let incorrectPassword = bcrypt.compareSync(options.oldPassword, user.dataValues.password);
    if (!incorrectPassword) {
      return helper.doom.error.passwordNotConcur();
    }

    if (options.newPassword !== options.repeatNewPassword) {
      return helper.doom.error.passwordNotConcur();
    }

    const newPassword = bcrypt.hashSync(options.newPassword, 10);

    await connection.Users.update(
      { password: newPassword },
      {
        where: { id: userId }
      }
    );

    return {
      success: true,
      result: {
        result: 'Password changed successfully'
      }
    };
  }
};

const deleteAccount = {
  delete: async (connection, options, userId) => {
    const user = await connection.Users.findOne({ where: { id: userId } });

    let incorrectPassword = bcrypt.compareSync(options.password, user.password);
    if (!incorrectPassword) {
      return helper.doom.error.passwordNotConcur();
    }

    await connection.Users.destroy({ where: { id: userId } });

    return {
      success: true,
      result: {
        result: 'Account was successfully deleted'
      }
    };
  }
};

module.exports = {
  changePassword,
  getProfileInfo,
  deleteAccount,
  getNotification
};
