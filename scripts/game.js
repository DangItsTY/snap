function game() {
	runGravity(theObjects);
	runFriction([thePlayer]);
	runFall(theObjects);
	applyVerticalWind(thePlayer);
	runPlayer(thePlayer);
	runCollidePlatform(thePlayer, theObjects);
	runClean(theObjects);
}