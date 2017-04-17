
var http = require('http');
var app = require('./config/server')();
require('./config/database.js')();
http.createServer(app).listen(app.get('port'),app.get('host'),function(){
    console.log('Rodando na porta: ' + app.get('port'));
	console.log('Rodando no host: ' + app.get('host'));
});