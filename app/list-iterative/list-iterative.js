angular.module('egListIterative', ['egStorage'])

.config(['localStorageServiceProvider', function(localStorageServiceProvider) {
	localStorageServiceProvider
		.setPrefix('egAppIter')
		.setStorageType('localStorage');
}]);