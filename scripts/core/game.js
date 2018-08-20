function game() {
	//	pre-collision
	runControls(PLAYER);
	runActs(OBJECTS);
	runPhysics(OBJECTS);
	
	//	collision
	runCollision(OBJECTS);
	
	//	post-collision
	runPhysicsCollision(OBJECTS);
	runClean(OBJECTS);
	//runFriction([thePlayer]);
	//runFall(theObjects);
	//runPlayer(thePlayer);
	//runCollidePlatform(thePlayer, theObjects);
	//runClean(theObjects);
}