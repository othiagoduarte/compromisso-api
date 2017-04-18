(function () {
  'use strict'

  angular.module('Compromissos.pages.header')
  .directive('ngheader', header);

  function header(){
        return {
          restrict: 'E',
          template: '<header>header</header>',
      }  
  }

})();