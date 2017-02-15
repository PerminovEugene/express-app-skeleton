const passport = require('./../utils/passport').initialize()
    , authController = require('./../controllers/auth');

module.exports = (app) => {
    
    app.use(passport.initialize());
    app.use(passport.session());
    
    app.post('/login', passport.authenticate('local'), authController.login);
};
