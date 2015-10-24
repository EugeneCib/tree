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