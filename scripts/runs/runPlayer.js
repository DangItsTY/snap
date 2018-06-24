function runPlayer(player) {
	if ((keysDown[keyMap.jump] || touchRight) && !player.gravity && player.jumpReady) {
		jump(player);
		//jumpAudio.currentTime = 0;
		//jumpAudio.play();
	}
	if ((keysDown[keyMap.jump] || touchRight)) {
		player.jumpReady = false;
	}
	if ((keysUp[keyMap.jump] && !touchRight)) {
		player.jumpReady = true;
	}
	
	if ((keysDown[keyMap.left] || touchMoveLeft)) {
		//player.speed = player.speed_init;
		moveLeft(player);
	} else if ((keysDown[keyMap.right] || touchMoveRight)) {
		//player.speed = player.speed_init;
		moveRight(player);
	} else {
		player.vx = 0;
	}
	
	stickToFloor(player);
	
	log("y", player.y);
	log("x", player.element.style.left);
	log("keyleft", keysDown[keyMap.left]);
	log("keyright", keysDown[keyMap.right]);
	log("vx", player.vx);
	log("vy", player.vy);
	log("lift", player.lift);
}

function stickToFloor(object) {
	if (object.floorTarget) {
		object.y = object.floorTarget.y - object.height;
	}
}

//	not sure how this will relate to the control system yet...