const userService = require('./../servises/user')
    , cryptoFacade = require('./../facades/crypto')
    , _ = require('lodash')
    , allModels = require('./../models/models_builder').models
    , accountSchema = require('./../models/account')
    , twitterProfileSchema = require('./../models/twitter_profile')
    , errorServcie = require('./errorHandlerService');

const isValidPassword = (password, cipherText, salt) => {
    console.log(password, cipherText, salt)
    const hash = cryptoFacade.hashSync(password, salt);
    return cipherText === hash;
};

const buildSessionData = (account, twitterProfile) => {
    let data = {};
    data.displayed = account.firstName && account.lastName ? account.firstName + " " + account.lastName : twitterProfile.profile.displayName;
    data.id = account.id;
    return data;
};

const service = {
    /**
     * That function is callback for passport local authorisation strategy
     * @param username {string}
     * @param password {string}
     * @param done
     */
    login: function (username, password, done) {
        let userModel = allModels[accountSchema.getSchemaName()];
        userModel
            .findOne({email: username})
            .exec((error, user) => {
                if (user === null) {
                    return done(null, false, {message: 'Incorrect username.'});
                }
                if (!isValidPassword(password, user.password, user.salt)) {
                    return done(null, false, {message: 'Incorrect password.'});
                }
                return done(null, user);
            })
            .catch((error) => {
                return done(error);
            });
    },
    /**
     * That function is callback for passport twitter authorisation strategy
     * @param token
     * @param tokenSecret
     * @param profile
     * @param done
     */
    loginViaTwitter: (token, tokenSecret, profile, done) => {
        const queue = {token: token};
        let twitterProfileModel = allModels[twitterProfileSchema.getSchemaName()];
        twitterProfileModel
            .findOne(queue)
            .populate('account') //TODO how remove hardcode?
            .exec((error, foundProfile) => {
                errorServcie.doneErrorHandler(error, done);
                const callback = (newUser, newProfile) => {
                    done(null, buildSessionData(newUser, newProfile));
                };
                if (foundProfile === null) {
                    userService.createNewProfileAndAccount(token, tokenSecret, profile, callback);
                }
                else {
                    if (foundProfile.account) {
                        callback(foundProfile.account, foundProfile);
                    }
                    else {
                        userService.addAccountToTwitterProfile(foundProfile, callback);
                    }
                }
               
            });
    },
    
    /**
     * Function for check is authorised user or not
     * @param req
     * @param res
     * @param next
     */
    loggedIn: (req, res, next) => {
        if (req.user) {
            next();
        } else {
            res.send(401, {"message": "Not authorised"});
        }
    },
    
    loggedOut: (req) => {
        return new Promise((resolve) => {
            req.logout();
            resolve()
        });
    }
};
module.exports = service;