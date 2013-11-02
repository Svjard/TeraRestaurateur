/*!
 * Tera-Restaurateur
 *
 * Copyright 2013 Teradata Corp.
 * Marc Fisher <marc.fisher@teradata.com>
 */

var cluster = require('cluster');
var numCPUs = require('os').cpus().length;

if ( cluster.isMaster ) {
    for ( var i = 0; i < numCPUs; ++i ) {
        cluster.fork();
    }
    
    cluster.on('exit', function(worker, code, signal) {
        console.log('worker ' + worker.process.pid + ' died');
    });
}
else {
    var express = require('express'),
        _ = require('lodash'),
        util = require('util'),
        fs = require('fs'),
        async = require('async'),
        http = require('http'),
        path = require ('path'),
        java = require('java'),
        connect = require('connect'),
        pj = require('./package.json');

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

    http.createServer(app).listen(6002);
}
