class Level {
	enemies;
	clouds;
	backgroundObjects;
	endOfLevel_x = 1510; // dasd funktioniert nicht. Man kann vorwärts gehen, aber nicht mehr zurück, ab dem Punkt x

	constructor(enemies, clouds, backgroundObjects) {
		this.enemies = enemies;
		this.clouds = clouds;
		this.backgroundObjects = backgroundObjects;
	}
}
