angular.module('egEditor').factory('egEditorData', function ()
{
	var factory = {
		editableItem: null,
		addChild: null,
		addSiblingAfter: null,
		addSiblingBefore: null,
		remove: null,

		clear: function() {
			factory.editableItem = null;
			factory.addChild = null;
			factory.addSiblingAfter = null;
			factory.addSiblingBefore = null;
			factory.remove = null;
		}
	};
	
	return factory;
});