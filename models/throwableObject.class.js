class ThrowableObjects extends MovableObject {
	groundPosition = 320;

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
		this.animate(); //ist die schon in movableobject?
	}

	headingForwards() {
		return this.otherDirection == false;
	}

	headingBackwards() {
		return this.otherDirection == true;
	}

	throwRight() {
		this.speedY = this.speedY;
		this.applyGravity();
		setInterval(() => {
			this.x += this.speedX;
		}, 100);
	}

	throwLeft() {
		this.speedY = this.speedY;
		this.applyGravity();
		setInterval(() => {
			this.x -= this.speedX;
		}, 50);
	}
	throw() {
		if (this.headingForwards()) {
			this.throwRight();
		}
		if (this.headingBackwards()) {
			this.throwLeft();
		}
	}

	animate() {
		setInterval(() => {
			this.playAnimation(this.IMAGES_FLYING_BOTTLES);
		}, 80);
	}
}
