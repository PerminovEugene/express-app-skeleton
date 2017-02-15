const authModule = require('./../servises/auth')
    , passport = require('passport')
    , LocalStrategy = require('passport-local').Strategy
    , userRepository = require('./../repository/user');

module.exports.initialize = () => {

    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });
    
    passport.deserializeUser(function(id, done) {
        userRepository
            .findById(id)
            .then((user) => {
                done(null, user);
            })
            .catch((error) => {
                done(error);
            });
    });
    
    passport.use(new LocalStrategy(authModule.login));
    
    return passport;
};