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
	object.collisions = [];
	object.collisionFloor = null;
	object.runCollide = function() {}
	object.runAct = function() {}
	
	
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
		object.speed = 200;
		object.weight = 700;
		object.image = "player.png";
		
		//	controls
		object.jump = 270;
		object.jumpReady = true;
		object.useReady = true;
		object.pickupReady = true;
		object.dropReady = true;
		
		object.item = null;
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
		object.speed = 100;
		object.weight = 800;
		object.red = 255;
		object.green = 50;
		object.blue = 50;
		object.timer = 0;
		object.timerMax = 1000;
		object.runAct = function() {
			if (object.timer <= 0) {
				if (object.x < PLAYER.x) {
					object.vx = object.speed;
				} else {
					object.vx = object.speed * -1;
				}
			} else {
				object.timer = object.timer - (1000 * mod);
			}	
		}
		
		object.runCollide = function() {
			for (var i = 0; i < object.collisions.length; i++) {
				var target = object.collisions[i];
				if (target.type == "player") {
					object.timer = object.timerMax;
					object.vx = 0;
				}
			}
		}
	}
	if (type == "projectile") {
		object.speed = options.speed != undefined ? options.speed : 400;
		object.red = 50;
		object.green = 255;
		object.blue = 50;
		object.timer = 2000;
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
	}
	if (type == "item") {
		object.width = 25;
		object.height = 25;
		object.timer = object.timerMax = 500;
		
		object.runAct = function() {
			if (object.timer < 0) {
			} else {
				object.timer = object.timer - (1000 * mod);
			}
		}		
		object.owner = null;
		object.use = function() {
			if (object.timer <= 0) {
				shoot(object.owner);
				object.timer = object.timerMax;
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
	if (options.name == "floor") {
		object.image = "hardwoodfloor.png";
	}
	if (options.name == "chandalier") {
		object.image = "chandalier.png";
	}
	if (options.name == "zombie") {
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