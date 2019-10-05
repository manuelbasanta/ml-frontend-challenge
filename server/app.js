const express = require('express');
const app = express();

// Controllers
const itemsRouter = require('./controllers/items');

const middleware = require('./utils/middleware');

app.use(middleware.requestLogger);

app.use('/api/items', itemsRouter);

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;