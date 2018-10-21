var POISONTICK = 0.1;
var POISONDAMAGE = 0.1;
function runPoison(list) {
	for (var i = 0; i < list.length; i++) {
		var object = list[i];
		if (object.poisonTimer < 0) {
			object.health -= object.poisonStack * POISONDAMAGE;
			object.poisonTimer = POISONTICK;
		} else {
			object.poisonTimer -= mod;
		}
	}
}