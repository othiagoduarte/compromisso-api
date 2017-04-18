var mongoose = require('mongoose');

module.exports = function() {

    var schema = mongoose.Schema({  
       data:{}
    });

    return mongoose.model('Compromissos', schema);
};