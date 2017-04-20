(function () {
    'use strict';
    angular.module('Compromissos.pages.compromissos', [])
    .controller('compromissosCtrl', compromissosCtrl);

    function compromissosCtrl($scope,$apiService){
        $scope.buscarCompromissos = buscarCompromissos;
        $scope.data = {};
        
        var dbCompromisso = $apiService.compromisso; 
        var _itensPagina = 10;
        
        paginacaoItens();        
        buscarCompromissos();

        function buscarCompromissos(pagina){
            var _page = pagina | 1;

            dbCompromisso.Get(_page)
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