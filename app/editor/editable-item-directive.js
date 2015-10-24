
function egEditableItem(egEditorData) {
	return {
		restrict: 'A',
		scope : {
			editableItem : '=',
			addChild : '&',
			addSiblingBefore : '&',
			addSiblingAfter : '&',
			remove : '&'
		},
		link: function(scope, element, attrs) {
			element.on('click', function() {
				egEditorData.editableItem = scope.editableItem;
				egEditorData.addChild = scope.addChild;
				egEditorData.addSiblingBefore = scope.addSiblingBefore;
				egEditorData.addSiblingAfter = scope.addSiblingAfter;
				egEditorData.remove = scope.remove;
				scope.$apply();
			});
		}
	};
}


angular.module('egEditor').directive('egEditableItem', ['egEditorData', egEditableItem]);