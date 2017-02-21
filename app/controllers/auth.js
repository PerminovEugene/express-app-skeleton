const authService = require('./../servises/auth')
    , userService = require('./../servises/user');

module.exports = {
    login: (req, res) => {
        // If this function gets called, authentication was successful.
        // `req.user` contains the authenticated user.
        res.send({success: true}).status(200);
    },
    afterTwitterLogin: (req, res) => {
        res.send(req.user).status(200);
    },
    registration: (req, res) => {
        userService.registration(req.body)
            .then((result) => {
                res.send({success: true}).status(200);
            })
            .catch((error) => {
                res.send({error: error}).status(500);
            })
    },
    logout: (req, res) => {
        authService.loggedOut(req)
            .then(() => {
                res.send({success: true}).status(200);
            })
            .catch((error) => {
                res.send({error: error}).status(500);
            })
    },
    deleteAccount: (req, res) => {
        userService.deleteAccount(req.user)
            .then((result) => {
                res.send({success: true}).status(200);
            })
            .catch((error) => {
                res.send({error: error}).status(500);
        })
    }
};