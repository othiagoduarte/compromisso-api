(function () {
    'use strict';
    angular.module('Compromissos.pages.compromissos', [])
    .controller('compromissosCtrl', compromissosCtrl);

    function compromissosCtrl($scope,$apiService,$modalService){
        $scope.buscarCompromissos = buscarCompromissos;
        $scope.excluir = excluir; 
        $scope.data = {};
        
        $scope.getDatetime = new Date(Date.now()).setHours(0,0,0,0);
        
        var dbCompromisso = $apiService.compromisso; 
        var _itensPagina = 10;
        
        paginacaoItens();        
        buscarCompromissos();
        
        function getHoje(){
            return new Date();
        }

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

        function excluir(compromisso){
            if(Date.parse(compromisso.data) != getHoje() ){

                $modalService.executar({
                    func: excluirCompromissoCtrl,
                    data:{ compromisso , retorno:{mensagem:"Deseja excluir o compromisso?",titulo:"Atenção"}},
                    size:'sm',
                    template:'/pages/componentes/modal/processar.html'
                });                    
    
            }else{
                $modalService.informacao({  titulo:"Informação"
                                            ,mensagem:"Não é possível excluir compromissos do dia atual!"
                                          });
            }
        }

        function excluirCompromissoCtrl(pDados,fecharModal,$modalService){

            dbCompromisso.Delete(pDados.compromisso)
            .then(function(response){
                buscarCompromissos(1);
                fecharModal();
            })
            .catch(function(response){
                console.log(response);
            });
        }
    }
})();