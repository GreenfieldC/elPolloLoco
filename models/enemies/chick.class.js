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
		this.x = 600 + Math.random() * 1000; // chicks start walking from different positions
		this.y = 365;
		this.height = 60;
		this.width = 60;
		this.speed = 0.15 + Math.random() * 1.9; // chicks walk at different speeds
		this.animation(); // muss das in den constructor?
	}

	animation() {
		this.chickMovesLeft();
		this.walkingAnimationApplied();
	}

	/**
	 * Runs animation of the walking chick
	 */
	walkingAnimationApplied() {
		this.playInterval = setStoppableInterval(
			this.walkingAnimation.bind(this),
			200
		);
	}

	walkingAnimation() {
		this.playAnimation(this.IMAGES_WALKING);
	}

	/**
	 * Moves the chick to the left side of the map
	 */
	chickMovesLeft() {
		this.playInterval = setStoppableInterval(
			this.moveLeft.bind(this),
			1000 / 60
		);
	}
}
