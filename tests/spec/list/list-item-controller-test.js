describe('Unit: egListItemController', function() {

	var	ctrl, egListItemFactory, parentCtrl;

	beforeEach(module('egList'));

	beforeEach(inject(function(_$controller_, _egListItemFactory_) {
		var egListItemFactory = _egListItemFactory_;
		ctrl = _$controller_('egListItemController', {
			egListItemFactory: egListItemFactory,
		});

		parentCtrl = _$controller_('egListItemController', {
			egListItemFactory: egListItemFactory,
		});

		ctrl.item = {name:'Test Item', childs:[]};
		ctrl.isRoot = false;
		ctrl.index = 3;
		ctrl.parent = parentCtrl;
		parentCtrl.item = {name:'Parent Item', childs:[ctrl.item]};
	}));

	function getChilds(count) {
		var childs = [];
		for(var i = 1 ; i <= count; i ++) {
			childs.push({name:'C'+i, childs:[]});
		}
		return childs;
	}

	it('should create new child at position', function(){
		ctrl.item.childs = getChilds(4);
		ctrl.addChildAt(2);
		expect(ctrl.item.childs.length).toEqual(5);
		expect(ctrl.item.childs[2].name).toEqual('Child of Test Item');
	});

	it('should child at negative position will be added as first child', function(){
		ctrl.item.childs = getChilds(4);
		ctrl.addChildAt(-1);
		expect(ctrl.item.childs.length).toEqual(5);
		expect(ctrl.item.childs[0].name).toEqual('Child of Test Item');
	})

	it('should child at position out of max current position will be added as last child', function(){
		ctrl.item.childs = getChilds(4);
		ctrl.addChildAt(7);
		expect(ctrl.item.childs.length).toEqual(5);
		expect(ctrl.item.childs[4].name).toEqual('Child of Test Item');
	})

	it('should remove element at specified position when calling removeChildAt', function(){
		ctrl.item.childs = getChilds(4);
		ctrl.removeChildAt(2);
		expect(ctrl.item.childs.length).toEqual(3);
		expect(ctrl.item.childs).toEqual([{name:'C1', childs:[]},{name:'C2', childs:[]},{name:'C4', childs:[]}]);
	});

	it('should not remove any element when calling removeChildAt with not existing index', function(){
		ctrl.item.childs = getChilds(4);
		ctrl.removeChildAt(5);
		ctrl.removeChildAt(-1);
		expect(ctrl.item.childs.length).toEqual(4);
		expect(ctrl.item.childs).toEqual(getChilds(4));
	});


	it('should add item as last child when calling addChild', function() {
		ctrl.item.childs = getChilds(4);
		ctrl.addChild();
		expect(ctrl.item.childs.length).toEqual(5);
		expect(ctrl.item.childs[4].name).toEqual('Child of Test Item');
	})

	it('should call parents addChildAt with items index, when calling addSiblingBefore', function(){
		spyOn(parentCtrl, 'addChildAt');
		ctrl.addSiblingBefore();
		expect(parentCtrl.addChildAt).toHaveBeenCalledWith(3);
	});

	it('should call parents addChildAt with items index + 1, when calling addSiblingAfter', function(){
		spyOn(parentCtrl, 'addChildAt');
		ctrl.addSiblingAfter();
		expect(parentCtrl.addChildAt).toHaveBeenCalledWith(4);
	});

	it('should call parents removeChildAt with items index, when calling remove', function() {
		spyOn(parentCtrl, 'removeChildAt');
		ctrl.remove();
		expect(parentCtrl.removeChildAt).toHaveBeenCalledWith(3);
	});


});