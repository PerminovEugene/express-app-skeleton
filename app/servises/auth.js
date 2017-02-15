const userRepository = require('./../repository/user')
    , cryptoFacades = require('./../facades/crypto');

const isValidPassword = (password, cipherText, salt) => {
    const hash = cryptoFacades.hashSync(password, salt);
    return cipherText === hash;
};

const service = {
    
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
    
    loggedIn: (req, res, next) => {
        if (req.user) {
            next();
        } else {
            res.send(401, {"message": "Not authorised"});
        }
    }
};
module.exports = service;