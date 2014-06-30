var express = require('express');
var http = require('http');
var path = require('path');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var bodyParser = require('body-parser');

var passport = require('passport');
// var LocalStrategy = require('passport-local').Strategy;

// var Routes = require('./server/routes');

//socket.io server
var Socket = require('./server/socket.js');

//mongodb driver wrapper
var MONGO_URL = 'mongodb://localhost:27017/testdb';
var Manager = require('./server/manager.js')( MONGO_URL );

// passport.serializeUser(function(user, done) {
//   done(null, user);
// });
//
// passport.deserializeUser(function(obj, done) {
// 	done(null, obj);
// });
//
// passport.use(
//   new LocalStrategy({ usernameField: 'login' }, function(login, password, done) {
//     Manager.findUserByLogin( login, function(err, user) {
//       if (err) return done(err);
//       if (!user) return done(null, false);
//
//       if(user.password === password) {
//         delete(user._id);
//         delete(user.password);
//         return done(null, user);
//       }
//       else {
//         return done(null, false);
//       }
//     });
//   })
// );

//setup passport
require('./server/passport.js')( passport, Manager );

var app = express();

app.set('port', process.env.PORT || 3000);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(session({ secret: 'ng-secret' }));
app.use(passport.initialize());
app.use(passport.session());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'app')));
app.use(express.logger());

var server = http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});

//socket server startup
Socket.listen(server, Manager);

//setup auth rest api
require('./server/authrestapi.js')( app, passport, Manager );

//setup rest api
require('./server/restapi.js')( app, Manager );

// app.post('/api/login', passport.authenticate('local'),
//   function(req, res) { routes.signin(req, res); });
//
// app.get('/api/verify',
//   function (req, res) { routes.check(req, res); });
//
// app.get('/api/logout',
//   function(req, res) { routes.signout(req, res); });
