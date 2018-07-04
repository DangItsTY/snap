function game() {
	runControls(PLAYER);
	runCollision(OBJECTS);
	runPhysics(OBJECTS);
	runClean(OBJECTS);
	//runFriction([thePlayer]);
	//runFall(theObjects);
	//runPlayer(thePlayer);
	//runCollidePlatform(thePlayer, theObjects);
	//runClean(theObjects);
}