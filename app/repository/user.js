const cryptoFacade = require('./../facades/crypto')

const salt = cryptoFacade.genSaltSync(16);
let fakeUser = {username: 'foo', password: "13", id: 1, salt: salt};
fakeUser.password = cryptoFacade.hashSync(fakeUser.password, salt);

module.exports = {
    
    findById: (id) => {
        return new Promise((resolve, reject) => {
            return resolve(fakeUser);
        });
    },
    
    findUser: (params) => {
        return new Promise((resolve, reject) => {
            return resolve(fakeUser);
        });
    }
};