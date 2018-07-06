function runPhysics(list) {
	gravity(list);
	stick(list);
	move(list);

	function gravity(list) {
		for (var i = 0; i < list.length; i++) {
			var object = list[i];
			object.vy = object.vy + (object.weight * mod);
		}
	}
	
	function stick(list) {
		for (var i = 0; i < list.length; i++) {
			var object = list[i];
			if (object.vy > 0) {
				//	do not apply gravity if object is colliding with a platform
				for (var j = 0; j < object.collisions.length; j++) {
					var target = object.collisions[j];
					if (target.type == "platform") {
						object.collisionFloor = target;
						object.vy = 0;
						object.y = target.y - object.height;
					}
				}
			}
		}
	}

	function move(list) {
		for (var i = 0; i < list.length; i++) {
			list[i].x = list[i].x + (list[i].vx * mod);
			list[i].y = list[i].y + (list[i].vy * mod);
		}
	}
}