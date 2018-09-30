document.addEventListener("keydown", registerKeyDown);
document.addEventListener("keyup", registerKeyUp);
var el = document.getElementById("container"); // body?
el.addEventListener("touchstart", registerTouch);
el.addEventListener("touchend", deregisterTouch);
el.addEventListener("touchmove", moveTouch);
//el.addEventListener("touchcancel", cancelTouch);
var mousePosition = {x: 0, y: 0};
el.addEventListener('mousemove', getMousePosition);
var keysDown = {
	'32': false,
	'65': false,
	'68': false,
	'74': false,
	'75': false,
	'78': false
};
var keysUp = {
	'32': true,
	'65': true,
	'68': true,
	'74': true,
	'75': true,
	'78': true
};
var touchLeft = null;
var touchLeftOriginX = 0;
var touchRight = null;
var touchMoveLeft = null;
var touchMoveRight = null;

var keyMap = {
	'jump': 32,
	'left': 65,
	'right': 68,
	'use': 74,
	'pickup': 75,
	'drop': 78
}
function registerKeyDown(e) {
	var keyCode = e.keyCode;
	keysDown[keyCode] = true;
	keysUp[keyCode] = false;
	
	if (keyCode == 32) {
		e.preventDefault();
	}
}

function registerKeyUp(e) {
	var keyCode = e.keyCode;
	keysUp[keyCode] = true;
	keysDown[keyCode] = false;
}

function registerTouch(e) {
	//e.preventDefault();
	var touch = e.changedTouches.item(0);

	if (touch.clientX < screen.width / 2) {
		touchLeft = touch;
		touchLeftOriginX = touch.clientX;
	} else {
		touchRight = touch;
	}
}

function deregisterTouch(e) {
	if (gameState == "play_") {
		e.preventDefault();
	}
	
	var touch = e.changedTouches.item(0);
	if (touchLeft && touchLeft.identifier == touch.identifier) {
		touchLeft = null;
		touchLeftOriginX = 0;
		touchMoveLeft = null;
		touchMoveRight = null;
	}
	if (touchRight && touchRight.identifier == touch.identifier) {
		touchRight = null;
	}
}

function moveTouch(e) {
	if (e.touches.length > 1) {
		e.preventDefault();
	}
	var touch = e.changedTouches.item(0);
	
	if (touchLeft && touchLeft.identifier == touch.identifier) {
		if (touch.clientX < touchLeftOriginX) {
			touchMoveLeft = 1;
			touchMoveRight = null;
		} else if (touch.clientX >= touchLeftOriginX) {
			touchMoveRight = 1;
			touchMoveLeft = null;
		}
	}
}

function getMousePosition(e) {
    var rect = el.getBoundingClientRect();
    mousePosition = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    };
}