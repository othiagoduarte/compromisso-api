(function () {
    'use strict';
angular.module('Compromissos.pages',modulos())
.config(routeConfig)
    
    function modulos(){
        
        var mod = [];
        mod.push('Compromissos.pages.header');
        mod.push('Compromissos.pages.footer');
        mod.push('Compromissos.pages.home');
        mod.push('Compromissos.pages.compromissos'); 

        return mod;
    }

    function routeConfig ($routeProvider, $locationProvider) {

        $routeProvider
        .when('/', {
            templateUrl: '/pages/home/home.html',
            controller: 'homeCtrl'
        })
        .when('/compromissos', {
            templateUrl: '/pages/compromissos/compromissos.html',
            controller: 'compromissosCtrl'
        })
        .otherwise({
            redirectTo: '/'
        });

        $locationProvider.html5Mode({
            enabled: true,
            requireBase: false
        });
    }
})();