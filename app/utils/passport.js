const authModule = require('./../servises/auth');
const userService = require('./../servises/user');
const authConfig = require('./../configs/auth.json');
const twitterConfig = require('./../configs/twitter.json');
const _ = require('lodash');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const TwitterStrategy = require('passport-twitter').Strategy;


const localStrategyHandler = () => {
    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });
    passport.deserializeUser(function(id, done) {
        userService
            .findById(id)
            .then((user) => {
                done(null, user);
            })
            .catch((error) => {
                done(error);
            });
    });
    passport.use(new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password',
    }, authModule.login));
};

const twitterStrategyHandler = () => {
    passport.use(new TwitterStrategy({
            consumerKey: twitterConfig.consumerKey,
            consumerSecret: twitterConfig.consumerSecret,
            callbackURL: authConfig.afterLoginUrl,
        },
        authModule.loginViaTwitter
    ));
};

const passportStrategiesHandlers = {
    local: localStrategyHandler,
    twitter: twitterStrategyHandler,
};

module.exports.initialize = () => {
    _.each(authConfig.enabledStrategies, (strategyName) => {
        passportStrategiesHandlers[strategyName]();
    });
    return passport;
};
