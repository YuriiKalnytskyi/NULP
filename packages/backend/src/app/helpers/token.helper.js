const config = require('./config.helper');
const JWT = require('jsonwebtoken');
const doom = require('../helpers/doom.helper');

const user = {
    accessToken: (userId, user) => {
        return JWT.sign({
            'sub': userId,
            'type': user.role,
            'userInfo': user,
        }, config.JWT.secret.user.accessToken, {
            'expiresIn': config.JWT.lifetime.accessToken
        });
    },
    academyAccessToken: (userId, type, user) => {
        return JWT.sign({
            'iss': config.JWT.iss,
            'sub': userId,
            'type': type,
            'userInfo': {
                email: user.email,
            },
        }, config.JWT.secret.user.accessToken, {
            'expiresIn': config.JWT.lifetime.accessToken
        });
    },

    refreshToken: (userId) => {
        return JWT.sign({
            'iss': config.JWT.iss,
            'sub': userId,
        }, config.JWT.secret.user.refreshToken, {
            'expiresIn': config.JWT.lifetime.refreshToken
        });
    },

    paymentsToken: (userId, orderId, time) => {
        return JWT.sign({
            'iss': config.JWT.iss,
            'sub': userId,
            'orderId': orderId,
        }, config.JWT.secret.user.paymentsToken, {
            'expiresIn': time
        });
    },
};

async function decodeToken(token) {
    try {
        let decode = JWT.verify(token, config.JWT.secret.user.paymentsToken);
        return true;
    } catch (e) {
        if (e.name === JWT.TokenExpiredError.name) {
            return doom.error.paymentsTimeOff();
        } else {
            return doom.error.tokenNotFound();
        }
    }
}

module.exports = {
    user,
    decodeToken
};


