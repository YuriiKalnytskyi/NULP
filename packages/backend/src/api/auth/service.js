const helper = require('../../app/helpers/helper');
const converter = require('./converter');
const sql = require('./sql');
const bcrypt = require('bcryptjs');
const { v4: uuid } = require('uuid');

const admins = [
  'test@gmail.com',
  'test7152@gmail.com',
  'yra6920@gmail.com',
  'andriyhrytsay@gmail.com',
  'voznikevicho@gmail.com',
  'chumapavlo@gmail.com',
  'sw3zy777@gmail.com',
  'y.kryvyak92@gmail.com',
  'gegr2607@gmail.com',
  'Nazar.denkovich@icloud.com',
  'maksym0416@gmail.com',
  'dslavskyi@icloud.com',
  'Dkryviakk@gmail.com'
];

const registration = {
  post: async (connection, options) => {
    let foundUser = await sql.common.findUser(connection, options.email);
    if (foundUser) {
      return helper.doom.error.emailAlreadyRegistered();
    }
    if (options.password !== options.repeatPassword) {
      return helper.doom.error.passwordDontMatch();
    }

    const orderId = await uuid();
    options.password = bcrypt.hashSync(options.password, 10);
    let user = await sql.registration.post.addUser(connection, options, orderId);
    let userData = await converter.registration.post(user);

    if (admins.includes(options.email)) {
      return {
        success: true,
        result: {
          userData: userData
        }
      };
    }

    // const { checkout_url } = await helper.payments.addPay(orderId, 'UKRTRADER ВСТУП', 'UAH', 100, options.email);

    return {
      success: true,
      result: {
        userData: userData
        // 'paymentUrl': checkout_url ,
      }
    };
  }
};

const login = {
  post: async (connection, options) => {
    let user = await sql.common.findUser(connection, options.email);
    if (user === null) {
      return helper.doom.error.emailNotFound(options.email);
    }

    let incorrectPassword = !bcrypt.compareSync(options.password, user.password);
    if (incorrectPassword) {
      return helper.doom.error.passwordNotValid();
    }

    // switch (user.start_payments) {
    //     case false:
    //         const checkFirstPayments = await helper.payments.checkPay(user.first_order_id);
    //         if (checkFirstPayments.order_status !== 'approved') {
    //             const { checkout_url } = await helper.payments.addPay(options.email, 'UKRTRADER ВСТУП', 'UAH', 100);
    //             return helper.doom.error.paymentsTimeOff(checkout_url);
    //         }
    //         await sql.payments.post.updateUser(connection, options.email);
    //
    //         const paymentsToken = helper.token.user.paymentsToken(user.id, options.email);
    //         await sql.payments.post.addPaymentsTokenAndOrderId(connection, options.email, paymentsToken, user.id);
    //         break;
    //     case true:
    //         const { order_id, payments_token } = await sql.payments.get.getPaymentsToken(connection, user.id)
    //         if (payments_token) {
    //             let decodeToken = await helper.token.decodeToken(payments_token);
    //             if (decodeToken !== true) {
    //                 const orderId = await uuid();
    //                 const {
    //                     checkout_url,
    //                     orderIdFinal
    //                 } = await helper.payments.addPay(orderId, 'UKRTRADER ПРОДОВЖЕННЯ ПІДПИСКИ', 'UAH', 150);
    //                 await sql.payments.post.updateOrderIdAndDeleteToken(connection, orderIdFinal, user.id);
    //                 return helper.doom.error.paymentsTimeOff(checkout_url);
    //
    //             }
    //         } else if (payments_token === null) {
    //             const checkFirstPayments = await helper.payments.checkPay(order_id);
    //             if (checkFirstPayments.order_status !== 'approved') {
    //                 const {
    //                     checkout_url,
    //                     orderIdFinal
    //                 } = await helper.payments.addPay(order_id, 'UKRTRADER ПРОДОВЖЕННЯ ПІДПИСКИ', 'UAH', 150);
    //                 await sql.payments.post.updateOrderIdAndDeleteToken(connection, orderIdFinal, user.id);
    //                 return helper.doom.error.paymentsTimeOff(checkout_url);
    //             }
    //             const paymentsToken = helper.token.user.paymentsToken(user.id, order_id);
    //             await sql.payments.post.addPaymentsTokenAndOrderId(connection, order_id, paymentsToken, user.id);
    //         }
    //         break
    // }

    if (!admins.includes(options.email)) {
      if (user.start_payments === false) {
        const checkFirstPayments = await helper.payments.checkPay(user.first_order_id);
        if (checkFirstPayments.order_status !== 'approved') {
          const newOrderId = await uuid();
          const { checkout_url } = await helper.payments.addPay(
            newOrderId,
            'UKRTRADER ВСТУП',
            'UAH',
            100,
            options.email
          );
          await sql.payments.post.updateOrderId(connection, options.email, newOrderId);
          return helper.doom.error.paymentsTimeOff(checkout_url);
        }
        await sql.payments.post.updateUser(connection, options.email);
        const paymentsToken = helper.token.user.paymentsToken(
          user.id,
          user.first_order_id,
          helper.config.JWT.lifetime.paymentsToken
        );
        await sql.payments.post.addPaymentsTokenAndOrderId(
          connection,
          user.first_order_id,
          paymentsToken,
          user.id
        );
      }
      if (user.start_payments === true) {
        const result = await sql.payments.get.getPaymentsToken(connection, user.id);
        if (result === null) {
          const paymentsToken = helper.token.user.paymentsToken(
            user.id,
            user.first_order_id,
            helper.config.JWT.lifetime.paymentsToken
          );
          await sql.payments.post.addPaymentsTokenAndOrderId(
            connection,
            user.first_order_id,
            paymentsToken,
            user.id
          );
        }
      }
      if (user.start_payments === true) {
        const { order_id, payments_token } = await sql.payments.get.getPaymentsToken(
          connection,
          user.id
        );
        if (payments_token) {
          let decodeToken = await helper.token.decodeToken(payments_token);
          if (decodeToken !== true) {
            const orderId = await uuid();
            const { checkout_url } = await helper.payments.addPay(
              orderId,
              'UKRTRADER ПРОДОВЖЕННЯ ПІДПИСКИ',
              'UAH',
              150,
              options.email
            );
            await sql.payments.post.updateOrderIdAndDeleteToken(connection, orderId, user.id);
            return helper.doom.error.paymentsTimeOff(checkout_url);
          }
        } else if (payments_token === null) {
          const checkFirstPayments = await helper.payments.checkPay(order_id);
          if (checkFirstPayments.order_status !== 'approved') {
            const newOrderId = await uuid();
            const { checkout_url } = await helper.payments.addPay(
              newOrderId,
              'UKRTRADER ПРОДОВЖЕННЯ ПІДПИСКИ',
              'UAH',
              150,
              options.email
            );
            await sql.payments.post.updateOrderIdAndDeleteToken(connection, newOrderId, user.id);
            return helper.doom.error.paymentsTimeOff(checkout_url);
          }
          const paymentsToken = helper.token.user.paymentsToken(
            user.id,
            order_id,
            helper.config.JWT.lifetime.paymentsToken
          );
          await sql.payments.post.addPaymentsTokenAndOrderId(
            connection,
            order_id,
            paymentsToken,
            user.id
          );
        }
      }
    }
    options.access_token = helper.token.user.accessToken(
      user.id,
      admins.includes(options.email) ? process.env.ADMIN_TYPE : process.env.USER_TYPE,
      user
    );
    options.refresh_token = helper.token.user.refreshToken(user.id);

    if (options.deviceToken) {
      await sql.login.post.updateUserAddDeviceToken(connection, user.id, options);
      switch (options.deviceToken.platform) {
        case 'ios':
          await helper.pushNotification.sendPushNotification(
            [options.deviceToken.token],
            'Вітаємо в нашому клубі UKRTRADER'
          );
          break;
        case 'android':
          await helper.pushNotification.sendPushNotificationAndroid(
            [options.deviceToken.token],
            'Вітаємо в нашому клубі UKRTRADER'
          );
          break;
      }
    } else {
      await sql.login.post.updateUser(connection, user.id, options);
    }

    let result = converter.login.post(options);

    return {
      success: true,
      result: result
    };
  }
};

const logout = {
  post: async (connection, user) => {
    await sql.logout.post.updateUser(connection, user.id);

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
    let foundUser = await sql.common.findUser(connection, options.email);
    if (foundUser) {
      const verificationCode = helper.mailer.generateVerifyCode();
      await sql.changePassword.post.addForgotPasswordCode(
        connection,
        verificationCode,
        foundUser.id
      );
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
    let foundUser = await sql.common.findUser(connection, options.email);

    const code = await sql.changePassword.get.getForgotPasswordCode(connection, foundUser.id);
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
    let foundUser = await sql.common.findUser(connection, options.email);
    if (!foundUser) {
      return helper.doom.error.accountNotFound();
    }

    if (options.newPassword !== options.repeatNewPassword) {
      return helper.doom.error.passwordNotConcur();
    }

    const newPassword = bcrypt.hashSync(options.newPassword, 10);
    await sql.changePassword.put.updatePassword(connection, newPassword, foundUser.id);
    await sql.changePassword.delete.deleteVerificationCode(connection, foundUser.id);

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
  forgotPassword,
  changePassword,
  logout,
  verifyCode
};
