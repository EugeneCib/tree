describe('Unit: egStorageService', function() {

	var egStorageService, localStorageService;
	beforeEach(module('egStorage'));

	beforeEach(inject(function(_egStorageService_, _localStorageService_) {
		egStorageService = _egStorageService_;
		localStorageService = _localStorageService_;
	}));

	it('should call localStorageService.get when calling loadItems', function() {
		spyOn(localStorageService, 'get');
		egStorageService.loadItems();
		expect(localStorageService.get).toHaveBeenCalled();
	});

	it('should call localStorageService.set when calling saveItems', function() {
		spyOn(localStorageService, 'set');
		egStorageService.saveItems(['a']);
		expect(localStorageService.set).toHaveBeenCalled();
	});

	it('loadItems should return same saved items by saveItems', function(){
		var itemsToSave = [{a:1},{b:5}];
		egStorageService.saveItems(itemsToSave);
		var loadedItems = egStorageService.loadItems();
		expect(loadedItems).toEqual(itemsToSave);
	});
	
});