function runGravity(list) {
	for (var i = 0; i < list.length; i++) {
		var object = list[i];
		object.vy = object.vy + object.weight;
	}
}