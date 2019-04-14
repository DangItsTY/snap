function moveLeft(object) {
	object.vx = object.speed * -1;
	var walkSE = document.getElementById("walk");
	walkSE.volume = 0.5;
	walkSE.loop = true;
	walkSE.play();
}

function moveRight(object) {
	object.vx = object.speed;
	var walkSE = document.getElementById("walk");
	walkSE.volume = 0.5;
	walkSE.loop = true;
	walkSE.play();
}

function jump(object) {
	object.vy = -1 * object.jump;
	var jumpSE = document.getElementById("jump");
	jumpSE.currentTime = 0;
	jumpSE.volume = 0.5;
	jumpSE.play();
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

function build(object) {
	var owner = object.owner;
	OBJECTS.push(make("wall", {
		name: object.name,
		x: owner.direction == 1 ? owner.x + (owner.width / 2) : owner.x - (owner.width / 2),
		y: owner.y,
		width: BLOCK_SIZE,
		height: BLOCK_SIZE,
		direction: owner.direction,
		red: 255,
		green: 255,
		blue: 255
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

function lift(object) {
	for (var i = 0; i < object.collisions.length; i++) {
		var target = object.collisions[i];
		if (target.type == "body") {
			object.held = target;
			target.owner = object;
			object.isHolding = true;
			i = object.collisions.length;
		}
	}
}

function toss(object) {
	object.held.owner = null;
	object.held = null;
	object.isHolding = false;
}

function match(object) {
	for (var i = 0; i < object.collisions.length; i++) {
		var target = object.collisions[i];
		if (target.type == "body") {
			target.isAlive = false;
			i = object.collisions.length;
			return true;
		}
		if (target.type == "mound") {
			target.pile = target.pile - 1;
			i = object.collisions.length;
			return true;
		}
	}
}

function mop(object) {
	for (var i = 0; i < object.collisions.length; i++) {
		var target = object.collisions[i];
		if (target.type == "blood") {
			target.isAlive = false;
			i = object.collisions.length;
			return target;
		}
	}
	return null;
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
	} else if (equip.name == "mop" && pocket.name == "jar") {
		equip.isSoaked = false;
		pocket.isFilled = true;
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