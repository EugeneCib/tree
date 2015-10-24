describe('Unit: egEditorController', function() {

	var ctrl, egEditorData;

	beforeEach(module('egEditor'));

	beforeEach(inject(function(_egEditorData_, _$controller_) {
		egEditorData = _egEditorData_;

		ctrl = _$controller_('egEditorController', {
			egEditorData: egEditorData
		});
	}));

	it('should have data property equal to egEditorData', function(){
		expect(ctrl.data).toEqual(egEditorData);
	});

	it('should be not active if no item set to egEditorData', function(){
		egEditorData.editableItem = null;
		expect(ctrl.isActive()).toEqual(false);
	});

	it('should be active if item set to egEditorData', function(){
		egEditorData.editableItem = {name:'test'};
		expect(ctrl.isActive()).toEqual(true);
	});

	it('should call egEditorData.addChild when calling addChild', function(){
		spyOn(egEditorData, 'addChild');
		ctrl.addChild();
		expect(egEditorData.addChild).toHaveBeenCalled();
	});

	it('should call egEditorData.addSiblingAfter when calling addSiblingAfter', function(){
		spyOn(egEditorData, 'addSiblingAfter');
		ctrl.addSiblingAfter();
		expect(egEditorData.addSiblingAfter).toHaveBeenCalled();
	});

	it('should call egEditorData.addSiblingBefore when calling addSiblingBefore', function(){
		spyOn(egEditorData, 'addSiblingBefore');
		ctrl.addSiblingBefore();
		expect(egEditorData.addSiblingBefore).toHaveBeenCalled();
	});




	it('should call egEditorData.remove and egEditorData.clear when calling remove', function(){
		spyOn(egEditorData, 'remove');
		spyOn(egEditorData, 'clear');
		ctrl.remove();
		expect(egEditorData.remove).toHaveBeenCalled();
		expect(egEditorData.clear).toHaveBeenCalled();
	});

});