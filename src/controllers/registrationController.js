const fs = require('fs');
const path = require('path');
const userCollection = require('../models/users');

exports.registration = (req, res) => {
    if (req.session.isLoggedIn) {
        return res.redirect('/posts');
    }
    res.render('registration', { errors: req.session.errors });
    req.session.destroy();
}

exports.creatUser = (req, res) => {
    const errors = validate(req);
    if (errors) {
        req.session.errors = errors;
        return res.redirect('/registration');
    }
    const user = {
        email: req.body.email,
        password: req.body.password
    }

    userCollection.addUser(user, function (err) {
        if (err) {
            return res.redirect('/registration');
        }
        req.session.user = userCollection.findUser(req.body.email);
        req.session.isLoggedIn = true;
        res.redirect('/posts');
    });

}

const validate = (req) => {
    const email = req.body.email;
    let errors;

    req.check('email', 'Invalid email').isEmail();
    req.check('password', 'Invalid password').isLength({ min: 4 });

    errors = req.validationErrors();
    if (errors) {
        return errors;
    }

    if (userCollection.findUser(email)) {
        errors = [
            { param: "email", msg: 'This email address is already used', value: email }
        ];
    }

    return errors;
}
