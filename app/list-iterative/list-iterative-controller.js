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