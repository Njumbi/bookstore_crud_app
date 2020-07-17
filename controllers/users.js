const User = require('../model/users');

exports.getRegistrationPage = (req, res, next) => {
    res.render('registration.ejs', {
        errorMessage: "",
        successMessage: "",
    })
}