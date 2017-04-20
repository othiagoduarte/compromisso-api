(function () {

angular.module('Compromissos.services', [])
.service('$apiService',apiService)
.service('$modalService',modalService);

    function apiService($http){
        var pUrlApi = "/api/"

        this.compromisso = Compromisso(pUrlApi, $http);
    }

    function Compromisso(pUrlApi, $http){
        pUrlApi+= "compromisso";
        return {
            Get : function(pId){
                    return $http.get(pUrlApi + "/" + pId);            
            },
            Count : function(){
                    return $http.get(pUrlApi + "/Count");            
            },
            Add : function(pData){
                    return $http.post(pUrlApi,{compromisso:pData});            
            },
            Proximos : function(pId){
                    return $http.get(pUrlApi + "/Proximos/" + pId);
            },
            ProximosCount : function(){
                    return $http.get(pUrlApi + "/proximos/count");            
            },
        }
    }

    function modalService($uibModal){
          
        this.informacao = function (ret) {    

            $uibModal.open({
                animation: true,
                templateUrl: '/pages/componentes/modal/informacao.html',
                size: 'sm',
                controller: modalCtrl,
                resolve: {
                    retorno:ret
                }
            });
        }
        
        this.executar = function (modalData) {
            $uibModal.open({
                animation: true,
                templateUrl: modalData.template,
                size: modalData.size || 'md',
                controller: executarCtrl,
                resolve: {
                    param: modalData,
                }
            });
        }
        
        function executarCtrl($scope,param){
            $scope.data = param.data;
            $scope.func = param.func;
            $scope.executar = function (fechar){
                $scope.func($scope.data,fechar);
            }
        }
        
        function modalCtrl($scope,retorno) {
        
            $scope.retorno = retorno;
        
            function ok(fechar){
                fechar();
            }

            function ExecutarOperacao(executar,fechar){
                executar();
                fechar();
            }
        }
    }
})();