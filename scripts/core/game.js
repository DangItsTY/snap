function game() {
	runControls(PLAYER);
	runActs(OBJECTS);
	runCollision(OBJECTS);
	runPhysics(OBJECTS);
	runClean(OBJECTS);
	//runFriction([thePlayer]);
	//runFall(theObjects);
	//runPlayer(thePlayer);
	//runCollidePlatform(thePlayer, theObjects);
	//runClean(theObjects);
}