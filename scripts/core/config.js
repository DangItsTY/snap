//	GAME VARIABLES
var OBJECTS = [];	//	all objects in the game
var GAME_WIDTH = 800;
var GAME_HEIGHT = 450;
var PLAYER;	//	reference to player object, is just one player for now
var CAMERA; //	reference to camera object
var GAME_BOUNDARY = 2000;

//	ELEMENT REFERENCES
var CONTENT_LAYER = document.getElementById("content");
var INFO_LAYER = document.getElementById("info");

//	PATHS
var IMAGEPATH = 'assets/images/';
var RUNPATH = 'runs/';