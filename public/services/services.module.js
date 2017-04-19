(function () {

angular.module('Compromissos.services', []).service('$apiService',apiService)

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

        }
  }
})();