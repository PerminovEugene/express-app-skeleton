const  routesModule = require('./app/routes/index')
    , dotenv = require('dotenv')
    , appConfigurator = require('./app_configurator');

let express = require('express');
let app = express();
// app.use(express.static('public'));

dotenv.load({ path: './app/configs/.env' });

appConfigurator.configure(app);

routesModule.addRoutes(app);

let server = app.listen(process.env.APP_PORT, function () {
    let host = server.address().address;
    let port = server.address().port;
    
    console.log("Example app listening at http://%s:%s", host, port)
});

/*
    TODO:
    1) Add comments
    4) Move configurations from that file to config.js
    5) Add endpoint for logout
    6) Add tests on endpoints
    
    other features
    1) Add docker with overrride file and config file
    2) Add mongoose with dynamic generations of models
    3) Add registration and forgot password (with available email notifications) endpoints
    5) ?
 */