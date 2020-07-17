const express = require('express');

const route = express.Router();

const userController = require('../controllers/users')

route.get('/', userController.getRegistrationPage);

route.get('/', userController.postRegistrationPage)

module.exports = route;