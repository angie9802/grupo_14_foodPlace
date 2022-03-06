const express = require('express');
const apiRouter = express.Router();



apiRouter.use('/products', require('./apiProducts'));
apiRouter.use('/users', require('./apiUsers'));
apiRouter.use('/images', require('./imagesApi'))


module.exports = apiRouter;