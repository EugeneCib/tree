function egItemDepth()
{
	return {
		restrict: 'A',
		link: function(scope, element, attr) {
			console.log('attr.egItemDepth', attr.depth);
			element.css('padding-left', (attr.depth * 30) + 'px');
		}
	};
}


angular.module('egListIterative').directive('egItemDepth', [egItemDepth]);