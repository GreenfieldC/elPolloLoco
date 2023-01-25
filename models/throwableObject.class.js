class ThrowableObjects extends MovableObject {
	groundPosition = 320;
	speedY = 50;

	offset = {
		top: 0,
		bottom: 0,
		left: 0,
		right: 0,
	};

	IMAGES_FLYING_BOTTLES = [
		'./img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
		'./img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
		'./img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
		'./img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png',
	];

	constructor(x, y) {
		super().loadImage('./img/6_salsa_bottle/salsa_bottle.png');
		this.loadImages(this.IMAGES_FLYING_BOTTLES);
		/* this.loadImages(this.IMAGES_BURSTING_BOTTLES); */
		this.x = x;
		this.y = y;
		this.width = 90;
		this.height = 90;
		this.throw();
		this.bottleBeingThrownAnimation(); //ist die schon in movableobject?
	}

	/**
	 * Moves bottle with speedY and speedX
	 * in a flight path over the map
	 */
	throw() {
		this.speedY = this.speedY;
		this.applyGravity();
		setInterval(() => {
			this.x += this.speedX;
		}, 120);
	}

	/**
	 * Animates being thrown bottle
	 */
	bottleBeingThrownAnimation() {
		setInterval(() => {
			this.playAnimation(this.IMAGES_FLYING_BOTTLES);
		}, 90);
	}
}
