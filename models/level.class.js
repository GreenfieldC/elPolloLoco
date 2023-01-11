class Level {
	enemies;
	clouds;
	backgroundObjects;
	bottlesOnGround;
	bottlesInAir;
	coins;
	endOfLevel_x = 2900;

	constructor(
		enemies,
		clouds,
		backgroundObjects,
		bottlesOnGround,
		bottlesInAir,
		coins
	) {
		this.enemies = enemies;
		this.clouds = clouds;
		this.backgroundObjects = backgroundObjects;
		this.bottlesOnGround = bottlesOnGround;
		this.bottlesInAir = bottlesInAir;
		this.coins = coins;
	}
}
