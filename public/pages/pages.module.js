(function () {
    'use strict';
    angular.module('Compromissos.pages', [
                                            'Compromissos.pages.header',
                                            'Compromissos.pages.footer',
    ])
    
    .run(function ($window) {
        console.log("Compromissos.pages run!")
    })

})();