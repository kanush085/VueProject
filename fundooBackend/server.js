/******************************************************************************
 *  @Purpose        : To create a server to connect with front end and get the 
                     request and send response to client
 *  @file           : server.js        
 *  @author         : AnushKumar S K <anushk136@gmail.com>
 *  @since          : 19-03-2019
 ******************************************************************************/
const route = require('./routes/routes')
const express = require('express')
const bodyParser = require('body-parser');
const note = require('./services/noteService')
const responseTime = require('response-time')
const logger = require('./middleware/logger')
/**
 * Configuring the database.
 */
const app = express();
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    res.header("Access-Control-Allow-Credentials", "true");
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");

    next();
});

app.use(bodyParser.urlencoded({ extended: true }))
/**
 * parse application/json
 */
app.use(bodyParser.json());
var expressValidator = require('express-validator')
app.use(expressValidator());
var cors = require('cors')
app.use(responseTime());
app.use(cors())
app.use('/', route);
app.get('/', (req, res) => {
    res.json({ "message": "welcome to FundooNotes application. Take notes quickly, organize and keep track of all your notes" });
});
console.log("test ", process.env.NODE_ENV)
var env = process.env.NODE_ENV || 'local';
var dbConfig = require('./config/' + env);
require('dotenv').config()
app.listen(3000, function () {
    console.log("server is connected");
    console.log("Server is listening on port 3000");
})



//const dbConfig = require('./config/config');


const mongoose = require('mongoose');

mongoose.Promise = global.Promise;


mongoose.connect(dbConfig.config.url, {
    useNewUrlParser: true
}).then(() => {
    logger.logger.info("Sucessfully connected to the database")
}).catch(err => {
    logger.logger.warn('Could not connect to the database. Exiting now...', err)
    process.exit();
});

var schedule = require('node-schedule');

var j = schedule.scheduleJob('*/1 * * * * ', function () {


    note.checkForReminder()
    //   console.log('The answer to life, the universe, and everything!');
});




module.exports = app;