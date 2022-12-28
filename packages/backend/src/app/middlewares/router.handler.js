const auth = require('../../api/auth/router');
const profile = require('../../api/profile/router');
const teaching = require('../../api/teaching/router');

module.exports = {
  userAPI: (app) => {
    app.use('/auth', auth);
    app.use('/profile', profile);
    app.use('/teaching', teaching);
  }
};
