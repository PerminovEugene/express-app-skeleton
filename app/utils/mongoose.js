const mongoose = require('mongoose')
    , modelsBuilder = require('./../models/models_builder');


module.exports.MongooseUtil = class MongooseUtil {
    
    connectToDB() {
        return new Promise((resolve, reject) => {
            try {
                console.log('connect to: ', process.env.MONGO_URI);
                mongoose.connect(process.env.MONGO_URI);

                mongoose.connection.on('error', () => {
                    console.error.bind(console, 'connection error:');
                    return reject({code: "dbError", reason: "Cannot connect to db"})
                });
                mongoose.connection.once('open', () => {
                    console.log('connected to mongoose');
                });
                mongoose.connection.on('disconnected', function () {
                    console.log('Mongoose default connection disconnected');
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
            
            // Mongoose.Promise = global.Promise;
        })
    }
    
    addSchemasToDB() {
        return new Promise((resolve, reject) => {
            console.log('in addSchemasToDB');
            resolve()
        })
    }
    
    initialize() {
        let that = this;
        return new Promise((resolve, reject) => {
            that.connectToDB()
                .then(() => {
                    return modelsBuilder.getAllSchemas();
                })
                .then((mergedSchemaJson) => {
                    return this.addSchemasToDB(mergedSchemaJson);
                })
                .catch((error) => {
                    return reject(error);
                })
        });
        
    }
};