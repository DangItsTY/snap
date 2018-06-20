function moveLeft(object) {
	object.vx = object.vx - (mod * object.speed);
	if (object.floorTarget) {
		if (object.vx > 0) {
			object.vx = object.vx - (mod * object.floorTarget.friction * object.speed);
		}
	}
}

function moveRight(object) {
	object.vx = object.vx + (mod * object.speed);
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