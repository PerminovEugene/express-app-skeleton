const APP_PORT = 8081
    , cookieParser = require('cookie-parser')
    , bodyParser = require('body-parser')
    , session = require('express-session')
    , routesModule = require('./app/routes/index');


let express = require('express');
let app = express();

app.use(express.static('public'));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({ secret: 'qwqdqwqdw' }));

routesModule.addRoutes(app);


var server = app.listen(APP_PORT, function () {
    let host = server.address().address;
    let port = server.address().port;
    
    console.log("Example app listening at http://%s:%s", host, port)
});

/*
    TODO:
    1) Add comments
    2) Add another strategy for passport auth
    3) Add config with available passport strategies
    4) Move configurations from that file to config.js
    5) Add endpoint for logout
    6) Add tests on endpoints
    
    other features
    1) Add docker with overrride file and config file
    2) Add mongoose with dynamic generations of models
    3) Add registration and forgot password (with available email notifications) endpoints
    5) ?
 */