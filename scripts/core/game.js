function game() {
	move(OBJECTS);
	
	
	//runGravity(theObjects);
	//runFriction([thePlayer]);
	//runFall(theObjects);
	//runPlayer(thePlayer);
	//runCollidePlatform(thePlayer, theObjects);
	//runClean(theObjects);
}

function move(list) {
	for (var i = 0; i < list.length; i++) {
		list[i].x = list[i].x + (list[i].vx * mod);
		list[i].y = list[i].y + (list[i].vy * mod);
	}
}