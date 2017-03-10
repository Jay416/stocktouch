const WEBPACK_ENV = process.env.WEBPACK_ENV || 'development';

const developmentConfig = require('./webpack/webpack.dev.config');
const productionConfig = require('./webpack/webpack.prod.config');

if (WEBPACK_ENV === 'development') module.exports = developmentConfig;
if (WEBPACK_ENV === 'production') module.exports = productionConfig;