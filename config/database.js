var mongoose = require('mongoose');

module.exports = function(uri) {
    var urlDatabase = 'mongodb://master:master@ds159220.mlab.com:59220/api-teste';
    uri = urlDatabase;
    
    mongoose.connect(urlDatabase);
    
    mongoose.connection.on('connected', function() {
        console.log('Mongoose! Conectado em ' + uri);
    });
    
    mongoose.connection.on('disconnected', function() {
        console.log('Mongoose! Desconectado de ' + uri);
    });
    
    mongoose.connection.on('error', function(erro) {
        console.log('Mongoose! Erro na conexão: ' + erro);
    });
    
    process.on('SIGINT', function() {
        mongoose.connection.close(function() {
            console.log('Mongoose! Desconectado pelo término da aplicação');
            process.exit(0);
        });
    });
}