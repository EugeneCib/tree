describe('Unit: egEditorData', function() {

	var egEditorData;
	beforeEach(module('egEditor'));

	beforeEach(inject(function(_egEditorData_) {
		egEditorData = _egEditorData_;
	}));

	it('should have editableItem', function() {
		expect(egEditorData.editableItem).toBeNull();
	});

	it('should have addChild', function() {
		expect(egEditorData.addChild).toBeNull();
	});

	it('should have addSiblingAfter', function() {
		expect(egEditorData.addSiblingAfter).toBeNull();
	});

	it('should have addSiblingBefore', function() {
		expect(egEditorData.addSiblingBefore).toBeNull();
	});

	it('should have remove', function() {
		expect(egEditorData.remove).toBeNull();
	});

	it('should be nulled after clear', function() {
		var f = function(){ return 1; }
		egEditorData.editableItem = 5;
		egEditorData.addChild = f;
		egEditorData.addSiblingAfter = f;
		egEditorData.addSiblingBefore = f;
		egEditorData.remove = f;
		egEditorData.clear();
		expect(egEditorData.editableItem).toBeNull();
		expect(egEditorData.addChild).toBeNull();
		expect(egEditorData.addSiblingAfter).toBeNull();
		expect(egEditorData.addSiblingBefore).toBeNull();
		expect(egEditorData.remove).toBeNull();
	});

});