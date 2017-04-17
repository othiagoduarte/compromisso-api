var mongoose = require('mongoose');  
var jwt = require("jwt-simple");
var cfg = { jwtSecret: "secret",jwtSession: {session: false}};
          
module.exports = function(app)
{   
    var User = app.models.user;		
    var controller = {};
	
    controller.login = login;
    controller.getById = getById;
    
    function getById(req, res){
        
        if (req.params.id) {
            var _id = req.params.id;
            var where = {_id:_id}
          
            User.findOne(where)
    	    .then(function(users){
      	        
      	        if(users){
                    users.password = "***********";
      			    res.json({user: users._doc});
      				
      			}else{
      				res.status(404).json({retorno:"Usuario não encontrado"});
      			}
    
      		},function(erro){
      			res.status(404).json({retorno:erro});
      		});
    
        } else {
            res.sendStatus(404);
        }
    }

    function login (req, res) {

        if (! req.body.email || ! req.body.password) {
          res.sendStatus(401);
        }
        
        var where = {"email" : req.body.email};
        
        User.findOne(where)
    	.then(function(users){
            
            var _id = users.id;
            var _user = users._doc;
            
            if(_user.password == req.body.password){
                
                var payload = {id: _user.id};
                var token = jwt.encode(payload, cfg.jwtSecret);
                _user.password = "***********";        
                res.status(200).json({token: token, user: _user});
            }else{
                res.status(401).json({retorno:"Senha não confere ou usuário não cadastrado"});
            }

        },function(erro){
      	    res.status(401).json({retorno:erro});
        });          
    }       
    
    return controller;
};