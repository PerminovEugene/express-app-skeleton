const userRepository = require('./../repository/user')
    , cryptoFacades = require('./../facades/crypto');

const isValidPassword = (password, cipherText, salt) => {
    const hash = cryptoFacades.hashSync(password, salt);
    return cipherText === hash;
};

const service = {
    /**
     * That function is callback for passport local authorisation strategy
     * @param username {string}
     * @param password {string}
     * @param done
     */
    login: function (username, password, done) {
        userRepository
            .findUser({username: username})
            .then((user) => {
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
        console.log(token);
        console.log(tokenSecret);
        console.log(profile);
        userRepository.findOrCreate(token, tokenSecret, profile)
            .then((user) => {
                done(null, user);
            })
            .catch((error) => {
                return done(error)
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
    }
};
module.exports = service;