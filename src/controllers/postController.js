const fs = require('fs');
const path = require('path');
const postCollection = require('../models/posts');

exports.postItem = (req, res) => {
    const data = postCollection.findPost(req.params.id);

    if (!data) {
        req.session.errors = [
            { param: "email", msg: "Post is not found", value: req.body.email }
        ];
    }
    res.render('post', { data: data, errors: req.session.errors });
}

exports.createPost = (req, res) => {
    const errors = validate(req);
    if (errors) {
        req.session.errors = errors;
        return res.redirect('/post');
    }
    req.session.errors = false;

    const post = {
        id: new Date().getTime(),
        title: req.body.title,
        description: req.body.description
    }

    postCollection.addPost(post, function (err) {
        if (err) {
            return res.redirect('/post');
        }
        res.redirect('/posts');
    })
}

exports.posts = (req, res) => {
    const posts = postCollection.getPosts();
    req.session.errors = false;
    res.render('posts', { data: posts });
}

exports.post = (req, res) => {
    res.render('publicate-post', { errors: req.session.errors });
}

const validate = (req) => {
    const titleErrorMsg = 'Title must contain at least 4 symbols';
    const descriptionErrorMsg = 'Description must contain at least 4 symbols';
    let errors;

    req.check('title', titleErrorMsg).isLength({ min: 4 });
    req.check('description', descriptionErrorMsg).isLength({ min: 4 });

    errors = req.validationErrors();
    return errors;
}
