//	GAME VARIABLES
var OBJECTS = [];	//	all interactive objects in the game
var OBJECTS_BACKGROUND = [];	//	objects in the background
var OBJECTS_FOREGROUND = [];	//	objects in the foreground
var GAME_WIDTH = 800;
var GAME_HEIGHT = 450;
var BLOCK_SIZE = 32;
var PLAYER;	//	reference to player object, is just one player for now
var CAMERA; //	reference to camera object
var GAME_BOUNDARY = 2000;

//	ELEMENT REFERENCES
var CONTENT_LAYER = document.getElementById("content");
var INFO_LAYER = document.getElementById("info");

//	PATHS
var IMAGEPATH = 'assets/images/';
var RUNPATH = 'runs/';