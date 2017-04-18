(function () {
    'use strict';
    angular.module('Compromissos.pages.compromissos', [])
    .controller('compromissosCtrl', compromissosCtrl);

    function compromissosCtrl($scope){
        $scope.data = {};
        $scope.mensagem = "compromissosCtrl!!!";
    }

})();