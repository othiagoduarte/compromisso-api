module.exports = function(app)
{
	var Compromisso = app.models.compromisso;		
	var controller = {};
	
	controller.getAll = getAll; 
	controller.get = get; 		
	controller.save = save; 
	controller.ValidarCompromisso = ValidarCompromisso;
	controller.add = add;  
	controller.count = count;
	controller.proximos = proximos;
	controller.proximosCount = proximosCount;
		 
	function get (req, res) {	

		var _limite = 10;
		var _page = req.params.page;
		var _skip = _limite * (_page - 1);
		var _query = {};

		Compromisso.find(_query)
		.sort({data : -1})
		.skip(_skip)
		.limit(_limite)
		.exec()
		.then(function(compromissos){
			res.json(compromissos);
		},
		function(erro){
      	    res.status(500).json({retorno:erro});
        });
	};
 	
	function proximos (req, res) {	

		var _limite = 10;
		var _page = req.params.page;
		var _skip = _limite * (_page - 1);
		var _hoje = getHoje();

		Compromisso.find( {data : {'$gte': _hoje }} )
		.sort({data : 1})
		.skip(_skip)
		.limit(_limite)
		.then(function(compromissos){
			res.json(compromissos);
		},
		function(erro){
      	    res.status(500).json({retorno:erro});
        });
	};

	function count (req, res) {

		Compromisso.count()
		.then(function(count){
			res.json(count);
		},
		function(erro){
      	    res.status(500).json({retorno:erro});
        });
	};

	function proximosCount (req, res) {
		
		var _hoje =  getHoje();
		
		Compromisso.find({data : {'$gte': _hoje } })
		.count()
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

	function save(req, res, next){
		var _compromisso = req.body.compromisso;

		res.json({retorno:"Salvo com sucesso!"});
	};

	function add(req, res){

		 var _compromisso = req.body.compromisso;

		Compromisso.create(_compromisso)
		.then(function(compromissos) {
			res.json({retorno:"Salvo com sucesso!"});
		},
		function(erro) {
			res.status(501).json({retorno:erro});
		});	
	};

	function ValidarCompromisso(req, res, next){
		
		var _compromisso = req.body.compromisso;
		var _hoje =  Date.now();

		if(! _compromisso){
			res.status(501).json({retorno:"Compromisso é uma informação obrigarória!"})
		}

		if( Date.parse(_compromisso.data) < _hoje){
			res.status(501).json({retorno:"A data do compromisso deve ser maior que a data"});
		}
		
		var _data = new Date(Date.parse(_compromisso.data));
		var _dataInicial = new Date(_data.setTime(_data.getTime() - ( 30 * 60000)));
		var _dataFinal = new Date(_data.setTime(_data.getTime() + ( 30 * 60000)));
		
		Compromisso.find({
			data : {
			'$gte': _dataInicial,
			'$lte': _dataFinal
		}})
		.then(function(compromissos){
			if(compromissos.length > 0){
				res.status(501).json({retorno:"O intervalo de 30 minutos deve ser respeitado entre os compromissos!"});
			}else{
				next();
			}
		},
		function(erro){
      	    res.status(500).json({retorno:erro});
        });				
	}
	function getHoje(){
		return new Date(Date.now()).setHours(0,0,0,0);
	}
	
	return controller;	
};