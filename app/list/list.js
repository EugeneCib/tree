angular.module('egList', ['egStorage'])

.config(['localStorageServiceProvider', function(localStorageServiceProvider) {
	localStorageServiceProvider
		.setPrefix('egAppRec')
		.setStorageType('localStorage');
}]);