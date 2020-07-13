const express = require('express');

const route = express.Router();

const bookController = require('../controllers/book')

route.get('/book', bookController.getBookPage)

route.get('/book/data', bookController.getBookData)

route.post('/book/add', bookController.postAddBook)


module.exports = route;