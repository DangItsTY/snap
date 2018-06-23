function game() {
	runGravity(theObjects);
	//runFriction([thePlayer]);
	runFall(theObjects);
	//runPlayer(thePlayer);
	//runCollidePlatform(thePlayer, theObjects);
	runClean(theObjects);
}