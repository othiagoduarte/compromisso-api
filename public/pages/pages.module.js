(function () {
    'use strict';
angular.module('Compromissos.pages', [
                                        'Compromissos.pages.header',
                                        'Compromissos.pages.footer',
                                        'Compromissos.pages.home',
                                        'Compromissos.pages.compromissos'
                                    ]
            )
.run(function ($window) {
    console.log("Compromissos.pages run!")
})
.config(routeConfig)

function routeConfig ($routeProvider) {
    $routeProvider
    .when('/home', {
        templateUrl: '/pages/home/home.html',
        controller: 'homeCtrl'
    })
    .when('/', {
        templateUrl: '/pages/compromissos/compromissos.html',
        controller: 'compromissosCtrl'
    })
}

})();