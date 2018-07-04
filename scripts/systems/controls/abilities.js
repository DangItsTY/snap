function moveLeft(object) {
	object.vx = object.speed * -1;
}

function moveRight(object) {
	object.vx = object.speed;
}

function jump(object) {
	object.vy = -1 * object.jump;
}

//	not sure what to do with this file.. it's like a middle system between the controls system
//	and the physics system...