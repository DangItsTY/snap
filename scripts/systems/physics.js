function runPhysics(list) {
	gravity(list);
	stick(list);
	move(list);
	direction(list);

	function gravity(list) {
		for (var i = 0; i < list.length; i++) {
			var object = list[i];
			object.vy = object.vy + (object.weight * mod);
		}
	}
	
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
			
			if (target == null) {
					if (object.vy > 0) {
					//	do not apply gravity if object is colliding with a platform
					for (var j = 0; j < object.collisions.length; j++) {
						target = object.collisions[j];
						if (target.type == "platform") {
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
}