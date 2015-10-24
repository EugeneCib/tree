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