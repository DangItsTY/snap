function runActs(list) {
	for (var i = 0; i < list.length; i++) {
		var object = list[i];
		object.runAct();
	}
}