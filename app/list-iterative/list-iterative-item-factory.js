angular.module('egListIterative').factory('egListIterativeItemFactory', [function() {
	function ListIterativeItem() {
		this.name = 'Item';
		this.depth = 0;
	}

	return {
		createItem: function() {
			return new ListIterativeItem();
		}
	}
}]);