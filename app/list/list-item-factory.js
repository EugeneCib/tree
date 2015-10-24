angular.module('egList').factory('egListItemFactory', [function() {
	function ListItem() {
		this.name = 'Item';
		this.childs = [];
	}


	return {
		createItem: function() {
			return new ListItem();
		}
	}
}]);