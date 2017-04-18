(function () {
    'use strict';
    angular.module('Compromissos.pages.home', [])
    .controller('homeCtrl', homeCtrl);

    function homeCtrl($scope){
        $scope.data = {};
        $scope.mensagem = "Home!!!";
    }

})();