
const twitterController = require('./../controllers/twitter');

module.exports = (app) => {
    app.get('/twitter-test', twitterController.test);
};