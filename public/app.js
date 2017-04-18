(function () {

    angular.module('Compromissos', ['ngRoute',
                                    'Compromissos.pages'
                                    ])
    
    .run(function ($window) {
        console.log("Compromissos run!")
    })

})();