module.exports = function(app)
{
	var controller = app.controllers.compromisso;

	app.route('/api/compromisso/proximos/count')
	.get(controller.proximosCount);

	app.route('/api/compromisso/proximos/:page')
	.get(controller.proximos);
		
	app.route('/api/compromisso/count')
	.get(controller.count);
	
	app.route('/api/compromisso/:page')
	.get(controller.get);
	
	app.route('/api/compromisso/remove')
	.post(controller.remove);
	
	app.route('/api/compromisso')
	.get(controller.getAll)	
	.post(controller.ValidarCompromisso, controller.add)
	.put(controller.ValidarCompromisso, controller.save);
	
};