var OBJECTS = [];	//	all objects in the game
var CONTENT_LAYER = document.getElementById("content");

var GAME_WIDTH = 800;
var GAME_HEIGHT = 450;

var IMAGEPATH = 'images/';
var RUNPATH = 'runs/';

//	globals
var thePlayer = null;
var theFloor = null;
var theStartPlatform = null;
var mainElement = document.getElementById('content');
var debugElement = document.getElementById('debug');
var theObjects = [];
var gameState = "start";

var level = 1;
var hurricaneLevel = false;