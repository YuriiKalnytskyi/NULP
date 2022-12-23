const { header, config, middlewares } = require('./src/app/helpers/helper');
const router = require('./src/app/middlewares/router.handler');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');
const morgan = require('morgan');
const cors = require('cors');
const morganBody = require('morgan-body');
require('dotenv').config({ path: './.env' });
const fileUpload = require('express-fileupload');

app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-Requested-With,Content-Type,Allow,Access-Control-Allow-Origin'
  );
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});

app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());
app.use(header);
app.use(fileUpload());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

morgan.format(config.morgan.name, config.morgan.format);
app.use(morgan(config.morgan.name));
if (config.morgan.morganBody) {
  morganBody(app);
}
app.use(middlewares.cors);

router.userAPI(app);

app.use(middlewares.notFound);
app.use(middlewares.error);

module.exports = app;
