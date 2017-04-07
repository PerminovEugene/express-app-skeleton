const auth = require('./auth');
const home = require('./home');

module.exports.addRoutes = (app) => {
    auth(app);
    home(app);
};
