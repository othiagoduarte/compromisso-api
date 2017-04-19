var mongoose = require('mongoose');

module.exports = function() {

    var schema = mongoose.Schema({  
       titulo: {type: String,required: true},
       resumo: {type: String,required: true},
       local: {type: String},
       data:{ type: Date ,required: true},
       criacao:{ type: Date, default: Date.now},
       concluido:{ type: Boolean, default:false},
    });

    return mongoose.model('Compromissos', schema);
};