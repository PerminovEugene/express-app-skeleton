const mongoose = require('mongoose')
    , modelsBuilder = require('./../models/models_builder')
    , _  = require('lodash');

module.exports.MongooseUtil = class MongooseUtil {
    
    constructor() {
        this._db;
    }
    
    connectToDB() {
        return new Promise((resolve, reject) => {
            try {
                mongoose.Promise = global.Promise;
                console.log('connect to: ', process.env.MONGO_URI);
                this._db = mongoose.connect(process.env.MONGO_URI);

                mongoose.connection.on('error', () => {
                    console.error.bind(console, 'connection error:');
                    return reject({code: "dbError", reason: "Cannot connect to db"})
                });
                mongoose.connection.once('open', () => {
                    console.log('connected to mongoose');
                    return resolve();
                });
                mongoose.connection.on('disconnected', function () {
                    console.log('Mongoose default connection disconnected');
                    return reject('Mongoose default connection disconnected')
                });
                
                // If the Node process ends, close the Mongoose connection
                process.on('SIGINT', function() {
                    mongoose.connection.close(function () {
                        console.log('Mongoose default connection disconnected through app termination');
                        process.exit(0);
                    });
                });
                
            }
            catch (error) {
                return reject(error);
            }
        })
    }
    

    initialize() {
        let that = this;
        return new Promise((resolve, reject) => {
            that.connectToDB()
                .then(() => {
                    return modelsBuilder.addModelsToDB(this._db);
                })
                .catch((error) => {
                    return reject(error);
                })
        });
        
    }
};