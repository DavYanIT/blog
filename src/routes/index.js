const loginController = require('../controllers/loginController');
const registrationController = require('../controllers/registrationController');
const postController = require('../controllers/postController');
const isLoggedIn = require('../middlewares/auth').isLoggedIn;

module.exports = (app) => {
    app.get('/', [
        loginController.home
    ]);
    app.post('/login', [
        loginController.login
    ]);
    app.get('/logout', [
        loginController.logout
    ]);
    app.get('/registration', [
        registrationController.registration
    ]);
    app.post('/registration', [
        registrationController.creatUser
    ]);
    app.get('/posts', [
        isLoggedIn,
        postController.posts
    ]);
    app.get('/post/:id', [
        isLoggedIn,
        postController.postItem
    ]);
    app.get('/post', [
        isLoggedIn,
        postController.post
    ]);
    app.post('/post', [
        isLoggedIn,
        postController.createPost
    ]);
}