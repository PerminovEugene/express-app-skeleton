const auth = require('./../servises/auth');
const homeController = require('./../controllers/home');

module.exports = (app) => {
    app.get('/', homeController.root);
    app.get('/public', homeController.publicExample);
    app.get('/private', auth.loggedIn, homeController.privateExample);
};
