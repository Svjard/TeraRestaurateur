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
    java = require('java'),
    MongoClient = require('mongodb').MongoClient,
    ObjectID = require('mongodb').ObjectID,
    connect = require('connect'),
    passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy,
    TwitterStrategy = require('passport-twitter').Strategy,
    FacebookStrategy = require('passport-facebook').Strategy,
    pj = require('./package.json');

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  /*User.findById(id, function(err, user) {
    done(err, user);
  });*/
});

passport.use(new TwitterStrategy({
    consumerKey: 'qtXkSb7JAMC4SPIV6hpdHQ',
    consumerSecret: 'dCOaOFf3yxXLEEY7p4MMiz33pWTSz37JX4xoHvUuey8',
    callbackURL: "http://www.example.com/auth/twitter/callback"
  },
  function(token, tokenSecret, profile, done) {
    /*User.findOrCreate(..., function(err, user) {
      if (err) { return done(err); }
      done(null, user);
    });*/
  }
));

/*
passport.use(new FacebookStrategy({
    clientID: FACEBOOK_APP_ID,
    clientSecret: FACEBOOK_APP_SECRET,
    callbackURL: "http://www.example.com/auth/facebook/callback"
  },
  function(accessToken, refreshToken, profile, done) {
    User.findOrCreate(..., function(err, user) {
      if (err) { return done(err); }
      done(null, user);
    });
  }
));*/

passport.use(new LocalStrategy({emailField: 'email', passwordField: 'passw'}, function (emailField, passwordField, done) {
  process.nextTick(function () {
    return done(null, {});
    /*db.collection(dbCollection, function (error, collection) {
      if (!error) {
        collection.findOne({
          'email': sil@gmail.com
          'password': silvester // use there some crypto function
        }, function (err, user) {
          if (err) {
            return done(err);
          }
          
          if (!user) {
            console.log('this email does not exist');
            return done(null, false);
          }
          
          return done(null, user);
        });
      } else {
        console.log(5, 'DB error');
      }
    });*/
  });
}));

//java.classpath.push('jars/commons-codec-1.5.jar');
//java.classpath.push('jars/commons-logging-1.1.jar');
//java.classpath.push('jars/dom4j-1.6.1.jar');
//java.classpath.push('jars/stax-api-1.0.1.jar');
//java.classpath.push('jars/xmlbeans-2.3.0.jar');
//java.classpath.push('jars/poi-ooxml-schemas-3.9-20121203.jar');
//java.classpath.push('jars/poi-ooxml-3.9-20121203.jar');
//java.classpath.push('jars/poi-3.9-20121203.jar');
java.classpath.push('jars/terajdbc4.jar');
java.classpath.push('jars/tdgssconfig.jar');

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
  app.use(express.session({ secret: 'keyboard cat' }));
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

function originPolicy(req, res, next) {
    res.header('access-control-allow-origin', '*');
    res.header('access-control-allow-headers', 'origin, content-type, accept, x-requested-with');
    res.header('access-control-allow-methods', 'GET, POST, PUT, DELETE, OPTIONS');
    return next();
}

app.options('*', function(req, res) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Credentials', true); 
    res.header('Access-Control-Allow-Methods', 'POST, GET, PUT, DELTE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    res.send(200);
});

app.get('/', function(req, res) {
  res.render('index', { title: pj.title, dev: process.argv[2] || false } );
});

app.get('/auth/twitter', passport.authenticate('twitter'));

app.get('/auth/twitter/callback', passport.authenticate('twitter', { successRedirect: '/', failureRedirect: '/login' }));

app.get('/auth/facebook', passport.authenticate('facebook'));

app.get('/auth/facebook/callback', passport.authenticate('facebook', { successRedirect: '/', failureRedirect: '/login' }));

app.post('/login', passport.authenticate('local', { successRedirect: '/', failureRedirect: '/login' }));

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

http.createServer(app).listen(6002);