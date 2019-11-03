function runControls(player) {
	//	jump
	if (player.collisionFloor != null && (keysUp[keyMap.jump])) {
		player.jumpReady = true;
		
		player.collisionFloorIgnored = null;
		player.jumpDownReady = true;
	}
	if (keysDown[keyMap.down] && keysDown[keyMap.jump] && player.jumpDownReady) {
		if (player.collisionFloor && player.collisionFloor.type == "platform") {
			player.collisionFloorIgnored = player.collisionFloor;
			player.collisionFloor = null;
		}
		player.jumpDownReady = false;
	}
	if (keysDown[keyMap.jump] && player.jumpReady && player.jumpDownReady) {
		if (player.jumpTimer == -1) player.jumpTimer = player.jumpTimerMax;
		
		if (player.jumpTimer < 0) {
			jump(player);
			player.jumpReady = false;
			player.collisionFloor = null;
			player.jumpTimer = -1;
		}
	}
	if (keysUp[keyMap.jump] && player.jumpTimer >= 0) {
		jumpShort(player);
		player.jumpReady = false;
		player.collisionFloor = null;
		player.jumpTimer = -1;
	}
	
	//	dodge
	if (keysDown[keyMap.down] && player.dodgeReady) {
		dodge(player);
		player.dodgeReady = false;
	}
	if (keysUp[keyMap.down]) {
		player.dodgeReady = true;
	}
	
	if (keysDown[keyMap.use] && player.useReady && !player.inventoryMode) {
		if (player.item != null) {
			player.item.use();
			player.animation = player.animationLock = "using";
		} else {
			punch(player);
			player.animation = player.animationLock = "using";
		}
		log("use", "active");
		player.useReady = false;
	}
	
	if (keysUp[keyMap.use] && !player.inventoryMode) {
		log("use", "ready");
		player.useReady = true;
	}
	
	if (keysDown[keyMap.equip] && player.equipReady && player.inventoryMode && player.inventory.length > 0) {
		player.equipTimer = 0;
		player.equipReady = false;
		
		player.inventoryMode = true;
		player.inventoryModeTimer = player.inventoryModeTimerMax;
	}
	
	if (keysUp[keyMap.equip] && player.inventoryMode) {
		player.equipTimer = -1;
		player.equipReady = true;
	}
	
	if (keysDown[keyMap.pocket] && player.pocketReady && player.inventoryMode && player.inventory.length > 0) {
		player.pocketTimer = 0;
		player.pocketReady = false;
		
		player.inventoryMode = true;
		player.inventoryModeTimer = player.inventoryModeTimerMax;
	}
	
	if (keysUp[keyMap.pocket] && player.inventoryMode) {
		player.pocketTimer = -1;
		player.pocketReady = true;
	}
	
	if (keysDown[keyMap.switch] && player.switchReady && !player.inventoryMode) {
		var temp = player.item;
		player.item = player.pocket;
		player.pocket = temp;
		player.switchReady = false;
	}
	
	if (keysUp[keyMap.switch] && !player.inventoryMode) {
		player.switchReady = true;
	}
	
	if (keysDown[keyMap.combine] && player.combineReady && !player.inventoryMode) {
		player.combineTimer = 0;
		player.combineReady = false;
	}
	
	if (keysUp[keyMap.combine] && !player.inventoryMode) {
		player.combineTimer = -1;
		player.combineReady = true;
	}
	
	if (keysDown[keyMap.pickup] && player.pickupReady && !player.inventoryMode) {
		pickup(player);
		player.pickupReady = false;
	}
	
	if (keysUp[keyMap.pickup] && !player.inventoryMode) {
		player.pickupReady = true;
	}
	
	if (keysDown[keyMap.lift] && player.liftReady && !player.isHolding && !player.inventoryMode) {
		lift(player);
		player.liftReady = false;
	}
	
	if (keysUp[keyMap.lift] && !player.isHolding && !player.inventoryMode) {
		player.liftReady = true;
	}
	
	if (keysDown[keyMap.toss] && player.isHolding && player.tossReady && !player.inventoryMode) {
		toss(player);
		player.tossReady = false;
	}
	
	if (keysUp[keyMap.toss] && player.isHolding && !player.inventoryMode) {
		player.tossReady = true;
	}
	
	if (keysDown[keyMap.drop] && player.dropReady && player.inventoryMode && player.inventory.length > 0) {
		drop(player);
		player.dropReady = false;
		player.pickupReady = false;
	}
	
	if (keysUp[keyMap.drop] && player.inventoryMode) {
		player.dropReady = true;
	}
	
	if (keysDown[keyMap.cycleleft] && player.cycleleftReady && player.inventory.length > 0) {
		inventoryCycle(player, -1);
		player.cycleleftReady = false;
	}
	
	if (keysUp[keyMap.cycleleft]) {
		player.cycleleftReady = true;
	}
	
	if (keysDown[keyMap.cycleright] && player.cyclerightReady && player.inventory.length > 0) {
		inventoryCycle(player, 1);
		player.cyclerightReady = false;
	}
	
	if (keysUp[keyMap.cycleright]) {
		player.cyclerightReady = true;
	}
	
	if (keysDown[keyMap.left]) {
		moveLeft(player);
		player.animation = "walking";
	} else if (keysDown[keyMap.right]) {
		moveRight(player);
		player.animation = "walking";
	} else {
		player.vx = 0;
		player.animation = "standing";
		var walkSE = document.getElementById("walk");
		walkSE.pause();
	}
			
	log("y", player.y);
	log("x", player.x);
	log("keyleft", keysDown[keyMap.left]);
	log("keyright", keysDown[keyMap.right]);
	log("vx", player.vx);
	log("vy", player.vy);
	log("inventoryModeTimer", player.inventoryModeTimer);
	log("equipTimer", player.equipTimer);
	log("invulnerabilityTimer", player.invulnerableTimer);
	
	// for the selector in editor
	if (PLAYER.type == "selector") {
		if (keysDown["leftclick"] && !keysUp["leftclick"]) {
			selectorEdit(player);
			keysUp["leftclick"] = true;
		}
	}
}