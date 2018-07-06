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
		x: object.x + (object.width / 2),
		y: object.y + (object.height / 2),
		width: 20,
		height: 20,
		direction: object.vx < 0 ? "right" : "left"
	}));
	renderAttach([OBJECTS[OBJECTS.length-1]]);
}

//	not sure what to do with this file.. it's like a middle system between the controls system
//	and the physics system...