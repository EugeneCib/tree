angular.module('egStorage').factory('egStorageService', ['localStorageService', function(localStorageService) {
	return {
		loadItems: function() {
			var items = localStorageService.get('items');
			if (angular.isArray(items)) {
				return items;
			} else {
				return [];
			}
		},

		saveItems: function(items) {
			localStorageService.set('items', items);
		}

	}
}]);