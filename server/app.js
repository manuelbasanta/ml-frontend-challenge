const express = require('express');
const app = express();

// Controllers
const itemsRouter = require('./controllers/items');

const middleware = require('./utils/middleware');

const allowedDomain = "http://localhost:3000";

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", `${allowedDomain}`);
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use(middleware.requestLogger);

app.use('/api/items', itemsRouter);

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;