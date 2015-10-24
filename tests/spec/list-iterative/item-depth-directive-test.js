describe('Unit: egItemDepth', function() {

	var	$compile,
		$rootScope;

	beforeEach(module('egListIterative'));

	beforeEach(inject(function(_$compile_, _$rootScope_) {
		$compile = _$compile_;
		$rootScope = _$rootScope_;
	}));

 	function createElem(depth) {
		var element = $compile('<div eg-item-depth depth="'+depth+'" ></div>')($rootScope);
		return element;
	};

	it('should have 0 padding left if depth is 0', function(){
		var elem = createElem(0);
		var pl = angular.element(elem).css('padding-left');
		expect(pl).toEqual('0px');
	});

	it('each next depth level, has larger padding from left', function(){
		var elem, pl;
		var previous = 0;
		for(var i = 1; i < 20; i++) {
			elem = createElem(i);
			pl = angular.element(elem).css('padding-left');
			pl = pl.replace('px', '');
			expect(Number(pl)).toBeGreaterThan(previous);
			previous = Number(pl);
		}
	});

});