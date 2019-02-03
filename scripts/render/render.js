function render(list) {
	for (var i = 0; i < list.length; i++) {
		var object = list[i];
		var element = object.element;
		//element.style.left = object.x - (object.width / 2) + "px";
		//element.style.top = object.y - (object.height / 2) + "px";
		
		//element.style.top = object.y - (object.height / 2) - CAMERA.offsetY + "px";
		element.style.top = (object.y * CAMERA_SIZE) - ((object.height * CAMERA_SIZE) / 2) + "px";
		element.style.backgroundPosition = object.imageX * BLOCK_SIZE * CAMERA_SIZE + "px " + object.imageY * BLOCK_SIZE * CAMERA_SIZE+ "px";
		if (CAMERA.mode == "follow" && object == PLAYER) {
			element.style.left = "375px";
		} else {
			element.style.left = (object.x * CAMERA_SIZE) - ((object.width * CAMERA_SIZE) / 2) - CAMERA.offsetX + "px";
			
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
	//	health
	var element = document.getElementById("health");
	element.innerHTML = Math.floor(PLAYER.health);
	
	//	inventory
	var element = document.getElementById("inventory");
	var result = "";
	var inventory = PLAYER.inventory;
	for (var i = 0; i < inventory.length; i++) {
		if (i == PLAYER.selection && PLAYER.inventoryMode) {
			result = result + "*" + inventory[i].name + inventory[i].stack + "*, ";
		} else {
			result = result + inventory[i].name + +inventory[i].stack + ", ";
		}
	}
	element.innerHTML = result;
	
	element = document.getElementById("equip");
	result = "";
	if (PLAYER.item) {
		result = PLAYER.item.name;
	}
	element.innerHTML = result;
	
	element = document.getElementById("pocket");
	result = "";
	if (PLAYER.pocket) {
		result = PLAYER.pocket.name;
	}
	element.innerHTML = result;
}

function renderAttach(list) {
	for (var i = 0; i < list.length; i++) {
		var object = list[i];
		var element = document.createElement("div");
		element.style.width = object.width * CAMERA_SIZE + "px";
		element.style.height = object.height * CAMERA_SIZE+ "px";
		element.style.position = "absolute";
		element.style.left = "0px";
		element.style.top = "0px";
		if (object.image.length > 0) {
			element.style.backgroundImage = "url('" + IMAGEPATH + object.image + "')";
			element.style.backgroundSize = "cover";
			//element.style.filter = "brightness(50%)";
		} else {
			element.style.backgroundColor = "rgba("+object.red+", "+object.green+", "+object.blue+", "+object.alpha+")";
		}
		//element.style.borderRadius = "5px";
		
		list[i].element = element;
		
		CONTENT_LAYER.appendChild(list[i].element);
	}
}

function renderInit() {
	var main = document.getElementById("container");
	main.style.width = GAME_WIDTH * CAMERA_SIZE + "px";
	main.style.height = GAME_HEIGHT * CAMERA_SIZE + "px";
}

function renderEditor() {
	var selections = document.getElementById("selections");
	for (var i = 0; i < OBJECTMAP.length; i++) {
		var index = "" + i;
		var element = document.createElement("button");
		element.style.backgroundImage = "url('" + IMAGEPATH + OBJECTMAP[i] + ".png" + "')";
		element.style.width = BLOCK_SIZE + "px";
		element.style.height = BLOCK_SIZE + "px";
		element.setAttribute("value", index);
		selections.appendChild(element);
	}
	selections = selections.getElementsByTagName("button");
	for (var i = 0; i < selections.length; i++) {
		selections[i].onclick = editorSelection;
	}
}

//	need to break up the concept of render so that i have a DOM specific renderer. dom and element stuff shouldn't be core.