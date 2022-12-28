class Cloud extends MovableObject {
	y = 20;
	height = 250;
	width = 500;

	constructor() {
		super().loadImage('img/5_background/layers/4_clouds/1.png');
		this.x = Math.random() * 2000;
		this.animation();
	}

	animation() {
		this.moveLeft();
	}
}
