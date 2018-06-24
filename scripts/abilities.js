



function moveLeft(object) {
	object.vx = object.speed * -1;
	if (object.floorTarget) {
		if (object.vx > 0) {
			object.vx = object.vx - (mod * object.floorTarget.friction * object.speed);
		}
	}
}

function moveRight(object) {
	object.vx = object.speed;
	if (object.floorTarget) {
		if (object.vx < 0) {
			object.vx = object.vx + (mod * object.floorTarget.friction * object.speed);
		}
	}
}

function jump(object) {
	object.vy = -1 * object.jump;
	onAir(object);
}

//	not sure what to do with this file.. it's like a middle system between the controls system
//	and the physics system...