const auth = require('../../api/auth/router');
const profile = require('../../api/profile/router');
const teaching = require('../../api/teaching/router');
const news = require('../../api/news/router');
const admin = require('../../api/admin/router');

module.exports = {
  userAPI: (app) => {
    app.use('/auth', auth);
    app.use('/profile', profile);
    app.use('/teaching', teaching);
    app.use('/news', news);
    app.use('/admin', admin);
  }
};
