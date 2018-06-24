function render(list) {
	for (var i = 0; i < list.length; i++) {
		var object = list[i];
		var element = object.element;
		element.style.left = object.x + "px";
		element.style.top = object.y + "px";
	}
}

function renderHud() {
	var element = document.getElementById("points");
	element.innerHTML = points;
}

function renderAttach(list) {
	for (var i = 0; i < list.length; i++) {
		CONTENT_LAYER.appendChild(list[i].element);
	}
}

//	need to break up the concept of render so that i have a DOM specific renderer. dom and element stuff shouldn't be core.