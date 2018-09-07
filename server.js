var express = require('express');
var app= express();
var morgan = require('morgan');//http request logger middleware
var  cookieParser= require('cookie-parser');
/*
Cookies are simple, small files/data that are sent to client,
with a server request and stored on the client side.
Every time the user loads the website back, this cookie is sent with the request.
This helps us keep track of the user’s actions.
    */
var session = require('express-session');//manages the session

var mongoose =  require('mongoose');

var bodyParser = require('body-parser');
/*

This body-parser module parses the JSON, buffer,
string and URL encoded data submitted using HTTP POST request.

*/
var passport =  require ('passport');
var flash =  require('connect-flash');//for flash messages.

var cors = require('cors');
var passportLocal = require('passport-local');

var configDb = require('./config/database.js');

var MongoStore = require('connect-mongo')(session);



var request = require("request");


var path = require('path');
mongoose.connect(configDb.url);

require('./config/passport')(passport);

app.use(morgan('dev'));//log to the console.

app.use(cookieParser());

app.use(cors());

/*
Cross-Origin Resource Sharing (CORS) is a mechanism that uses additional HTTP headers
to tell a browser to let a web application running at one origin (domain)
have permission to access selected resources from a server at a different origin.
 A web application makes a cross-origin HTTP request when it requests a
resource that has a different origin (domain, protocol, and port) than its own origin.
 */

/*
midlle ware body-parser.
 */
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.use(session({secret:'shankarsingh482',
                saveUninitialized:true,
                resave:false,
                store:new MongoStore
                ({mongooseConnection:mongoose.connection,
                                    ttl:2*24*60*60})}));
/* initilization of passport */
app.use(passport.initialize());
app.use(passport.session());
/* initilization of flash message */
app.use(flash());
/* setting up of view engine */
app.use(express.static(path.join(__dirname, 'public')));

app.set('view engine','ejs');//embeded java script.. read its documentation.

/*
app.use('/',(req,res)=>{

    res.send('Our First express program');
    console.log(req.cookies);
    console.log('------------------------------------');
    console.log('req.sessions');

});
*/

require('./app/routes.js')(app, passport);
/* set the port number */
var port = process.env.PORT || 9090;

app.listen(port);
console.log(`server is running on ${port}`);