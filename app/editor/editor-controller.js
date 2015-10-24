function egEditorController(egEditorData) {

	this.data = egEditorData;

	this.isActive = function() {
		return (this.data.editableItem) ? true : false;
	}

	this.addSiblingBefore = function() {
		this.data.addSiblingBefore();
	};

	this.addSiblingAfter = function() {
		this.data.addSiblingAfter();
	};

	this.addChild = function() {
		this.data.addChild();
	};

	this.remove = function() {
		this.data.remove();
		this.data.clear();
	};
}

angular.module('egEditor').controller('egEditorController', ['egEditorData', egEditorController]);