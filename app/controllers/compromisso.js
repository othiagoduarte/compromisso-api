module.exports = function(app)
{
	var Compromisso = app.models.compromisso;		
	var controller = {};
	
	controller.getAll = getAll; 
	controller.get = get; 		
	controller.save = save; 
	controller.add = add;  
	controller.count = count;
	 
	function get (req, res) {	

		var _limite = 10;
		var _page = req.params.page;
		var _skip = _limite * (_page - 1);
		var _query = req.body.query | {};

		Compromisso.find(_query).skip(_skip).limit(_limite).exec()
		.then(function(compromissos){
			res.json(compromissos);
		},
		function(erro){
      	    res.status(500).json({retorno:erro});
        });
	};
 	
	function count (req, res) {
		var _query = req.body.query | {};

		Compromisso.count(_query)
		.then(function(count){
			res.json(count);
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