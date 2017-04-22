var express = require("express");
var load = require('express-load');
var bodyParser = require("body-parser");
var auth = require("./auth.js")();
var cfg = require("./config.js");
var load = require('express-load');
var cookieParser = require('cookie-parser');
var _ = require("lodash");

module.exports = function()
{
    var app = express();
    
    app.use(express.static('./public'));
	app.use(express.static(__dirname + '/public'));

	app.set('view engine','ejs');
	app.set('views','./app/views');
    
    app.set('host',process.env.IP || "127.0.0.1");
	app.set('port',process.env.PORT || 3008);
    app.set('auth', auth);
    app.set('cfg', cfg);

    app.use(require('method-override')());

	app.use(cookieParser());

	app.use(bodyParser.urlencoded({extended: true}));
	app.use(bodyParser.json());
    app.use(bodyParser.json());

    app.use(auth.initialize());

    app.use(function(req, res, next){
	  res.header("Access-Control-Allow-Origin", "*");
	  res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS');
      res.header('Access-Control-Allow-Headers', 'Origin, Content-Type, Accept, Authorization, authorization');
      res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
	  next();   
	});

    load('models',{cwd: 'app'})
    .then('controllers')
    .then('routes')
    .into(app);
	
	app.listen(app.get('port'), function() {
	  console.log('Node app is running on port', app.get('port'));
	});

    return app;
}