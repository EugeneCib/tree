function egListItem()
{
	return {
		restrict: 'E',
		replace: false,
		scope: {},
		bindToController: {
			item: '=',
			isRoot: '=',
			index: '=',
			parent: '='
		},

		controller: 'egListItemController',
		controllerAs: 'listItem',
		templateUrl: 'list-item',
	};
}


angular.module('egList').directive('egListItem', [egListItem]);