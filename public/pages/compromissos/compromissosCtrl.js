(function () {
    'use strict';
    angular.module('Compromissos.pages.compromissos', [])
    .controller('compromissosCtrl', compromissosCtrl);

    function compromissosCtrl($scope,$apiService,$modalService){
        
        var dbCompromisso = $apiService.compromisso; 
        var _itensPagina = 10;
        
        $scope.data = {};
        $scope.buscarCompromissos = buscarCompromissos;
        $scope.excluir = excluir; 
                
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
                var retorno = {};
                retorno.titulo = "Informação";
                retorno.mensagem = "Não é possível excluir compromissos agendados para a data atual!";
                $modalService.informacao(retorno);
            }
        }

        function excluirCompromissoCtrl(pDados,fecharModal,$modalService){

            dbCompromisso.Delete(pDados.compromisso)
            .then(function(response){
               atualizarDados();
                fecharModal();
            })
            .catch(function(response){
                var retorno = {};
                retorno.titulo = "Informação";
                retorno.mensagem = "Ocorreram erros ao excluir o compromisso!";
                $modalService.informacao(retorno);
            });
        }
        
        function atualizarDados(){
            paginacaoItens();        
            buscarCompromissos(1);
        }
        
        atualizarDados();
    }
})();