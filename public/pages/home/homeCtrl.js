(function () {
    'use strict';
    angular.module('Compromissos.pages.home', [])
    .controller('homeCtrl', homeCtrl);


    function homeCtrl($scope,$apiService,$uibModal,$modalService){
        
        $scope.data = {};
        $scope.buscarCompromissos = buscarCompromissos;
        $scope.incluirCompromisso = salvarCompromisso;
        $scope.excluir = excluir;
        $scope.editar = editar;

        var dbCompromisso = $apiService.compromisso; 
        var _itensPagina = 10;

        function getHoje(){
            return new Date();
        }

        function excluir(compromisso){
            if(Date.parse(compromisso.data) != getHoje() ){

                $modalService.executar({
                    func: excluirCompromissoCtrl,
                    data:{ compromisso , retorno:{mensagem:"Deseja excluir o compromisso?",titulo:"Atenção"}},
                    size:'sm',
                    template:'/pages/componentes/modal/processar.html'
                });                    
    
            }else{
                var retorno = {};
                retorno.titulo = "Informação";
                retorno.mensagem = "Não é possível excluir compromissos agendados para a data atual!";
                $modalService.informacao(retorno);
            }
        }

        function excluirCompromissoCtrl(pDados,fecharModal,$modalService){

            dbCompromisso.Delete(pDados.compromisso)
            .then(function(response){
                
                carregarDados();
                fecharModal();
            })
            .catch(function(response){
                console.log(response);
                fecharModal();
            });
        }

        function editar(compromisso){
            if(Date.parse(compromisso.data) > getHoje()){
               salvarCompromisso(compromisso);
            }else{
                var retorno = {};
                retorno.titulo = "Informação";
                retorno.mensagem = "Só é possivel editar compromissos futuros!";
                $modalService.informacao(retorno);
            }
        }
                        
        function buscarCompromissos(pagina){
            dbCompromisso.Proximos(pagina)
            .then(function(compromissos){
                $scope.data.compromissos = compromissos.data;
            });
        }

        function paginacaoItens(pagina = false){
            $scope.data.paginas = [];
            
            dbCompromisso.ProximosCount()
            .then(function(response){
                for (var index = 1; index <= Math.ceil(response.data /_itensPagina) ; index++) {
                    $scope.data.paginas.push({ page:index});                    
                }
            })
            .catch(function(response){
                console.log(response);
            });
        }

        function salvarCompromisso(pCompromisso){
            
            $uibModal.open({
                animation: true,
                templateUrl: "/pages/componentes/modal/compromisso.html",
                size: 'lg',
                controller: salvarCompromissoCtrl,
                resolve: {
                    compromisso: pCompromisso,
                }
            });
        }

        function salvarCompromissoCtrl($scope,compromisso,$apiService){
            $scope.compromisso = compromisso;

            $scope.salvar = function(fecharModal){
                
                if($scope.compromisso._id){
                    
                    $apiService.compromisso.Save($scope.compromisso)
                    .then(function(response){
                        
                        var retorno = {};
                        retorno.titulo = "Informação";
                        retorno.mensagem = "Sucesso ao salvar um compromisso!";
                        $modalService.informacao(retorno);

                        carregarDados();
                        fecharModal();

                    })
                    .catch(function(response){

                        var retorno = {};
                        retorno.titulo = "Atenção!";
                        retorno.mensagem = response.data.retorno;
                        $modalService.informacao(retorno);
                    });
                
                }else{

                    $apiService.compromisso.Add($scope.compromisso)
                    .then(function(response){
                        
                        var retorno = {};
                        retorno.titulo = "Informação!";
                        retorno.mensagem ="Sucesso ao incluir um compromisso!";
                        $modalService.informacao(retorno);

                        carregarDados();
                        fecharModal();

                    })
                    .catch(function(response){
                        var retorno = {};
                        retorno.titulo = "Informação!";
                        retorno.mensagem =response.data.retorno;
                        $modalService.informacao(retorno);

                    });
                }  
            }        
        }
         
        function carregarDados(){
            paginacaoItens();
            buscarCompromissos(1);
        }
        
        carregarDados();                
    }


})();