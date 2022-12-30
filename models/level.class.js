class Level {
	enemies;
	clouds;
	backgroundObjects;
	endOfLevel_x = 2250; // dasd funktioniert nicht. Man kann vorwärts gehen, aber nicht mehr zurück, ab dem Punkt x

	constructor(enemies, clouds, backgroundObjects) {
		this.enemies = enemies;
		this.clouds = clouds;
		this.backgroundObjects = backgroundObjects;
	}
}
