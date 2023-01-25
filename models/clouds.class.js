class Cloud extends MovableObject {
	y = 20;
	height = 250;
	width = 500;
	speed = 0.1;

	constructor() {
		super().loadImage('./img/5_background/layers/4_clouds/1.png');
		this.x = Math.random() * 4200;
		this.moveLeftAnimation();
	}

	/**
	 * Moves the clouds from the right to the left side of the map
	 */
	moveLeftAnimation() {
		setInterval(() => {
			this.moveLeft();
		}, 1000 / 60);
	}
}
