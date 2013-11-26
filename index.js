/*!
 * Tera-Restaurateur
 *
 * Copyright 2013 Teradata Corp.
 * Marc Fisher <marc.fisher@teradata.com>
 */
var express = require('express'),
    _ = require('lodash'),
    util = require('util'),
    fs = require('fs'),
    async = require('async'),
    http = require('http'),
    path = require ('path'),
    bcrypt = require('bcrypt'),
    MongoClient = require('mongodb').MongoClient,
    ObjectID = require('mongodb').ObjectID,
    connect = require('connect'),
    passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy,
    SALT_WORK_FACTOR = 10,
    sockjs = require('sockjs'),
    pj = require('./package.json');

var app = express();
app.configure(function(){
  app.enable('trust proxy');
  app.set('views', __dirname + '/public');
  app.set('view engine', 'ejs');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(connect.compress());
  app.use(express.json());
  app.use(express.urlencoded());
  app.use(express.cookieParser());
  app.use(express.methodOverride());
  app.use(express.session({ secret: 'I love Teradata!' }));
  app.use(passport.initialize());
  app.use(passport.session());
  app.use(app.router);
  app.use(require('less-middleware')({
      src: __dirname + '/public/less',
      dest: __dirname + '/public/css',
      prefix: '/css'
  }));
  app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){
    app.use(express.errorHandler());
});

// Store pointers to mongo DBs
var mongoTeraRestaurateur = 'gsstmongo.td.teradata.com:27017/terarestaurateur',
    teraRestaurateurDB,
    usersCollection;
MongoClient.connect('mongodb://' + mongoTeraRestaurateur + '?maxPoolSize=100', function(err, db) {
  if(err) { return console.dir(err); }
  teraRestaurateurDB = db;

  usersCollection = db.collection('Users');
});

passport.serializeUser(function(user, done) {
  done(null, user._id);
});

passport.deserializeUser(function(id, done) {
  usersCollection.find({_id: ObjectID(id)}, function(err, user) {
    done(err, user);
  });
});

passport.use(new LocalStrategy(function (username, password, done) {
  console.log(username);
  console.log(password);
  
    usersCollection.findOne({
      'username': username
    }, function (err, user) {
      console.log('LOGIN');
      console.log(user);

      if (err) { console.log(err); return done(err); }
              
      if (!user) {
        console.log('Could not find the user in the database.');
        return done(null, false);
      }

      if (!bcrypt.compareSync(password, user.hash)) {
        console.log('false');
        return done(null, false);
      }
              
      return done(null, user);
    });
}));

app.get('/', function(req, res) {
  res.render('index', { title: pj.title, dev: process.argv[2] || false } );
});

app.post('/login', passport.authenticate('local', { successRedirect: '#/home', failureRedirect: '/' }));

app.post('/api/check', function(req, res) {
  if (req.isAuthenticated()) { return res.send(200); }
  res.send(403);
});

app.post('/api/register', function(req, res, next) {
  var salt = bcrypt.genSaltSync(10);
  var hash = bcrypt.hashSync(req.body.passw, salt);
  var user = {username: req.body.username, salt: salt, hash: hash, email: req.body.email, firstname: req.body.firstname, lastname: req.body.lastname};

  usersCollection.insert(user,
    function(err, docs) {
      if (err) { console.dir(err); }
      req.logIn(docs[0], function(err) {
        if (err) return next(err);
        res.redirect('/#home/init');
      });
    }
  );
});

app.get('/api/types', function(req, res) {
  MongoClient.connect('mongodb://bart.td.teradata.com:27017/terarestaurateur', function(err, db) {
    if(err) { return console.dir(err); }
    db.collection('Types', function(err, coll) {
      coll.find({}).toArray(function(err, types) {
        res.send(coll);
      });
    });
  });
});

app.get('/api/styles', function(req, res) {
  MongoClient.connect('mongodb://bart.td.teradata.com:27017/terarestaurateur', function(err, db) {
    if(err) { return console.dir(err); }
    db.collection('Styles', function(err, coll) {
      coll.find({}).toArray(function(err, styles) {
        res.send(styles);
      });
    });
  });
});

var server = http.createServer(app);

// WebSockets
var socket = sockjs.createServer({ 'sockjs_url': 'http://cdn.sockjs.org/sockjs-0.3.min.js' });

socket.on('connection', function(connection) {
  var id = connection.id = new ObjectID().toHexString();

  connections.push(connection);

  connection.on('close', function() {
    _.remove(connections, function (connection) {
      return connection.id === id;
    });
  });
});

socket.installHandlers(server, { 'prefix': '/ws' });

server.listen(5000, '0.0.0.0');