describe('Unit: egListIterativeItemFactory', function() {

	var egListIterativeItemFactory;

	beforeEach(module('egListIterative'));

	beforeEach(inject(function(_egListIterativeItemFactory_) {
		egListIterativeItemFactory = _egListIterativeItemFactory_;
	}));

	it('should return item with name when calling createItem', function(){
		var item = egListIterativeItemFactory.createItem();
		expect(item.name).toBeDefined();
	});

	it('should return item with depth 0 when calling createItem', function(){
		var item = egListIterativeItemFactory.createItem();
		expect(item.depth).toBeDefined();
		expect(item.depth).toEqual(0);
	});
});