class ThrowableObjects extends MovableObject {
	character = Character;
	imageCache = {};

	IMAGES_FLYING_BOTTLES = [
		'./img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
		'./img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
		'./img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
		'./img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png',
	];

	IMAGES_BURSTING_BOTTLES = [
		'./img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png',
		'./img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png',
		'./img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png',
		'./img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png',
		'./img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png',
		'./img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png',
	];

	constructor(x, y) {
		super().loadImage('./img/6_salsa_bottle/salsa_bottle.png');
		this.loadImages(this.IMAGES_FLYING_BOTTLES);
		this.x = x;
		this.y = y;
		this.width = 90;
		this.height = 90;
		this.throw(x, y);
	}

	headingForwards() {
		return this.character.otherDirection == false;
	}

	headingBackwards() {
		return this.character.otherDirection == true;
	}

	throwRight() {
		this.speedY = 30;
		this.applyGravity();
		setInterval(() => {
			this.x += 30;
			this.playAnimation(this.IMAGES_FLYING_BOTTLES);
		}, 50);
	}

	throwLeft() {
		this.speedY = 30;
		this.applyGravity();
		setInterval(() => {
			this.x -= 30;
			this.playAnimation(this.IMAGES_FLYING_BOTTLES);
		}, 50);
	}
	throw() {
		if (this.headingForwards()) {
			this.throwRight();
			this.bottleCollidingGround();
		}
		if (this.headingBackwards()) {
			this.throwLeft();
			this.bottleCollidingGround();
		}
	}

	/* 
	!FLASCHE SOLL AUF BODEN FALLEN KÖNNEN! */
	bottleCollidingGround() {
		if (this.y < 185) {
			setInterval(() => {
				this.playAnimation(this.IMAGES_BURSTING_BOTTLES);
			}, 200);
		}
	}
}
