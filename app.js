const express = require('express');
const {
    handle404paths,
    handle500s,
} = require('./controllers/controller.error');

const {getCategories} = require('./controllers/controller.categories');

const app = express ();
app.use(express.json());

//1. Get /api/categories

app.get('/api/categories', getCategories);

app.all('*', handle404paths);

app.use(handle500s);


module.exports = app;