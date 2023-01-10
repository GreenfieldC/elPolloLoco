class ThrowableObjects extends MovableObject {
	character = Character;
	world;

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
		this.loadImages(this.IMAGES_BURSTING_BOTTLES);
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
			this.bottleCollidingGround();
		}, 50);
	}

	throwLeft() {
		this.speedY = 30;
		this.applyGravity();
		setInterval(() => {
			this.x -= 30;
			this.playAnimation(this.IMAGES_FLYING_BOTTLES);
			this.bottleCollidingGround();
		}, 50);
	}
	throw() {
		let bottle = 0;
		if (this.headingForwards()) {
			this.throwRight();
		}
		if (this.headingBackwards()) {
			this.throwLeft();
		}
		if (world.throwableBottle.length > 0) {
			console.log(world.throwableBottle[bottle].y);
		}
		console.log(bottle);
		bottle++;
	}

	/* 
	!FLASCHE SOLL AUF BODEN FALLEN KÖNNEN! */
	bottleCollidingGround() {
		let bottleY = 0;
		if (world.throwableBottle.length > 0)
			bottleY = world.throwableBottle[0].y;
		if (bottleY + this.height > 340) {
			setInterval(() => {
				this.playAnimation(this.IMAGES_BURSTING_BOTTLES);
			}, 200);
		}
	}

	isCollidingWithGround() {
		return;
	}
}
