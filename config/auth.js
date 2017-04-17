var passport = require("passport");
var passportJWT = require("passport-jwt");
var cfg = require("./config.js");
var Users = require('../app/models/user.js')();
var ExtractJwt = passportJWT.ExtractJwt;
var Strategy = passportJWT.Strategy;
var params = {  secretOrKey: cfg.jwtSecret,  jwtFromRequest: ExtractJwt.fromAuthHeader()};

module.exports = function() {

    passport.use( new Strategy(params, function(payload, done) {
              
        Users.findOne({_id:payload.id})
        .then(function(users){
            return done(null, {id: users.id});
        },function(erro){
          return done(null, null);
        });  
    }));
  
    return {
        initialize: function() {
            return passport.initialize();
        },
        authenticate: function() {
            return passport.authenticate("jwt", cfg.jwtSession);
        }
    };
};