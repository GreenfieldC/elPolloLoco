class Chick extends MovableObject {
	IMAGES_WALKING = [
		'./img/3_enemies_chicken/chicken_small/1_walk/1_w.png',
		'./img/3_enemies_chicken/chicken_small/1_walk/2_w.png',
		'./img/3_enemies_chicken/chicken_small/1_walk/3_w.png',
	];

	offset = {
		top: 0,
		bottom: 0,
		left: 0,
		right: 0,
	};

	constructor() {
		super().loadImage(
			'./img/3_enemies_chicken/chicken_small/1_walk/1_w.png'
		);
		this.loadImages(this.IMAGES_WALKING);
		this.x = 600 + Math.random() * 1000;
		this.y = 365;
		this.height = 60;
		this.width = 60;
		this.animation();
		this.speed = 0.15 + Math.random() * 1.9;
	}

	animation() {
		this.chickMovesLeft();

		this.walkingAnimation();
	}

	walkingAnimation() {
		setInterval(() => {
			this.playAnimation(this.IMAGES_WALKING);
		}, 100);
	}

	chickMovesLeft() {
		setInterval(() => {
			this.moveLeft();
		}, 1000 / 60);
	}
}
