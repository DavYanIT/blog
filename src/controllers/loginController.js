const fs = require('fs');
const path = require('path');
const userCollection = require('../models/users');

exports.home = (req, res) => {
    if (req.session.isLoggedIn) {
        return res.redirect('/posts');
    }
    res.render('login', { errors: req.session.errors });
    req.session.destroy();
}

exports.login = (req, res) => {
    const errors = validate(req);
    if (errors) {
        req.session.errors = errors;
        return res.redirect('/');
    }

    req.session.errors = false;
    req.session.user = userCollection.findUser(req.body.email);
    req.session.isLoggedIn = true;
    return res.redirect('/posts');
}

exports.logout = (req, res) => {
    req.session.destroy();
    return res.redirect('/');
}

const validate = (req) => {
    let isFound = false;
    let errors;

    req.check('email', 'Invalid email').isEmail();
    req.check('password', 'Invalid password').isLength({ min: 4 });

    errors = req.validationErrors();
    if (errors) {
        return errors;
    }

    const email = req.body.email;
    const password = req.body.password;
    const user = userCollection.findUser(email);

    if (user.password !== password) {
        errors = [
            { param: "email", msg: 'Invalid email or password', value: '' }
        ];
    }

    return errors;
}
