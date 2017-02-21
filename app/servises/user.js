const cryptoFacade = require('./../facades/crypto')
    , _ = require('lodash')
    , allModels = require('./../models/models_builder').models
    , accountSchema = require('./../models/account')
    , twitterProfileSchema = require('./../models/twitter_profile')
    , Types = require('mongoose').Types
    , errorService = require('./errorHandlerService');

const salt = cryptoFacade.genSaltSync(16);
let fakeUser = {username: 'foo', password: "13", id: 1, salt: salt};
fakeUser.password = cryptoFacade.hashSync(fakeUser.password, salt);

const isPasswordEqualPasswordConfirm = (body) => {
    return body.password === body.passwordConfirm
};

const generateUser = (body) => {
    let newUser = new allModels[accountSchema.getSchemaName()](body);
    if (body.password) {
        newUser.salt = cryptoFacade.genSaltSync(16);
        newUser.password = cryptoFacade.hashSync(body.password, newUser.salt);
    }
    return newUser;
};

const generateTwitterProfile =(body) => {
    let twitterProfileModel = allModels[twitterProfileSchema.getSchemaName()];
    return new twitterProfileModel(body);
};

module.exports = {

    findById: (id) => {
        return new Promise((resolve, reject) => {
            let userModel = allModels[accountSchema.getSchemaName()];
            userModel.findById(id, (error, user) => {
                if (error) {
                    return reject(error)
                }
                return resolve(user);
            });
        });
    },
    
    createNewProfileAndAccount: (token, tokenSecret, profile, callback) => {
        let newProfile = generateTwitterProfile({
            _id: Types.ObjectId(),
            token: token,
            tokenSecret: tokenSecret,
            profile: profile
        });
        let newUser = generateUser({
            _id: Types.ObjectId(),
            twitterProfile: newProfile._id
        });
        newProfile.account = newUser._id;
    
        newProfile.save((newProfileSaveError) => {
            errorService.doneErrorHandler(newProfileSaveError, done, 'new profile save error');
            newUser.save((newUserSaveError) => {
                errorService.doneErrorHandler(newUserSaveError, done, 'new user save error');
                callback(newUser, newProfile);
            })
        })
    },
    
    addAccountToTwitterProfile: (foundProfile, callback) => {
        let newUser = generateUser({
            _id: Types.ObjectId(),
            twitterProfile: foundProfile._id
        });
        newUser.save((saveNewUserError) => {
            errorService.doneErrorHandler(saveNewUserError, done, 'new user save error');
            foundProfile.account = newUser._id;
            foundProfile.save((updateProfileError) => {
                if (updateProfileError) {
                    errorService.doneErrorHandler(updateProfileError, done, 'update twitter profile error');
                }
                callback(newUser, foundProfile);
            });
        });
    },
    
    registration: (body) => {
        return new Promise( (resolve, reject) => {
            if (!isPasswordEqualPasswordConfirm(body)) {
                return reject({error: "Password not equal confirm password"});
            }
            let newUser = generateUser(body);
            newUser.save((error) => {
                if (error) {
                    return reject(error);
                }
                return resolve(newUser);
            })
        });
    },
    
    deleteAccount: (sessionUser) => {
        return new Promise( (resolve, reject) => {
            
        });
    },
    
    
};