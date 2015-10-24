describe('Unit: egListController', function() {

	var ctrl, egStorageService, egListItemFactory;

	beforeEach(module('egList'));

	beforeEach(inject(function(_egListItemFactory_, _egStorageService_, _$controller_) {
		egListItemFactory = _egListItemFactory_;
		egStorageService = _egStorageService_;

		spyOn(egListItemFactory, "createItem").and.returnValue({name: 'Item', childs: []});
		spyOn(egStorageService, "loadItems").and.returnValue([{name: 'Item', childs: [{name: 'Child', childs: []}]}]);
		spyOn(egStorageService, "saveItems");

		ctrl = _$controller_('egListController', {
			egListItemFactory: egListItemFactory,
			egStorageService: egStorageService,
		});
	}));

	it('should have root item with name and empy child array when created', function() {
		expect(ctrl.rootItem).toBeDefined();
		expect(ctrl.rootItem.name).toBeDefined();
		expect(ctrl.rootItem.childs).toEqual([]);
	});

	it('should call creat item from factory and put it in array or childs when calling addItemToList', function() {
		ctrl.addIteamToList();
		expect(egListItemFactory.createItem).toHaveBeenCalled();
		expect(ctrl.rootItem.childs.length).toBe(1);
	});

	it('should load from storage saved items, and add to root, when calling load function', function() {
		ctrl.load();
		expect(egStorageService.loadItems).toHaveBeenCalled();
		expect(ctrl.rootItem.childs.length).toBe(1);
	});

	it('should call storage save when calling save', function() {
		ctrl.save({name: 'Child', items: []});
		expect(egStorageService.saveItems).toHaveBeenCalled();
	});

});