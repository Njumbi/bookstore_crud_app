const express = require('express');

const route = express.Router();

const bookController = require('../controllers/book')

route.get('/book', bookController.getBookPage)

route.get('/book/data', bookController.getBookData)

route.post('/book/add', bookController.postAddBook)

route.get('/book/delete', bookController.getDeleteBook)

route.put('/book/edit', bookController.putEditBook)


module.exports = route;