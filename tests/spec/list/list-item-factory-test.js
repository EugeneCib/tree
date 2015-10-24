describe('Unit: egListItemFactory', function() {

	var egListItemFactory;

	beforeEach(module('egList'));

	beforeEach(inject(function(_egListItemFactory_) {
		egListItemFactory = _egListItemFactory_;
	}));

	it('should return item with name when calling createItem', function(){
		var item = egListItemFactory.createItem();
		expect(item.name).toBeDefined();
	});

	it('should return item with empty child array when calling createItem', function(){
		var item = egListItemFactory.createItem();
		expect(item.childs).toBeDefined();
		expect(item.childs).toEqual([]);
	});
});