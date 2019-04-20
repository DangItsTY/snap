function make(type, options) {	//	creates any object in the game
	//	VARIABLES
	var object = {};
	var element;
	type = type ? type : "basic";
	options = options ? options : {};
	
	
	//	INITIALIZE OBJECT
	object.type = type;
	object.name = options.name != undefined ? options.name : "";
	object.isAlive = true;
	object.element = element;
	object.image = "";
	object.imageX = 0;
	object.imageY = 0;
	object.red = 0;
	object.green = 0;
	object.blue = 255;
	object.alpha = options.alpha != undefined ? options.alpha : 1.0;
	object.speed = options.speed != undefined ? options.speed : 0;
	object.x = options.x != undefined ? options.x : GAME_WIDTH / 2;
	object.y = options.y != undefined ? options.y : GAME_HEIGHT / 2;
	object.vx = options.vx != undefined ? options.vy : 0;
	object.vy = options.vy != undefined ? options.vy : 0;
	object.direction = options.direction != undefined ? options.direction : 1;
	object.width = options.width != undefined ? options.width : 5;
	object.height = options.height != undefined ? options.height : 5;
	object.weight = 0;
	object.health = options.health != undefined ? options.health : 100;
	object.poisonTimer = 0;
	object.poisonStack = 0;
	object.invulnerableTimer = 0;
	object.invulnerableTimerMax = 2000;
	object.collisions = [];
	object.collisionFloor = null;
	object.runCollide = function() {}
	object.runAct = function() {}
	object.damage = function(attack) { attack(); }
	object.held = null;
	
	
	//	TYPES
	if (type == "basic") {
	}
	if (type == "platform") {
		object.x = options.x != undefined ? options.x : 0;
		object.y = options.y != undefined ? options.y : GAME_HEIGHT - 50;
		object.width = options.width != undefined ? options.width : GAME_WIDTH;
		object.height = options.height != undefined ? options.height : 5;
		object.alpha = options.alpha != undefined ? options.alpha : 0.0;
	}
	if (type == "wall") {
		object.x = options.x != undefined ? options.x : 0;
		object.y = options.y != undefined ? options.y : GAME_HEIGHT - 50;
		object.width = options.width != undefined ? options.width : GAME_WIDTH;
		object.height = options.height != undefined ? options.height : 50;
	}
	if (type == "player") {
		object.speed = 128;
		object.weight = 1024;
		object.image = "player.png";
		
		//	controls
		object.jump = 256;
		object.jumpReady = true;
		object.useReady = false;
		object.equipReady = true;
		object.switchReady = false;
		object.combineReady = false;
		object.pocketReady = true;
		object.pickupReady = false;
		object.dropReady = true;
		object.liftReady = true;
		object.tossReady = false;
		object.cycleleftReady = true;
		object.cyclerightReady = true;
		object.inventoryMode = false;
		object.isHolding = false;
		
		object.item = null;
		object.pocket = null;
		object.inventory = [];
		object.selection = 0;
		
		object.animation = "standing";
		object.animationFrame = 0;
		object.animationMap = {
			"standing": [{"x": 0, "y": 0}],
			"walking": [{"x": 0, "y": 0}, {"x": 0, "y": 1}]
		};
		
		//	timers
		object.inventoryModeTimer = 0;
		object.inventoryModeTimerMax = 800;
		object.equipTimer = -1;
		object.equipTimerMax = 400;
		object.pocketTimer = -1;
		object.pocketTimerMax = 200;
		object.combineTimer = -1;
		object.combineTimerMax = 200;
		object.animationTimer = 0;
		object.animationTimerMax = 200;
		
		object.runAct = function() {
			if (object.health < 0) {
				object.health = -100;	//	this indicates that the player has died
			}
			
			//	tick the timers
			if (object.invulnerableTimer > 0) {
				object.invulnerableTimer -= 1000 * mod;
			}
			if (object.inventoryModeTimer > 0) {
				object.inventoryModeTimer -= 1000 * mod;
			} else if (object.inventoryMode) {
				object.inventoryMode = false;
			}
			if (object.equipTimer >= object.equipTimerMax) {
				object.item = object.inventory[object.selection];
				object.equipTimer = -1;
				object.inventoryMode = false;
				object.inventoryModeTimer = 0;
				object.useReady = false;
			} else if (object.equipTimer >= 0) {
				object.equipTimer += 1000 * mod;
			}
			if (object.pocketTimer >= object.pocketTimerMax) {
				object.pocket = object.inventory[object.selection];
				object.pocketTimer = -1;
				object.inventoryMode = false;
				object.inventoryModeTimer = 0;
				object.switchReady = false;
			} else if (object.pocketTimer >= 0) {
				object.pocketTimer += 1000 * mod;
			}
			if (object.combineTimer >= object.combineTimerMax) {
				object.combineTimer = -1;
				object.combineReady = false;
				var temp = object.item;
				object.item = object.pocket;
				object.pocket = temp;
				combine(object.item, object.pocket);
			} else if (object.combineTimer >= 0) {
				object.combineTimer += 1000 * mod;
			}
			if (object.animationTimer >= object.animationTimerMax) {
				object.animationFrame++;
				var nextAnimationFrame = object.animationMap[object.animation];
				if (object.animationFrame >= nextAnimationFrame.length) {
					object.animationFrame = 0;
				}
				object.imageX = object.animationMap[object.animation][object.animationFrame].x;
				object.imageY = object.animationMap[object.animation][object.animationFrame].y;
				
				object.animationTimer = 0;
			} else {
				object.animationTimer += 1000 * mod;
			}
		}
		
		object.damage = function(attack) {
			if (object.invulnerableTimer <= 0) {
				attack();
				object.invulnerableTimer = object.invulnerableTimerMax;
			}
		}
	}
	if (type == "point") {
		object.runCollide = function() {
			for (var i = 0; i < object.collisions.length; i++) {
				var target = object.collisions[i];
				if (target.type == "player") {
					object.isAlive = false;
					console.log("you've got a point!");
				}
			}
		}
	}
	if (type == "enemy") {
		object.width = BLOCK_SIZE;
		object.height = BLOCK_SIZE;
		object.health = 1;
		object.speed = 64;
		object.weight = 800;
		object.red = 255;
		object.green = 50;
		object.blue = 50;
		object.timer = 0;
		object.timerMax = 1000;
		object.timerStuck = 0;
		object.timerStuckMax = 1000;
		object.stuck = false;
		object.stuckCounter = 0;
		object.prevDirection = 1;
		object.snarlTimer = 0;
		object.snarlTimerMax = 5000;
		
		if (object.x < PLAYER.x) {
			object.direction = 1;
		} else {
			object.direction = -1;
		}
		object.vx = object.direction * object.speed * 0.2;
		
		object.runAct = function() {
			// bounce off game edge
			if (object.x < 0 * BLOCK_SIZE) {
				object.direction *= -1;
				object.x = 0;
			} else if (object.x >= GAME_WIDTH) {
				object.direction *= -1;
				object.x = GAME_WIDTH;
			}
			
			if (object.timer <= 0) {
				object.vx = object.direction * object.speed * 0.2;
			} else {
				object.timer = object.timer - (1000 * mod);
			}
			
			//	stuck timer
			if (object.timerStuck <= 0) {
				if (object.stuckCounter > 0) {
					object.stuck = true;
				} else {
					object.stuck = false;
				}
				object.timerStuck = object.timerStuckMax;
				object.stuckCounter = 0;
			}
			if (object.prevDirection != object.direction) {
				object.prevDirection = object.direction;
				object.stuckCounter++;
			}
			object.timerStuck = object.timerStuck - (1000 * mod);
			
			//	snarl
			if (object.snarlTimer >= object.snarlTimerMax) {
				var snarlSE = document.getElementById("snarl");
				snarlSE.currentTime = 0;
				snarlSE.volume = 0.5;
				snarlSE.play();
				
				object.snarlTimer = 0;
			} else {
				object.snarlTimer += 1000 * mod;
			}
			
			//	death
			if (object.health <= 0) {
				object.isAlive = false;
				OBJECTS.push(make("body", {
					name: "body",
					x: object.x,
					y: object.y
				}));
				renderAttach([OBJECTS[OBJECTS.length-1]]);
			}
		}
		
		object.runCollide = function() {
			for (var i = 0; i < object.collisions.length; i++) {
				var target = object.collisions[i];
				if (target.type == "player") {
					object.vx = 0;
					if (object.timer <= 0) {
						object.timer = object.timerMax;
					}
					if (object.timer <= 500) {
						target.damage(function() {
							target.poisonStack += 1;
							console.log("poisoned!");
						});
					}
				}
				
				//	bounce off walls
				if (target.type == "wall") {
					if (isCollidingWithWallRight(object, target)) {
						object.direction *= -1;
						object.x = target.x - (target.width / 2) - (object.width / 2) - 1;
					} else if (isCollidingWithWallLeft(object, target)) {
						object.direction *= -1;
						object.x = target.x + (target.width / 2) + (object.width / 2) + 1;
					}
				}				
				
				// stack on stuck zombies
				if (target.type == "enemy" && target.stuck && !object.stuck) {
					object.y = target.y - target.height;
				} else if (target.type == "enemy") { // bounce off zombies
					if (isCollidingWithWallRight(object, target)) {
						object.direction *= -1;
						target.direction *= -1;
						object.x = target.x - (target.width / 2) - (object.width / 2) - 1;
					} else if (isCollidingWithWallLeft(object, target)) {
						object.direction *= -1;
						target.direction *= -1;
						object.x = target.x + (target.width / 2) + (object.width / 2) + 1;
					}
				}
			}
		}
				
		if (object.name == "humongouszombie") {
			object.width = BLOCK_SIZE * 2;
			object.height = BLOCK_SIZE * 2;
			object.health = 10;
		}
	}
	if (type == "body") {
		object.width = BLOCK_SIZE;
		object.height = BLOCK_SIZE;
		object.weight = 800;
		object.timerBlood = 0;
		object.timerBloodMax = 5000;
		
		object.runAct = function() {
			if (object.owner != null) {
				object.x = object.owner.x,
				object.y = object.owner.y - object.owner.height;
				object.vy = 0;
			}
			
			if (object.timerBlood <= 0) {
				OBJECTS.push(make("blood", {
					name: "blood",
					x: object.x,
					y: object.y - BLOCK_SIZE / 2,
					width: BLOCK_SIZE,
					height: BLOCK_SIZE / 4
				}));
				renderAttach([OBJECTS[OBJECTS.length-1]]);
				
				object.timerBlood = object.timerBloodMax;
			} else {
				object.timerBlood = object.timerBlood - (1000 * mod);
			}
		}
		
		object.runCollide = function() {
			for (var i = 0; i < object.collisions.length; i++) {
				var target = object.collisions[i];
				if (target.type == "body" && target.isAlive) {
					OBJECTS.push(make("mound", {
						name: "mound",
						x: object.x,
						y: object.y,
						width: BLOCK_SIZE,
						height: BLOCK_SIZE,
						pile: 2
					}));
					renderAttach([OBJECTS[OBJECTS.length-1]]);
					
					object.isAlive = false;
					target.isAlive = false;
					i = object.collisions.length;
				}
			}
		}
	}
	if (type == "blood") {
		object.weight = 800;
		object.red = 255;
		object.green = 0;
		object.blue = 0;
	}
	if (type == "mound") {
		object.weight = 800;
		object.pile = options.pile ? options.pile : 1;
		object.pileMaxHumongousZombie = 10;
		
		object.runAct = function() {
			if (object.pile >= object.pileMaxHumongousZombie) {
				OBJECTS.push(make("enemy", {
					name: "humongouszombie",
					x: object.x,
					y: object.y
				}));
				renderAttach([OBJECTS[OBJECTS.length-1]]);
				
				object.isAlive = false;
			}
			log("Mound Size", object.pile);
			
			if (object.pile <= 0) {
				object.isAlive = false;
			}
		}
		
		object.runCollide = function() {
			for (var i = 0; i < object.collisions.length; i++) {
				var target = object.collisions[i];
				if (target.type == "body") {
					object.pile++
					target.isAlive = false;
					i = object.collisions.length;
				}
			}
		}
	}
	if (type == "projectile") {
		object.speed = options.speed != undefined ? options.speed : 400;
		object.power = options.power != undefined ? options.power : 1;
		object.red = options.red != undefined ? options.red : 50;
		object.green = options.green != undefined ? options.green : 255;
		object.blue = options.blue != undefined ? options.blue : 50;
		object.timer = options.timer != undefined ? options.timer : 2000;
		object.item = options.item != undefined ? options.item : undefined; // reference to an item
		object.runAct = function() {
			object.vx = object.speed * object.direction;
			if (object.timer < 0) {
				object.isAlive = false;
			} else {
				object.timer = object.timer - (1000 * mod);
			}
			
			if (options.target) {
				var target = options.target;
				object.x = target.direction == 1 ? target.x + (target.width / 2) : target.x - (target.width / 2),
				object.y = target.y;
			}
		}
		
		object.runCollide = function() {
			for (var i = 0; i < object.collisions.length; i++) {
				var target = object.collisions[i];
				if (target.type == "enemy") {
					target.damage(function() {
						target.health -= object.power;
						object.isAlive = false;
						if (object.item) {
							object.item.stack--;
						}
						i = object.collisions.length;
					});
				}
			}
		}
	}
	if (type == "item") {
		object.width = BLOCK_SIZE / 2;
		object.height = BLOCK_SIZE / 2;
		object.timer = object.timerMax = 500;
		object.stack = 1;
		object.stackMax = 99;
		object.isPermanent = false;
		
		object.runAct = function() {
			if (object.timer < 0) {
			} else {
				object.timer = object.timer - (1000 * mod);
			}
			
			if (object.stack == 0 && !object.isPermanent) {
				object.isAlive = false;
				
				var index = object.owner.inventory.indexOf(object);
				object.owner.inventory.splice(index, 1);
			}
		}		
		object.owner = null;
		
		switch (options.name) {
			case "crossbow":
				object.red = 100;
				object.green = 0;
				object.blue = 0;
				object.stack = 99;
				object.stackMax = 99;
				object.isPermanent = true;
				object.use = function() {
					if (object.timer <= 0) {
						var pocket = PLAYER.pocket;
						if (object.stack > 0) {
							object.stack--
							
							shoot(object);
							object.timer = object.timerMax;
						}
						else if (pocket && pocket.name == "stake" && pocket.stack > 0) {
							pocket.stack--
							
							shoot(object);
							object.timer = object.timerMax;
						}
					}
				}
				break;
			case "spear":
				object.use = function() {
					if (object.timer <= 0) {
						slash(object.owner);
						object.timer = object.timerMax;
					}
				}
				break;
			case "stake":
				object.red = 255;
				object.green = 255;
				object.blue = 255;
				object.use = function() {
					if (object.timer <= 0) {
						stab(object);
						object.timer = object.timerMax;
					}
				}
				break;
			case "plank":
				object.red = 200;
				object.green = 100;
				object.blue = 50;
				object.use = function() {
					if (object.timer <= 0) {
						build(object);
						object.timer = object.timerMax;
						object.stack--
					}
				}
				break;
			case "match":
				object.red = 255;
				object.green = 0;
				object.blue = 0;
				object.stack = 99;
				object.timer = object.timerMax = 500;
				object.use = function() {
					if (object.timer <= 0) {
						var result = match(object.owner);
						if (result) {
							object.stack--;
						}
						object.timer = object.timerMax;
					}
				}
				break;
			case "mop":
				object.red = 0;
				object.green = 0;
				object.blue = 255;
				object.isSoaked = false;
				object.isPermanent = true;
				object.stack = 1;
				object.use = function() {
					if (object.timer <= 0) {
						var target = mop(object.owner);
						if (target != null && target.type == "blood") {
							object.isSoaked = true;
						}
						object.timer = object.timerMax;
					}
					log("Soaked", object.isSoaked);
				}
				break;
			case "jar":
				object.red = 0;
				object.green = 255;
				object.blue = 0;
				object.isFilled = false;
				object.isPermanent = true;
				object.stack = 1;
				object.use = function() {
					log("Filled", object.isFilled);
				}
				break;
			default:
				object.use = function() {
					if (object.timer <= 0) {
						shoot(object.owner);
						object.timer = object.timerMax;
					}
				}
		}
	}
	if (type == "particle") {
		object.x = options.x != undefined ? options.x : 0;
		object.y = options.x != undefined ? options.y : 0;
		object.width = options.width != undefined ? options.width : 5;
		object.height = options.height != undefined ? options.height : 5;
		object.red = options.red != undefined ? options.red : 255;
		object.green = options.green != undefined ? options.green : 255;
		object.blue = options.blue != undefined ? options.blue : 255;
		object.timer = options.timer != undefined ? options.timer : 500;
		object.runAct = function() {
			if (object.timer < 0) {
				object.isAlive = false;
			} else {
				object.timer = object.timer - (1000 * mod);
			}
		}
	}
	if (type == "camera") {
		object.width = 0;
		object.height = 0;
		object.x = 0;
		object.y = 0;
		object.viewWidth = 800;
		object.viewHeight = 450;
		object.originX = 0;
		object.originY = 0;
		object.offsetX = 0;
		object.offsetY = 0;
		
		if (options.mode == "static") {
			object.offsetX = options.x;
			object.offsetY = options.y;
		} else if (options.mode == "follow") {
			object.runAct = function() {
				object.x = PLAYER.x;
				object.y = PLAYER.y;
				object.viewWidth = 800;
				object.viewHeight = 450;
				object.originX = 400;
				object.originY = 375;
				object.offsetX = object.x - object.originX;
				object.offsetY = object.y - object.originY;
			}
		}
	}
	if (type == "selector") {
		object.image = "player.png";
		
		object.runAct = function() {
			if (mousePosition != null) {
				object.x = Math.floor((mousePosition.x) / (BLOCK_SIZE * CAMERA_SIZE)) * BLOCK_SIZE;
				object.y = Math.floor((mousePosition.y) / (BLOCK_SIZE * CAMERA_SIZE)) * BLOCK_SIZE;
			}
		}
		
		object.selection = 0;
	}
	
	//	NAMES
	if (options.name == "hardwoodfloor") {
		object.image = "hardwoodfloor.png";
	}
	if (options.name == "chandalier") {
		object.image = "chandalier.png";
	}
	if (options.name == "zombie") {
		object.image = "zombie.png";
	}
	if (options.name == "body") {
		object.image = "zombie.png";
	}
	if (options.name == "humongouszombie") {
		object.image = "zombie.png";
	}
	if (options.name == "mound") {
		object.image = "zombie.png";
	}
	if (options.name == "foyer") {
		object.image = "foyer.png";
	}
	if (options.name == "redstep") {
		object.image = "redstep.png";
	}
	if (options.name == "stairrailpost") {
		object.image = "stairrailpost.png";
	}
	if (options.name == "stairrail") {
		object.image = "stairrail.png";
	}
	if (options.name == "foyerupperfloor") {
		object.image = "foyerupperfloor.png";
	}
	if (options.name == "paperwall") {
		object.image = "paperwall.png";
	}
	if (options.name == "woodwall") {
		object.image = "woodwall.png";
	}
	if (options.name == "chandalierchain") {
		object.image = "chandalierchain.png";
	}
	if (options.name == "plank") {
		object.image = "plank.png";
	}
	if (options.name == "match") {
		object.image = "match.png";
	}
	if (options.name == "fire") {
		object.image = "fire.png";
	}
	if (options.name == "mop") {
		object.image = "mop.png";
	}
	if (options.name == "jar") {
		object.image = "jar.png";
	}
	if (options.name == "crossbow") {
		object.image = "crossbow.png";
	}
	if (options.name == "stake") {
		object.image = "stake.png";
	}
	
	//	OPTIONS
	if (options.randomizeColor) {
		randomizeColor(object.element);
	}
	if (options.randomizePosition) {
		randomizePosition(object);
	}
	if (options.randomizeVelocity) {
		randomizeVelocity(object);
	}
	if (options.randomizeColor) {
		randomizeColor(object.element);
	}
	
	
	//	HELPER FUNCTIONS
	function randomizePosition() {
		//	sets random position of object
		var num1 = Math.random() * GAME_WIDTH;
		var num2 = Math.random() * GAME_HEIGHT;
		object.x = num1;
		object.y = num2;
	}
	
	function randomizeVelocity() {
		//	sets random velocity of object
		var num1 = (Math.random() * 10) - 5;
		var num2 = (Math.random() * 10) - 5;
		object.vx = num1;
		object.vy = num2;
	}

	function randomizeColor(element) {
		//	transforms object's element to a random color
		var num1 = Math.random() * 255;
		var num2 = Math.random() * 255;
		var num3 = Math.random() * 255;
		
		object.red = num1;
		object.green = num2;
		object.blue = num3;
	}
	

	return object;
}

var imageMap = {
	//'door': IMAGEPATH + 'door.png',
}



//	TRASH - delete all below when i have my own object classes all figured out, and colliding. and when all objects are inherited.


function makePlayer() {
	var object = {};
	image = 'player';
	
	var element = document.createElement('div');
	element.style.position = "absolute";
	element.style.backgroundImage = "url("+imageMap[image]+")";
	element.style.backgroundRepeat = "no-repeat";
	element.style.backgroundSize = "100%";
	
	object.kind = 'player';
	object.element = element;
	object.speed = object.speed_init = 10;	//	600
	object.speedMax = 4;
	object.x = 0;
	object.y = 0;
	object.vx = 0;
	object.vy = 0;
	object.width = 25;
	object.height = 50;
	object.gravity = object.gravity_init = 20;
	object.jump = 5;
	object.jumpReady = true;
	object.lift_init = 1;
	object.lift = null;
	object.liftResetReady = false;
	object.parachuteReady = false;
	object.floorTarget = null;
	object.friction = 0;
	object.isAlive = true;
	
	object.element.style.left = object.x + "px";
	object.element.style.top = object.y + "px";
	object.element.style.width = object.width + "px";
	object.element.style.height = object.height + "px";
	
	return object;
}

function makePlatform(image) {
	var object = {};
	
	var element = document.createElement('img');
	element.style.position = "absolute";
	element.src = imageMap[image];
	element.style.backgroundRepeat = "no-repeat";
	element.style.backgroundSize = "100%";
	//element.style.boxShadow = "rgba(145, 255, 255, 0.45) 0px -10px 10px -4px";
	//element.style.borderRadius = "25px"
	
	object.kind = 'platform';
	object.element = element;
	object.speed = 0;
	object.x = 0;
	object.y = 500;
	object.vx = 0;
	object.vy = 0;
	object.width = 100;
	object.height = 50;
	object.gravity = null;
	object.fall = object.fall_init = 100;	//400
	object.friction = 4;
	object.isAlive = true;
	
	object.runCollide = function(target) {
		if (isCollidingWithFloor(target, object)) {
			onFloor(target, object);
			isColliding = true;
		}
	}
	
	
	object.element.style.left = object.x + "px";
	object.element.style.top = object.y + "px";
	object.element.style.width = object.width + "px";
	
	return object;
}

function makeEnemy(image) {
	var object = {};
	
	var element = document.createElement('img');
	element.style.position = "absolute";
	element.src = imageMap[image];
	element.style.backgroundRepeat = "no-repeat";
	element.style.backgroundSize = "100%";
	
	object.type = 'enemy';
	object.element = element;
	object.speed = 0;
	object.x = 0;
	object.y = 500;
	object.vx = 0;
	object.vy = 0;
	object.width = 100;
	object.height = 20;
	object.gravity = null;
	object.fall = object.fall_init = -100;
	object.isAlive = true;
	
	object.element.style.left = object.x + "px";
	object.element.style.top = object.y + "px";
	object.element.style.width = object.width + "px";
	
	object.runCollide = function(target) {
		console.log("play has died! please restart game by pressing F5");
		gameState = "over";
	}
	
	return object;
}

function makeReward(image) {
	var object = {};
	
	var element = document.createElement('img');
	element.style.position = "absolute";
	element.src = imageMap[image];
	element.style.backgroundRepeat = "no-repeat";
	element.style.backgroundSize = "100%";
	element.style.boxShadow = "rgba(255, 234, 132, 0.45) 0px 0px 10px 5px";
	element.style.borderRadius = "25px"
    element.style.backgroundColor = "rgba(255, 234, 132, 0.45)";
	
	/*
	.slidein {
  animation-duration: 3s;
  animation-name: slidein;
  animation-iteration-count: 3;
  animation-direction: alternate;
}

@keyframes slidein {
  from {
    margin-left:100%;
    width:300%
  }
  
  to {
    margin-left:0%;
    width:100%;
  }
}
*/
	
	object.element = element;
	object.speed = 0;
	object.x = 0;
	object.y = 500;
	object.vx = 0;
	object.vy = 0;
	object.width = 100;
	object.height = 20;
	object.gravity = null;
	object.fall = object.fall_init = 100;
	object.friction = 2;
	object.isAlive = true;
	
	object.element.style.left = object.x + "px";
	object.element.style.top = object.y + "px";
	object.element.style.width = object.width + "px";
	
	object.runCollide = function(target) {
		console.log("+10 points!");
		points = points + 10;
		object.isAlive = false;
	}
	
	return object;
}

function makeParticle() {
	var object = {};
	
	var element = document.createElement('div');
	element.style.position = "absolute";
	element.style.backgroundColor = "rgba(255, 255, 255, 0.5)";
	element.style.borderRadius = "5px";
	
	
	object.element = element;
	object.speed = 0;
	object.x = 0;
	object.y = GAME_HEIGHT;
	object.vx = 0;
	object.vy = 0;
	object.width = 5;
	object.height = 5;
	object.gravity = null;
	object.fall = object.fall_init = ((windPower - 1.0) * -3000) - 100; //-400
	object.isAlive = true;
	
	object.element.style.left = object.x + "px";
	object.element.style.top = object.y + "px";
	object.element.style.width = object.width + "px";
	object.element.style.height = object.height + "px";
	
	object.runCollide = function(target) {}
	
	return object;
}