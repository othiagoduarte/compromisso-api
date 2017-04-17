module.exports = function(app)
{
	var controller = app.controllers.compromisso;

	app.route('/api/compromisso')
	.get(controller.getAll)
	.post(controller.add)
	.put(controller.save);
	
	app.route('/api/compromisso/:id')
	.get(controller.get);
};