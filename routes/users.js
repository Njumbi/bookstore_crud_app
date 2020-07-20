const express = require('express');

const route = express.Router();

const userController = require('../controllers/users')

route.get('/', userController.getRegistrationPage);

route.post('/', userController.postRegistrationPage);

route.get('/login', userController.getLoginPage);

route.post('/login', userController.postLoginPage);

route.post('/logout', userController.postLogOutPage)

module.exports = route;