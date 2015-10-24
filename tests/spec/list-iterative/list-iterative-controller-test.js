describe('Unit: egListIterativeController', function() {

	var ctrl, egStorageService, egListIterativeItemFactory;

	beforeEach(module('egListIterative'));

	beforeEach(inject(function(_egListIterativeItemFactory_, _egStorageService_, _$controller_) {
		egListIterativeItemFactory = _egListIterativeItemFactory_;
		egStorageService = _egStorageService_;

		ctrl = _$controller_('egListIterativeController', {
			egListIterativeItemFactory: egListIterativeItemFactory,
			egStorageService: egStorageService,
		});
	}));

	function createTestStructure() {

		return [{name: 'Item 1', depth: 0},
			{name: 'Child of item 1 (1.1.)', depth: 1},
			{name: 'Child of item 1 (1.2.)', depth: 1},
			{name: 'Item 2', depth: 0},
			{name: 'Child of item 2 (2.1.)', depth: 1},
			{name: 'Child of child item 2 (2.1.1.)', depth: 2},
			{name: 'Item 3', depth: 0}
		]
	}

	it('should have empty item array at start', function(){
		expect(ctrl.items).toEqual([]);

	});

	it('should call egListIterativeItemFactory.createItem when calling addIteamToList', function(){
		spyOn(egListIterativeItemFactory, 'createItem');
		ctrl.addIteamToList();
		expect(egListIterativeItemFactory.createItem).toHaveBeenCalled();
	});

	it('should add one more item to end of items array when calling addIteamToList', function() {
		ctrl.addIteamToList();
		expect(ctrl.items.length).toEqual(1);
		ctrl.items[0].name = "first";
		ctrl.addIteamToList();
		ctrl.addIteamToList();
		ctrl.addIteamToList();
		expect(ctrl.items.length).toEqual(4);
		expect(ctrl.items[0].name).toEqual('first');
	});


	it('should create one item which stick in before position - with same depth when calling addSiblingBefore', function() {
		ctrl.items = createTestStructure();
		var sizeBefore = ctrl.items.length;
		var currentItem = ctrl.items[3];
		ctrl.addSiblingBefore(3);
		var sibling = ctrl.items[3];
		expect(sibling.name).not.toEqual(currentItem.name);
		expect(sibling.depth).toEqual(currentItem.depth);
		expect(ctrl.items[4]).toEqual(currentItem);
		expect(ctrl.items.length).toEqual(sizeBefore + 1);
	});

	it('should create item at same depth after current item position when calling addSiblingAfter', function(){
		ctrl.items = createTestStructure();
		var sizeBefore = ctrl.items.length;
		ctrl.addSiblingAfter(1);
		expect(ctrl.items[2].depth).toEqual(1);
		expect(ctrl.items[2].name).toEqual("Sibling of Child of item 1 (1.1.)");
		expect(ctrl.items.length).toEqual(sizeBefore + 1);
	});

	it('when calling addSiblingAfter, it places sibling after childs', function(){
		ctrl.items = createTestStructure();
		var sizeBefore = ctrl.items.length;
		ctrl.addSiblingAfter(0);
		expect(ctrl.items[3].depth).toEqual(0);
		expect(ctrl.items[3].name).toEqual("Sibling of Item 1");
		expect(ctrl.items.length).toEqual(sizeBefore + 1);
	});


	it('should add child at next position with depth + 1 when callin addChildToItem', function() {
		ctrl.items = createTestStructure();
		var sizeBefore = ctrl.items.length;
		ctrl.addChildToItem(4);
		expect(ctrl.items[5].depth).toEqual(2);
		expect(ctrl.items[5].name).toEqual("Child of Child of item 2 (2.1.)");
		expect(ctrl.items.length).toEqual(sizeBefore + 1);
	});


	it('should be possible to remove item at middle', function(){
		ctrl.items = [{name:'A', depth:0}, {name:'B', depth:0}, {name:'C', depth:0}];
		ctrl.removeItem(1);
		expect(ctrl.items).toEqual([{name:'A', depth:0}, {name:'C', depth:0}]);
	});

	it('should be possible to remove item at beginning', function() {
		ctrl.items = [{name:'A', depth:0}, {name:'B', depth:0}, {name:'C', depth:0}];
		ctrl.removeItem(0);
		expect(ctrl.items).toEqual([{name:'B', depth:0}, {name:'C', depth:0}]);
	});

	it('should be possible to remove item at end', function() {
		ctrl.items = [{name:'A', depth:0}, {name:'B', depth:0}, {name:'C', depth:0}];
		ctrl.removeItem(2);
		expect(ctrl.items).toEqual([{name:'A', depth:0}, {name:'B', depth:0}]);
	});

	it('should be impossible to remove not existing item', function() {
		ctrl.items = [{name:'A', depth:0}, {name:'B', depth:0}, {name:'C', depth:0}];
		ctrl.removeItem(5);
		expect(ctrl.items).toEqual([{name:'A', depth:0}, {name:'B', depth:0}, {name:'C', depth:0}]);
	});

	it('should remove item with all its childrens', function() {
		ctrl.items = [{name:'A', depth:0}, {name:'A_1', depth:1}, {name:'A_1_1', depth:2}, {name:'A_2', depth:1}, {name:'C', depth:0}];
		ctrl.removeItem(0);
		expect(ctrl.items).toEqual([{name:'C', depth:0}]);
	});

	it('should get items from storage service when callin load', function () {
		egStorageService.loadItems = function() {
			return [{name: 'A', depth: 0}];
		}
		ctrl.load();
		expect(ctrl.items).toEqual([{name: 'A', depth: 0}]);
	});

	it('should call storage save item function when callin save', function() {
		spyOn(egStorageService, 'saveItems');
		ctrl.save();
		expect(egStorageService.saveItems).toHaveBeenCalled();
	});


});