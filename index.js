const  routesModule = require('./app/routes/index')
    , dbModule = require('./app/utils/mongoose')
    , dotenv = require('dotenv')
    , appConfigurator = require('./app_configurator')
    , logger = require('./app/utils/logger')

let express = require('express');
let app = express();
// app.use(express.static('public'));

dotenv.load({ path: './app/configs/.env' });

appConfigurator.configure(app);

const dbUtil  = new dbModule.MongooseUtil();
dbUtil.initialize()
    .catch((error) => {
        console.log(error)
    });

routesModule.addRoutes(app);

app.use((err, req, res, next) => {
    if (err.statusCode === 500) {
        logger.error(
            "GENERATED NEW UNHANDLED ERROR: \n",
            err,
            "\n REQUEST INFORMATION:",
            "\n URL: ", req.url,
            "\n USER: ", req.user,
            "\n SESSION: ", req.session,
            "\n BODY: ", req.body,
            "\n ADDRESS: ", req.connection.remoteAddress
        );
    }
    res.status(err.statusCode).send({message: err.message});
});

process.on('uncaughtException', function (err) {
    logger.error(
        "UncaughtException: ",
        err,
        "\n Please process this error!");
});

process.on('unhandledRejection', (reason, p) => {
    logger.error(
        'Unhandled Rejection at: Promise',
        p,
        '\n REASON:',
        reason,
        "\n Please process this error!");
});

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