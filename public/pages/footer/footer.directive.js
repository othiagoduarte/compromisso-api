(function () {
  'use strict'
angular.module('Compromissos.pages.footer')
.directive('ngfooter', footer);

	function footer(){
		return {
			restrict: 'E',
			templateUrl: 'pages/footer/footer.html',
		}  
	}

})();