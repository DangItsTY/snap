function runCollision(objects) {
	//	reset collision info
	for (var i = 0; i < objects.length; i++) {
		objects[i].collisions = [];
	}
	
	//	set collision info
	for (var i = 0; i < objects.length; i++) {
		for (var j = i+1; j < objects.length; j++) {
			if (isCollidingAnywhere(objects[i], objects[j])) {
				objects[i].collisions.push(objects[j]);
				objects[j].collisions.push(objects[i]);
			}
		}
	}
	
	//	do all objects' collisions
	for (var i = 0; i < objects.length; i++) {
		var target = objects[i];
		target.runCollide();
	}
}




//	clean all of this stuff at some point...


var PLATFORMHEIGHT = 10;
var isColliding = false;
function runCollidePlatform(object, list) {
	isColliding = false;
	for (var i = 0; i < list.length; i++) {
		var target = list[i];
		if (isCollidingAnywhere(object, target)) {
			target.runCollide(object);
			specialStart(target);
		}
	}
	if (!isColliding) {
		onAir(object);
	}
	log("colliding", isColliding);
}

function isCollidingWithFloor(object, target) {
	var bufferWidth = 0.1;
	var bufferHeight = 0.4;
	var sourceVertices = [
		{'x': object.x - (object.width * bufferWidth), 'y': object.y + (object.height * bufferHeight)},
		{'x': object.x + (object.width * bufferWidth), 'y': object.y + (object.height * bufferHeight)},
		{'x': object.x + (object.width * bufferWidth), 'y': object.y - (object.height / 2) + object.height},
		{'x': object.x - (object.width * bufferWidth), 'y': object.y - (object.height / 2) + object.height}
	];
	var targetVertices = [
		{'x': target.x - (target.width / 2), 'y': target.y - (target.height / 2)},
		{'x': target.x - (target.width / 2) + target.width, 'y': target.y - (target.height / 2)},
		{'x': target.x - (target.width / 2) + target.width, 'y': target.y - (target.height / 2) + target.height},
		{'x': target.x - (target.width / 2), 'y': target.y - (target.height / 2) + target.height}
	];
	return object != target &&
		(pointInSquareCollision(sourceVertices.slice(0, 1), targetVertices) || pointInSquareCollision(sourceVertices.slice(1, 2), targetVertices) ||
		pointInSquareCollision(sourceVertices.slice(2, 3), targetVertices) || pointInSquareCollision(sourceVertices.slice(3, 4), targetVertices));
}

function isCollidingWithWallRight(object, target) {
	var buffer = 0.5;
	var bufferHeight = 0.1
	var sourceVertices = [
		{'x': object.x + (object.width * buffer), 'y': object.y - (object.height * bufferHeight)},
		{'x': object.x - (object.width / 2) + object.width, 'y': object.y - (object.height * bufferHeight)},
		{'x': object.x - (object.width / 2) + object.width, 'y': object.y + (object.height * bufferHeight)},
		{'x': object.x + (object.width * buffer), 'y': object.y + (object.height * bufferHeight)}
	];
	var targetVertices = [
		{'x': target.x - (target.width / 2), 'y': target.y - (target.height / 2)},
		{'x': target.x - (target.width / 2) + target.width, 'y': target.y - (target.height / 2)},
		{'x': target.x - (target.width / 2) + target.width, 'y': target.y - (target.height / 2) + target.height},
		{'x': target.x - (target.width / 2), 'y': target.y - (target.height / 2) + target.height}
	];
	return object != target &&
		(pointInSquareCollision(sourceVertices.slice(0, 1), targetVertices) || pointInSquareCollision(sourceVertices.slice(1, 2), targetVertices) ||
		pointInSquareCollision(sourceVertices.slice(2, 3), targetVertices) || pointInSquareCollision(sourceVertices.slice(3, 4), targetVertices));
}

function isCollidingWithWallLeft(object, target) {
	var buffer = 0.4;
	var bufferHeight = 0.1
	var sourceVertices = [
		{'x': object.x - (object.width / 2), 'y': object.y - (object.height * bufferHeight)},
		{'x': object.x - (object.width * buffer), 'y': object.y - (object.height * bufferHeight)},
		{'x': object.x - (object.width * buffer), 'y': object.y + (object.height * bufferHeight)},
		{'x': object.x - (object.width / 2), 'y': object.y + (object.height * bufferHeight)}
	];
	var targetVertices = [
		{'x': target.x - (target.width / 2), 'y': target.y - (target.height / 2)},
		{'x': target.x - (target.width / 2) + target.width, 'y': target.y - (target.height / 2)},
		{'x': target.x - (target.width / 2) + target.width, 'y': target.y - (target.height / 2) + target.height},
		{'x': target.x - (target.width / 2), 'y': target.y - (target.height / 2) + target.height}
	];
	return object != target &&
		(pointInSquareCollision(sourceVertices.slice(0, 1), targetVertices) || pointInSquareCollision(sourceVertices.slice(1, 2), targetVertices) ||
		pointInSquareCollision(sourceVertices.slice(2, 3), targetVertices) || pointInSquareCollision(sourceVertices.slice(3, 4), targetVertices));
}

function isCollidingAnywhere(object, target) {
	var sourceVertices = [
		{'x': object.x - (object.width / 2), 'y': object.y - (object.height / 2)},
		{'x': object.x - (object.width / 2) + object.width, 'y': object.y - (object.height / 2)},
		{'x': object.x - (object.width / 2) + object.width, 'y': object.y - (object.height / 2) + object.height},
		{'x': object.x - (object.width / 2), 'y': object.y - (object.height / 2) + object.height}
	];
	var targetVertices = [
		{'x': target.x - (target.width / 2), 'y': target.y - (target.height / 2)},
		{'x': target.x - (target.width / 2) + target.width, 'y': target.y - (target.height / 2)},
		{'x': target.x - (target.width / 2) + target.width, 'y': target.y - (target.height / 2) + target.height},
		{'x': target.x - (target.width / 2), 'y': target.y - (target.height / 2) + target.height}
	];
	return object != target &&
		(pointInSquareCollision(sourceVertices.slice(0, 1), targetVertices) || pointInSquareCollision(sourceVertices.slice(1, 2), targetVertices) ||
		pointInSquareCollision(sourceVertices.slice(2, 3), targetVertices) || pointInSquareCollision(sourceVertices.slice(3, 4), targetVertices));
}

function onFloor(object, target) {
	object.floorTarget = target;
	object.vy = 0;
	object.gravity = null;
	object.lift = null;
	object.parachuteReady = false;
}

function onAir(object) {
	object.gravity = object.gravity_init;
	object.floorTarget = null;
}

function specialStart(object) {
	if (object == theStartPlatform) {
		gameState = "play";
	}
}

function pointInSquareCollision_old(sourceVertices, targetVertices) {
	//  Implementing a "Point in Polygon" using a ray casting to the right algorithm.
	//  If any source points pass the test, then collision is true
	//  Winding order is top left, clockwise
	var collided = false;
	for (var i = 0; i < sourceVertices.length; i++) {
	  for (var j = 0; j < targetVertices.length; j++) {
		var p = sourceVertices[i];
		var v1 = targetVertices[j];
		var v2 = targetVertices[j + 1] || targetVertices[0];
		if (
		  ((p.x > v1.x) != (p.x > v2.x)) &&
		  (p.y < v1.y)
		) {
		  collided = !collided;
		}
	  }
	  if (collided) {
		return collided;
	  }
	}
	return false;
}

function pointInSquareCollision(sourceVertices, targetVertices) {
	//	targetVertices expects four points, starting top left going clockwise
	var top = targetVertices[0].y;
	var bottom = targetVertices[2].y;
	var left = targetVertices[0].x;
	var right = targetVertices[2].x;
	for (var i = 0; i < sourceVertices.length; i++) {
		var p = sourceVertices[i];
		if (p.x > left && p.x < right && p.y > top && p.y < bottom) {
			return true;
		}
	}
	return false;
}

function pointInLineCollision(source, targetMin, targetMax) {
	if (source > targetMin && source < targetMax) {
		return true;
	} else {
		return false;
	}
}