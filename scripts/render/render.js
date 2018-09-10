function render(list) {
	for (var i = 0; i < list.length; i++) {
		var object = list[i];
		var element = object.element;
		//element.style.left = object.x - (object.width / 2) + "px";
		//element.style.top = object.y - (object.height / 2) + "px";
		
		//element.style.top = object.y - (object.height / 2) - CAMERA.offsetY + "px";
		element.style.top = object.y - (object.height / 2) + "px";
		if (object == PLAYER) {
			element.style.left = "375px";
		} else {
			element.style.left = object.x - (object.width / 2) - CAMERA.offsetX + "px";
			
			//	show the wrapping area
			var wrapLength = (CAMERA.x + (CAMERA.viewWidth / 2)) - GAME_BOUNDARY;
			if (object.x - (object.width) <= wrapLength) {
				element.style.left = CAMERA.viewWidth - wrapLength + object.x - (object.width / 2) + "px";
			}
			wrapLength = 0 - (CAMERA.x - (CAMERA.viewWidth / 2));
			if (object.x + (object.width) >= GAME_BOUNDARY - wrapLength) {
				element.style.left = 0 + wrapLength - (GAME_BOUNDARY - object.x) - (object.width / 2) + "px";
			}
		}
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
		if (object.image.length > 0) {
			console.log(object.image);
			element.style.backgroundImage = "url('" + IMAGEPATH + object.image + "')";
			element.style.backgroundSize = "cover";
		} else {
			element.style.backgroundColor = "rgba("+object.red+", "+object.green+", "+object.blue+", 1.0)";
		}
		//element.style.borderRadius = "5px";
		
		list[i].element = element;
		
		CONTENT_LAYER.appendChild(list[i].element);
	}
}

//	need to break up the concept of render so that i have a DOM specific renderer. dom and element stuff shouldn't be core.