function runPhysics(list) {
	gravity(list);
	move(list);
	direction(list);
	//wrap(list);

	function gravity(list) {
		for (var i = 0; i < list.length; i++) {
			var object = list[i];
			object.vy = object.vy + (object.weight * mod);
		}
	}

	function move(list) {
		for (var i = 0; i < list.length; i++) {
			list[i].x = list[i].x + (list[i].vx * mod);
			list[i].y = list[i].y + (list[i].vy * mod);
		}
	}
	
	function direction(list) {
		for (var i = 0; i < list.length; i++) {
			if (list[i].vx > 0) {
				list[i].direction = 1;
			} else if (list[i].vx < 0) {
				list[i].direction = -1;
			}
		}
	}
	
	function wrap(list) {
		for (var i = 0; i < list.length; i++) {
			if (list[i].x > GAME_BOUNDARY) {
				list[i].x = list[i].x - GAME_BOUNDARY;
			} else if (list[i].x < 0) {
				list[i].x = list[i].x + GAME_BOUNDARY;
			}
		}
	}
}

function runPhysicsCollision(list) {
	stick(list);
	wall(list);
	stack(list);
	
	function stick(list) {
		for (var i = 0; i < list.length; i++) {
			var object = list[i];
			var target = object.collisionFloor;
			
			//	first check if object is on a floor
			var isOnFloor = 0;
			for (var j = 0; j < object.collisions.length; j++) {
				target = object.collisions[j];
				if (target.type == "platform") {
						isOnFloor += 1;
				}
			}
			if (isOnFloor == 0) {
				object.collisionFloor = null;
			}
			target = object.collisionFloor;
			
			//	then check if floor should be ignored
			if (target == object.collisionFloorIgnored) {
				target = null;
			}
			
			if (target == null) {
					if (object.vy > 0) {
					//	do not apply gravity if object is colliding with a platform
					for (var j = 0; j < object.collisions.length; j++) {
						target = object.collisions[j];

						if ((target.type == "platform" || target.type == "wall") && isCollidingWithFloor(object, target) && target != object.collisionFloorIgnored) {
							object.collisionFloor = target;
							object.vy = 0;
							object.y = target.y - (target.height / 2) - (object.height / 2);
						}
					}
				}
			} else {
				object.vy = 0;
				object.y = target.y - (target.height / 2) - (object.height / 2);
			}
		}
	}
	
	function stack(list) {
		for (var i = 0; i < list.length; i++) {
			var object = list[i];
			var target = object.collisionFloor;
			
			if (object.type == "enemy") {
				//	first check if object is on a floor
				var isOnFloor = 0;
				for (var j = 0; j < object.collisions.length; j++) {
					target = object.collisions[j];
					if (target.type == "enemy") {
							isOnFloor += 1;
					}
				}
				if (isOnFloor == 0) {
					object.collisionFloor = null;
				}
				target = object.collisionFloor;
				
				if (target == null) {
						if (object.vy > 0) {
						//	do not apply gravity if object is colliding with a zombie
						for (var j = 0; j < object.collisions.length; j++) {
							target = object.collisions[j];
							if (target.type == "enemy" && isCollidingWithFloor(object, target)) {
								object.collisionFloor = target;
								object.vy = 0;
								object.y = target.y - (target.height / 2) - (object.height / 2);
							}
						}
					}
				} else {
					object.vy = 0;
					object.y = target.y - (target.height / 2) - (object.height / 2);
				}
			}
		}
	}
	
	function wall(list) {
		for (var i = 0; i < list.length; i++) {
			var object = list[i];
			
			for (var j = 0; j < object.collisions.length; j++) {
				target = object.collisions[j];
				if (target.type == "wall" && isCollidingWithWallRight(object, target)) {
					object.vx = 0;
					object.x = target.x - (target.width / 2) - (object.width / 2);
				} else if (target.type == "wall" && isCollidingWithWallLeft(object, target)) {
					object.vx = 0;
					object.x = target.x + (target.width / 2) + (object.width / 2);
				}
			}
		}
	}
}