(function () {
    'use strict';
    angular.module('Compromissos.pages.home', [])
    .controller('homeCtrl', homeCtrl);


    function homeCtrl($scope,$apiService,$uibModal){
        var dbCompromisso = $apiService.compromisso; 
        var _itensPagina = 10;
        $scope.buscarCompromissos = buscarCompromissos;
        $scope.data = {};
        
        paginacaoItens();
        buscarCompromissos();
        

        function buscarCompromissos(pagina){
            dbCompromisso.Get(pagina)
            .then(function(compromissos){
                $scope.data.compromissos = compromissos.data;
            });
        }

        function paginacaoItens(pagina = false){
            $scope.data.paginas = [];
            
            dbCompromisso.Count()
            .then(function(count){
                for (var index = 1; index <= Math.round(count.data /_itensPagina); index++) {
                    $scope.data.paginas.push({ page:index});                    
                }
            })
        }
    }


})();