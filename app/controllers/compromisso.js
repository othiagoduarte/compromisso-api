module.exports = function(app)
{
	var Compromisso = app.models.compromisso;		
	var controller = {};
	
	controller.getAll = getAll; 
	controller.get = get; 		
	controller.save = save; 
	controller.add = add;  

	function get (req, res) {	
		Compromisso.find().exec()
		.then(function(compromissos){
			res.json(compromissos);
		},
		function(erro){
      	    res.status(500).json({retorno:erro});
        });
	};
 	
	function getAll (req, res) {
		Compromisso.find().exec()
		.then(function(compromissos){
			res.json(compromissos);
		},
		function(erro){
      	    res.status(500).json({retorno:erro});
        });
	};
	
	function save(req, res){
		Compromisso.find().exec()
		.then(function(compromissos){
			res.json(compromissos);
		},
		function(erro){
      	    res.status(500).json({retorno:erro});
        });
	};

	function add(req, res){
		Compromisso.find().exec()
		.then(function(compromissos){
			res.json(compromissos);
		},
		function(erro){
      	    res.status(500).json({retorno:erro});
        });
	};
	
	return controller;	
};