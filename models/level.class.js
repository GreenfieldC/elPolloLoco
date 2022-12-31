class Level {
	enemies;
	clouds;
	backgroundObjects;
	bottlesOnGround;
	objectsInAir;
	endOfLevel_x = 2900;

	constructor(enemies, clouds, backgroundObjects, bottlesOnGround, objectsInAir) {
		this.enemies = enemies;
		this.clouds = clouds;
		this.backgroundObjects = backgroundObjects;
		this.bottlesOnGround = bottlesOnGround;
		this.objectsInAir = objectsInAir;
	}
}
