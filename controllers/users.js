const User = require('../model/users');
const bcrypt = require('bcrypt');

exports.getRegistrationPage = (req, res, next) => {
    res.render('registration.ejs', {
        errorMessage: "",
        successMessage: "",
    })
}

exports.postRegistrationPage = (req, res, next) => {
    const email = req.body.email;
    const name = req.body.name;
    const pass = req.body.pass;
    const re_pass = req.body.re_pass;

    //check if passwords are match
    if (pass == re_pass) {
        bcrypt.hash(pass, 12, (err, encryptedPassword) => {
            if (err) {
                return
            }
        })
        //check if user with that email exists
        User.findOne({
                where: {
                    email: email
                }
            })
            .then(user => {
                if (user) {
                    res.render('registration.ejs', {
                        errorMessage: "user with email exists",
                        successMessage: "",
                    })
                } else {
                    //insert user details into db
                    const newUser = new User({
                        name: name,
                        email: email,
                        password: pass,
                    })
                    newUser.save()
                        .then(() => {
                            res.redirect('/')
                        })
                        .catch(error => {
                            console.log(error)
                            res.render('registration.ejs', {
                                errorMessage: error.message,
                                successMessage: ""
                            })
                        })


                }
            })
            .catch(error => {
                console.log(error)
            })

    } else {
        res.render('registration.ejs', {
            errorMessage: "passwords do not match",
            successMessage: "",
        })
    }

}