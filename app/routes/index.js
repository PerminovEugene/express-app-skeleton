const auth = require('./auth')
    , home = require('./home')
    , twitter = require('./twitter');

module.exports.addRoutes = (app) => {
    auth(app);
    home(app);
    twitter(app)
};