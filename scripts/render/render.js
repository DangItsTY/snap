function render(list) {
	for (var i = 0; i < list.length; i++) {
		var object = list[i];
		var element = object.element;
		//element.style.left = object.x + "px";
		//element.style.top = object.y + "px";
		element.style.left = object.x - (object.width / 2) + "px";
		element.style.top = object.y - (object.height / 2) + "px";
	}
}

function renderHud() {
	var element = document.getElementById("points");
	element.innerHTML = points;
}

function renderAttach(list) {
	for (var i = 0; i < list.length; i++) {
		var object = list[i];
		var element = document.createElement("div");
		element.style.width = object.width + "px";
		element.style.height = object.height + "px";
		element.style.position = "absolute";
		element.style.left = "0px";
		element.style.top = "0px";
		element.style.backgroundColor = "rgba("+object.red+", "+object.green+", "+object.blue+", 1.0)";
		//element.style.borderRadius = "5px";
		
		list[i].element = element;
		
		CONTENT_LAYER.appendChild(list[i].element);
	}
}

//	need to break up the concept of render so that i have a DOM specific renderer. dom and element stuff shouldn't be core.