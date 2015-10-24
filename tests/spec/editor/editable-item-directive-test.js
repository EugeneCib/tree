describe('Unit: egEditableItem', function() {

	var egEditorData;
	var $compile,
		$rootScope;
	beforeEach(module('egEditor'));

	beforeEach(inject(function(_egEditorData_, _$compile_, _$rootScope_) {
		egEditorData = _egEditorData_;
		$compile = _$compile_;
		$rootScope = _$rootScope_;
	}));

	describe('Scope values to egEditorData assignment on element click.', function() {
		beforeEach(function() {
			$rootScope.item = {
				name: 'test item'
			};
			$rootScope.f1 = function() {
				return 1;
			};
			$rootScope.f2 = function() {
				return 2;
			};
			$rootScope.f3 = function() {
				return 3;
			};
			$rootScope.f4 = function() {
				return 4;
			};

			var element = $compile('<div eg-editable-item \
				editable-item="item" \
				add-child="f1()" \
				add-sibling-before="f2()" \
				add-sibling-after="f3()" \
				remove="f4()" \
				></div>')($rootScope);
			element.triggerHandler('click');
		});

		it('should assign item values to egEditorData', function() {
			expect(egEditorData.editableItem).toEqual($rootScope.item);
		});

		it('should assign addChild function to egEditorData', function() {
			expect(egEditorData.addChild).toBeDefined();
			expect(egEditorData.addChild()).toEqual($rootScope.f1());
		});

		it('should assign addSiblingBefore function to egEditorData', function() {
			expect(egEditorData.addSiblingBefore).toBeDefined();
			expect(egEditorData.addSiblingBefore()).toEqual($rootScope.f2());
		});

		it('should assign addSiblingAfter function to egEditorData', function() {
			expect(egEditorData.addSiblingAfter).toBeDefined();
			expect(egEditorData.addSiblingAfter()).toEqual($rootScope.f3());
		});

		it('should assign [remove] function to egEditorData', function() {
			expect(egEditorData.remove).toBeDefined();
			expect(egEditorData.remove()).toEqual($rootScope.f4());
		});

	});
});