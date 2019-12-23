//	GAME VARIABLES
var OBJECTS = [];	//	all interactive objects in the game
var OBJECTS_BACKGROUND = [];	//	objects in the background
var OBJECTS_FOREGROUND = [];	//	objects in the foreground

var BLOCKW = 16;
var BLOCKH = 9;
var BLOCK_SIZE = 32;
var GAME_WIDTH = BLOCKW * BLOCK_SIZE; // 800
var GAME_HEIGHT = BLOCKH * BLOCK_SIZE; // 450
var GAME_WAVE = 0; // is an index to GAME_WAVES, subtract 1, should always be 0
var GAME_WAVES = [1, 2, 3, 4, 5, 6, 7, 8]; // list of waves to play out
var GAME_WAVE_STATE = "day" // day, night
var DAY_TIME = 30000;
var NIGHT_TIME = 30000;

var PLAYER;	//	reference to player object, is just one player for now
var CAMERA; //	reference to camera object
var CAMERA_SIZE = 2;
var GAME_BOUNDARY = 2000;

//	ELEMENT REFERENCES
var CONTENT_LAYER = document.getElementById("content");
var INFO_LAYER = document.getElementById("info");

//	PATHS
var IMAGEPATH = 'assets/images/';
var RUNPATH = 'runs/';

//	EDITOR
var EDITORGRID = [];
EDITORGRID.length = BLOCKH;
for (var i = 0; i < EDITORGRID.length; i++) {
	var newlist = [];
	newlist.length = BLOCKW;
	newlist.fill(0);
	EDITORGRID[i] = newlist;
}
var OBJECTMAP = [
	"paperwall",
	"hardwoodfloor",
	"chandalier",
	"zombie",
	"redstep",
	"stairrailpost",
	"stairrail",
	"woodwall"
];