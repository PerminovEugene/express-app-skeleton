const twitterApi = require('./../facades/twitter-api');

module.exports = {
    test: (req, res) => {
        twitterApi.get()
            .then((result) => {
                res.status(200).send({succes: true, data: result});
            })
            .catch((error) => {
                res.status(500).send({error})
            });

    }
};