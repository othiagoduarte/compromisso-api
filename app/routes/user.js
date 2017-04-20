module.exports = function (app) 
{
    var controller = app.controllers.user;
    var auth = app.get('auth');
    
    app.route("/api/user/:id")
    .get(auth.authenticate, controller.getById);
    
    app.route("/api/user/login")
    .post(controller.login);
};