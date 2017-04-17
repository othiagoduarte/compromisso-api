module.exports = function(app)
{
	var Compromisso = app.models.compromisso;		
	var controller = {};
	
	controller.getAll = getAll; 
	controller.get = get; 		
	controller.save = save; 
	controller.add = add;  

	function get (req, res) {	


	};
 	
	function getAll (req, res) {

		Compromisso.find().exec()
		.then(function(contatos){
			res.json(compromissos);
		});
	};
	
	function save(req, res){

	};

	function add(req, res){

	};
	
	return controller;	
};