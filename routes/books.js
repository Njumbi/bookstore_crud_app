const express = require('express');

const route = express.Router();

const bookController = require('../controllers/book')
const authController = require('../utilities/auth')

route.get('/book', authController.isUserLoggedIn, bookController.getBookPage)

route.get('/book/data', authController.isUserLoggedIn, bookController.getBookData)

route.post('/book/add', authController.isUserLoggedIn, bookController.postAddBook)

route.get('/book/delete', authController.isUserLoggedIn, bookController.getDeleteBook)

route.put('/book/edit', authController.isUserLoggedIn, bookController.putEditBook)


module.exports = route;