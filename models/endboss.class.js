class Endboss extends MovableObject {
	width = 300;
	height = 300;
	y = 140;
	x = 3420;
	/* speedY = 90; */
	speed = 25;
	energy = 100;
	beingAttacked = false;
	characterDetected = false;
	tooClose = false;
	groundPosition = 100;
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
		this.loadImages(this.cache.IMAGES_ENDBOSS_DYING);
		this.animate();
		this.animations();
		this.applyGravity();
	}

	/**
	 * It checks if the character is alert, walking, being attacked, attacking the character or dying.
	 */
	animate() {
		let IDOfIntervall = setInterval(() => {
			this.checkBeingAlert();
			this.checkWalking();
			this.checkBeingAttacked();
			this.checkAttackCharacter();
			this.checkIsBeingKilled(IDOfIntervall);
		}, 250);
	}

	/**
	 * This function calls other functions that are responsible to show the endboss
	 * being alert, walking, attacking, being hurt and dying.
	 */
	animations() {
		this.alertAnimation();
		this.walkAnimation();
		this.attackAnimation();
		this.hurtAnimation();
		this.dyingAnimation();
	}

	/* Playing the animation of the endboss being alert. */
	alertAnimation() {
		this.playAnimation(this.cache.IMAGES_ALERT);
	}

	/**
	 * This function plays the animation of the endboss walking.
	 */
	walkAnimation() {
		this.playAnimation(this.cache.IMAGES_WALKING);
	}

	/**
	 * Play the hurt animation of endboss.
	 */
	hurtAnimation() {
		this.playAnimation(this.cache.IMAGES_HURT);
	}

	/**
	 * This function plays the attack animation.
	 */
	attackAnimation() {
		this.playAnimation(this.cache.IMAGES_ATTACK);
	}

	/**
	 * This function plays the dying animation of the endboss.
	 */
	dyingAnimation() {
		this.playAnimation(this.cache.IMAGES_ENDBOSS_DYING);
	}

	/**
	 * If the character is detected or endboss being attacked,
	 * move left towards character.
	 */
	checkWalking() {
		if (this.tooClose) return; // funktioniert zu spät!
		if (this.characterDetected || this.beingAttacked) {
			this.moveLeft();
			this.walkAnimation();
		}
	}

	/**
	 * If the character is not detected,
	 * then the alert animation of endboss will be played
	 */
	checkBeingAlert() {
		if (!this.characterDetected) this.alertAnimation();
	}

	/**
	 * If the endboss is being attacked and is in pain,
	 * then play the hurt animation
	 */
	checkBeingAttacked() {
		if (this.beingAttacked && this.isInPain()) this.hurtAnimation();
	}

	/**
	 * If the player is too close to the enemy,
	 * the enemy will attack
	 */
	checkAttackCharacter() {
		if (this.tooClose) this.attackAnimation();
	}

	/**
	 * If the endboss is dead, he jumps, goes to his grave, and plays his dying animation.
	 * @param {IDOfIntervall} - The ID of the interval that is used to check if the endboss is dead.
	 */
	checkIsBeingKilled(IDOfIntervall) {
		if (this.isDead()) {
			this.jump();
			this.goesToGrave();
			this.dyingAnimation();
			this.stopsDyingAnimation(IDOfIntervall);
		}
	}
}
