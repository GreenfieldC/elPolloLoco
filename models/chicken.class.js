class Chicken extends MovableObject {
	IMAGES_WALKING = [
		'./img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
		'./img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
		'./img/3_enemies_chicken/chicken_normal/1_walk/3_w.png',
	];

	constructor() {
		super().loadImage(
			'img/3_enemies_chicken/chicken_normal/1_walk/1_w.png'
		);
		this.loadImages(this.IMAGES_WALKING);
		this.x = 1500 + Math.random() * 750;
		this.y = 350;
		this.height = 75;
		this.width = 75;
		this.animation();
		this.speed = 0.15 + Math.random() * 0.9;
	}

	animation() {
		setInterval(() => {
			this.moveLeft();
		}, 1000 / 60);

		setInterval(() => {
			this.playAnimation(this.IMAGES_WALKING);
		}, 300);
	}
}
