
module.exports = {
    login: (req, res) => {
        // If this function gets called, authentication was successful.
        // `req.user` contains the authenticated user.
        res.json({success: true});
    }
};