function runControls(player) {
	if (player.collisionFloor != null && (keysUp[keyMap.jump])) {
		player.jumpReady = true;
	}
	
	if ((keysDown[keyMap.jump] || touchRight) && player.jumpReady) {
		jump(player);
		player.jumpReady = false;	
		player.collisionFloor = null;
	}
	
	/*
	if ((keysDown[keyMap.jump] || touchRight)) {
		player.jumpReady = false;
	}
	if ((keysUp[keyMap.jump] && !touchRight)) {
		player.jumpReady = true;
	}
	*/
	
	if ((keysDown[keyMap.left] || touchMoveLeft)) {
		moveLeft(player);
	} else if ((keysDown[keyMap.right] || touchMoveRight)) {
		moveRight(player);
	} else {
		player.vx = 0;
	}
		
	log("y", player.y);
	log("x", player.element.style.left);
	log("keyleft", keysDown[keyMap.left]);
	log("keyright", keysDown[keyMap.right]);
	log("vx", player.vx);
	log("vy", player.vy);
	log("lift", player.lift);
}