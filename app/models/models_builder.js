const glob = require('glob')
    , fs = require("fs");

const parseModel = () => {
    return parseModel()
};

module.exports = {
    getAllSchemas: () => {
        // return new Promise((resolve, reject) => {
            this.mergeSchemasJson()
                .then((result) => {
                    return this.parseToSchemas(result);
                })
                .catch((error) => {
                    // return reject(error);
                    return error
                });
        // });
    },
    mergeSchemasJson: () => {
        return new Promise((resolve, reject) => {
            const files = glob.sync(path + "./*.json");
            let schema = {};
            files.forEach(function (file) {
                let content;
                let parsedContent;
                try {
                    content = fs.readFileSync(file);
                    parsedContent = JSON.parse(content);
                } catch (e) {
                    reject(new Error('Can not parse schema: ' + e + " in file " + file + '.'));
                }
                schema = merge.recursive(true, schema, parsedContent);
            });
            return resolve(schema);
        });
    },
    
    parseToSchemas: (mergedSchemaJson) => {
        return new Promise((resolve, reject) => {
            console.log(mergedSchemaJson)
            resolve()
        });
    }
    
};