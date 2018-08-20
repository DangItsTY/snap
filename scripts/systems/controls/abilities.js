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
	OBJECTS.push(make("projectile", {
		x: object.direction == 1 ? object.x + (object.width / 2) : object.x - (object.width / 2),
		y: object.y,
		width: 20,
		height: 20,
		direction: object.direction
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

function pickup(object) {
	for (var i = 0; i < object.collisions.length; i++) {
		var target = object.collisions[i];
		if (target.type == "item") {
			target.x = 0;
			target.y = 0;
			object.item = target;
			target.owner = object;
			console.log("picked up!");
		}
	}
}

function drop(object) {
	if (object.item != null) {
		var target = object.item;
		target.x = target.owner.x;
		target.y = target.owner.y;
		target.owner = null;
		object.item = null;
	}
}

//	not sure what to do with this file.. it's like a middle system between the controls system
//	and the physics system...