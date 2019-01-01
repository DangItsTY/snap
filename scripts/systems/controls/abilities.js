function moveLeft(object) {
	object.vx = object.speed * -1;
}

function moveRight(object) {
	object.vx = object.speed;
}

function jump(object) {
	object.vy = -1 * object.jump;
}

function shoot(object) {
	var owner = object.owner;
	OBJECTS.push(make("projectile", {
		x: owner.direction == 1 ? owner.x + (owner.width / 2) : owner.x - (owner.width / 2),
		y: owner.y,
		width: BLOCK_SIZE,
		height: BLOCK_SIZE / 4,
		direction: owner.direction
	}));
	renderAttach([OBJECTS[OBJECTS.length-1]]);
}

function slash(object) {
	OBJECTS.push(make("projectile", {
		x: object.direction == 1 ? object.x + (object.width / 2) : object.x - (object.width / 2),
		y: object.y,
		width: 20,
		height: 50,
		speed: 0,
		direction: object.direction,
		target: object
	}));
	renderAttach([OBJECTS[OBJECTS.length-1]]);
}

function stab(object) {
	var owner = object.owner;
	OBJECTS.push(make("projectile", {
		x: owner.direction == 1 ? owner.x + (owner.width / 2) : owner.x - (owner.width / 2),
		y: owner.y,
		width: BLOCK_SIZE,
		height: BLOCK_SIZE / 4,
		speed: 0,
		direction: owner.direction,
		target: owner,
		item: object,
		red: 255,
		green: 255,
		blue: 255,
		timer: 100
	}));
	renderAttach([OBJECTS[OBJECTS.length-1]]);
}

function pickup(object) {
	for (var i = 0; i < object.collisions.length; i++) {
		var target = object.collisions[i];
		if (target.type == "item") {
			var inventoryTop = object.inventory[object.inventory.length - 1];
			if (inventoryTop != undefined &&
					inventoryTop.name == target.name &&
					inventoryTop.stack > 0) {
				inventoryTop.stack++;
				target.isAlive = false;
			} else {
				target.x = 0;
				target.y = 0;
				//object.item = target; // this would automatically equip item
				object.inventory.push(target);
				target.owner = object;
			}
			i = object.collisions.length;
		}
	}
}

function combine(equip, pocket) {
	if (equip.name == "crossbow" && pocket.name == "stake") {
		var slots = equip.stackMax - equip.stack;
		var remaining = pocket.stack / slots;
		if (remaining >= 1) {
			equip.stack = equip.stackMax;
			pocket.stack -= slots;
		} else {
			remaining = pocket.stack % slots;
			equip.stack += remaining;
			pocket.stack = 0;
		}
	}
}

function drop(object) {
	var target = object.inventory[object.selection];
	target.x = target.owner.x;
	target.y = target.owner.y;
	target.owner = null;
	object.inventory.splice(object.selection, 1);
}

function inventoryCycle(object, count) {
	object.inventoryMode = true;
	object.inventoryModeTimer = object.inventoryModeTimerMax;
	object.selection += count;
	if (object.selection < 0) {
		object.selection = object.inventory.length - 1;
	} else if (object.selection >= object.inventory.length) {
		object.selection = 0;
	}
}

function selectorEdit(object) {
	var gridx = Math.floor(object.x / BLOCK_SIZE);
	var gridy = Math.floor(object.y / BLOCK_SIZE);
	
	EDITORGRID[gridy][gridx] = object.selection;
	
	//	i'm not cleaning up objects, just adding them on top so watch out for this memory leak

	OBJECTS.push(make("basic", {
		name: OBJECTMAP[object.selection],
		x: gridx * BLOCK_SIZE,
		y: gridy * BLOCK_SIZE,
		width: BLOCK_SIZE,
		height: BLOCK_SIZE
	}));
	renderAttach([OBJECTS[OBJECTS.length-1]]);
}

function editorSelection(e) {
	PLAYER.selection = e.target.getAttribute("value");
}


//	not sure what to do with this file.. it's like a middle system between the controls system
//	and the physics system...