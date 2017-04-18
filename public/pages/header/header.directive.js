(function () {
  'use strict'

  angular.module('Compromissos.pages.header')
  .directive('ngheader', header);

  function header(){
        return {
          restrict: 'E',
          templateUrl: 'pages/header/header.html',
      }  
  }

})();