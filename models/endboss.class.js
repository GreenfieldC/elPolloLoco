class Endboss extends MovableObject {
	width = 300;
	height = 300;
	y = 140;
	x = 3420;
	speed = 25;
	energy = 300;
	beingAttacked = false;
	characterDetected = false;
	tooClose = false;
	cache = new EndbossCache();

	offset = {
		top: 100,
		bottom: 15,
		left: 50,
		right: 50,
	};

	constructor() {
		super().loadImage(this.cache.IMAGES_ALERT[0]);
		this.loadImages(this.cache.IMAGES_ALERT);
		this.loadImages(this.cache.IMAGES_WALKING);
		this.loadImages(this.cache.IMAGES_HURT);
		this.loadImages(this.cache.IMAGES_ATTACK);
		/* this.x = 3420; */
		this.animate();
		this.animations();
	}

	animate() {
		setInterval(() => {
			this.checkBeingAlert();
			this.checkWalking();
			this.checkBeingAttacked();
			this.checkAttackCharacter();
		}, 200);
	}

	animations() {
		this.alertAnimation();
		this.walkAnimation();
		this.attackAnimation();
		this.hurtAnimation();
	}

	alertAnimation() {
		this.playAnimation(this.cache.IMAGES_ALERT);
	}

	walkAnimation() {
		this.playAnimation(this.cache.IMAGES_WALKING);
	}

	hurtAnimation() {
		this.playAnimation(this.cache.IMAGES_HURT);
	}

	attackAnimation() {
		this.playAnimation(this.cache.IMAGES_ATTACK);
	}

	checkWalking() {
		if (this.characterDetected == true || this.beingAttacked == true) {
			this.moveLeft();
			this.walkAnimation();
		}
	}

	checkBeingAlert() {
		if (this.characterDetected == false) this.alertAnimation();
	}

	checkBeingAttacked() {
		if (this.beingAttacked == true && this.isInPain()) this.hurtAnimation();
	}

	checkAttackCharacter() {
		if (this.tooClose == true) this.attackAnimation();
	}
}
