class Level {
	enemies;
	clouds;
	backgroundObjects;
	endOfLevel_x = 2250;

	constructor(enemies, clouds, backgroundObjects) {
		this.enemies = enemies;
		this.clouds = clouds;
		this.backgroundObjects = backgroundObjects;
	}
}
