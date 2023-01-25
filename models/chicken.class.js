class Chicken extends MovableObject {
	IMAGES_WALKING = [
		'./img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
		'./img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
		'./img/3_enemies_chicken/chicken_normal/1_walk/3_w.png',
	];

	offset = {
		top: 0,
		bottom: 10,
		left: 20,
		right: 20,
	};

	constructor() {
		super().loadImage('img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');
		this.loadImages(this.IMAGES_WALKING);
		this.x = 1500 + Math.random() * 2500; // lets chickens start walking at different positions on the map
		this.y = 350;
		this.height = 75;
		this.width = 75;
		this.animation();
		this.speed = 0.15 + Math.random() * 0.9; // lets chicken walk at different speed
	}

	animation() {
		this.moveLeftAnimation();
		this.walkingAnimation();
	}

	/**
	 * Animations moving chickens to the left side of the map,
	 * and
	 */
	moveLeftAnimation() {
		setInterval(() => {
			this.moveLeft();
		}, 1000 / 60);
	}

	/**
	 * Shows the walking animation of the chicken
	 */
	walkingAnimation() {
		setInterval(() => {
			this.playAnimation(this.IMAGES_WALKING);
		}, 1000 / 5);
	}
}
