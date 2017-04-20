(function () {
    'use strict';
    angular.module('Compromissos.pages.home', [])
    .controller('homeCtrl', homeCtrl);


    function homeCtrl($scope,$apiService,$uibModal,$modalService){
        
        var dbCompromisso = $apiService.compromisso; 
        var _itensPagina = 10;
        
        $scope.buscarCompromissos = buscarCompromissos;
        $scope.incluirCompromisso = incluirCompromisso;
        $scope.data = {};
                
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

        function incluirCompromisso(){
            
            $uibModal.open({
                animation: true,
                templateUrl: "/pages/componentes/modal/compromisso.html",
                size: 'lg',
                controller: incluirCompromissoCtrl,
                resolve: {
                    compromisso: {},
                }
            });
        }

        function incluirCompromissoCtrl($scope,compromisso,$apiService){
            $scope.compromisso = compromisso;
 
            $scope.salvar = function(fecharModal){
                
                $apiService.compromisso.Add($scope.compromisso)
                .then(function(response){
                    $modalService.informacao({  titulo:"Informação"
                                                ,mensagem:"Sucesso ao incluir um compromisso!"
                                            });
                    carregarDados();
                    fecharModal();

                })
                .catch(function(response){
                    $modalService.informacao({  titulo:"Atenção"
                                                ,mensagem:response.data.retorno
                                            });
                });
            }          
        }
         
        function carregarDados(){
            paginacaoItens();
            buscarCompromissos(1);
        }
        
        carregarDados();                
    }


})();