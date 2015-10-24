angular.module('egStorage', ['LocalStorageModule']);


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
angular.module('egList', ['egStorage'])

.config(['localStorageServiceProvider', function(localStorageServiceProvider) {
	localStorageServiceProvider
		.setPrefix('egAppRec')
		.setStorageType('localStorage');
}]);
function egListController(egListItemFactory, egStorageService)
{
	this.rootItem = egListItemFactory.createItem();

	this.addIteamToList = function()
	{
		var item = egListItemFactory.createItem();
		this.rootItem.childs.push(item);
	};

	this.load = function() {
		this.rootItem.childs = egStorageService.loadItems();
	};

	this.save = function() {
		egStorageService.saveItems(this.rootItem.childs);
	};

}

angular.module('egList').controller('egListController', ['egListItemFactory', 'egStorageService', egListController]);
function egListItemController(egListItemFactory) {

	this.addChild = function() {
		this.addChildAt(this.item.childs.length);
	};

	this.addSiblingBefore = function() {
		this.parent.addChildAt(this.index);
	};

	this.addSiblingAfter = function() {
		this.parent.addChildAt(this.index + 1);
	};

	this.addChildAt = function(position) {

		position = Math.min(Math.max(~~position, 0), this.item.childs.length);

		var newChild = egListItemFactory.createItem();
		if (angular.isUndefined(this.parent)) {
			newChild.name = 'Item';
		} else {
			newChild.name = 'Child of ' + this.item.name;
		}
		this.item.childs.splice(position, 0, newChild);
	};

	this.removeChildAt = function(position)
	{
		if(this.item.childs[position] === undefined) return;
		//if((position >= 0) && (position < this.item.childs.length))
		//{
			this.item.childs.splice(position, 1);
		//}
	}

	this.remove = function(parent) {
		this.parent.removeChildAt(this.index);
	};
}

angular.module('egList').controller('egListItemController', ['egListItemFactory', egListItemController]);
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
angular.module('egListIterative', ['egStorage'])

.config(['localStorageServiceProvider', function(localStorageServiceProvider) {
	localStorageServiceProvider
		.setPrefix('egAppIter')
		.setStorageType('localStorage');
}]);
function egItemDepth()
{
	return {
		restrict: 'A',
		link: function(scope, element, attr) {
			console.log('attr.egItemDepth', attr.depth);
			element.css('padding-left', (attr.depth * 30) + 'px');
		}
	};
}


angular.module('egListIterative').directive('egItemDepth', [egItemDepth]);
function egListIterativeController(egListIterativeItemFactory, egStorageService)
{
	var self = this;
	this.items = [];

	this.addIteamToList = function()
	{
		var item = egListIterativeItemFactory.createItem();
		this.items.push(item);
	};

	
	this.addSiblingBefore = function(position) {
		if(this.items[position] === undefined) return;

		var item = egListIterativeItemFactory.createItem();
		item.depth = this.items[position].depth;
		item.name = "Sibling of " + this.items[position].name;
		this.items.splice(position, 0, item);
	};

	this.addSiblingAfter = function(position) {
		if(this.items[position] === undefined) return;

		var item = egListIterativeItemFactory.createItem();
		item.depth = this.items[position].depth;
		item.name = "Sibling of " + this.items[position].name;
		var childCount = countItemChilds(position, item.depth);
		this.items.splice(position + childCount + 1, 0, item);
	};

	this.addChildToItem = function(position) {
		if(this.items[position] === undefined) return;

		var item = egListIterativeItemFactory.createItem();
		item.depth = this.items[position].depth + 1;
		item.name = "Child of " + this.items[position].name;
		this.items.splice(position + 1, 0, item);
	};

	this.removeItem = function(position) {
		if(this.items[position] === undefined) return;
		
		var itemDepth = this.items[position].depth;
		var childCount = countItemChilds(position, itemDepth);

		do {
			this.items.splice(position, 1);
		} while(childCount-- > 0)	
	};

	function countItemChilds(itemPosition, itemDepth) {
		var count = 0;
		var i = itemPosition + 1;
		var lnTotal = self.items.length;
		while((i < lnTotal) && (self.items[i].depth > itemDepth)) {
			count++;
			i++;
		}
		return count;
	}

	this.load = function() {
		this.items = egStorageService.loadItems();
	};

	this.save = function() {
		egStorageService.saveItems(this.items);
	};

}

angular.module('egListIterative').controller('egListIterativeController', ['egListIterativeItemFactory', 'egStorageService', egListIterativeController]);
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
angular.module('egEditor', []);

function egEditableItem(egEditorData) {
	return {
		restrict: 'A',
		scope : {
			editableItem : '=',
			addChild : '&',
			addSiblingBefore : '&',
			addSiblingAfter : '&',
			remove : '&'
		},
		link: function(scope, element, attrs) {
			element.on('click', function() {
				egEditorData.editableItem = scope.editableItem;
				egEditorData.addChild = scope.addChild;
				egEditorData.addSiblingBefore = scope.addSiblingBefore;
				egEditorData.addSiblingAfter = scope.addSiblingAfter;
				egEditorData.remove = scope.remove;
				scope.$apply();
			});
		}
	};
}


angular.module('egEditor').directive('egEditableItem', ['egEditorData', egEditableItem]);
function egEditorController(egEditorData) {

	this.data = egEditorData;

	this.isActive = function() {
		return (this.data.editableItem) ? true : false;
	}

	this.addSiblingBefore = function() {
		this.data.addSiblingBefore();
	};

	this.addSiblingAfter = function() {
		this.data.addSiblingAfter();
	};

	this.addChild = function() {
		this.data.addChild();
	};

	this.remove = function() {
		this.data.remove();
		this.data.clear();
	};
}

angular.module('egEditor').controller('egEditorController', ['egEditorData', egEditorController]);
angular.module('egEditor').factory('egEditorData', function ()
{
	var factory = {
		editableItem: null,
		addChild: null,
		addSiblingAfter: null,
		addSiblingBefore: null,
		remove: null,

		clear: function() {
			factory.editableItem = null;
			factory.addChild = null;
			factory.addSiblingAfter = null;
			factory.addSiblingBefore = null;
			factory.remove = null;
		}
	};
	
	return factory;
});
angular.module('egAppRec', ['egList', 'egEditor']);



angular.module('egAppIter', ['egListIterative', 'egEditor']);
