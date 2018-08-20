function runControls(player) {
	if (player.collisionFloor != null && (keysUp[keyMap.jump])) {
		player.jumpReady = true;
	}
	
	if ((keysDown[keyMap.jump] || touchRight) && player.jumpReady) {
		jump(player);
		player.jumpReady = false;	
		player.collisionFloor = null;
	}
	
	if (keysDown[keyMap.use] && player.useReady) {
		player.item.use();
		player.useReady = false;
	}
	
	if (keysUp[keyMap.use] && player.item != null) {
		player.useReady = true;
	}
	
	if (keysDown[keyMap.pickup] && player.pickupReady) {
		pickup(player);
		player.pickupReady = false;
	}
	
	if (keysUp[keyMap.pickup]) {
		player.pickupReady = true;
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
	log("x", player.x);
	log("keyleft", keysDown[keyMap.left]);
	log("keyright", keysDown[keyMap.right]);
	log("vx", player.vx);
	log("vy", player.vy);
}