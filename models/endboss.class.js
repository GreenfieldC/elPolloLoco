class Endboss extends MovableObject {
	width = 300;
	height = 300;
	y = 140;
	x = 3420;
	speedY = 5;
	speed = 25;
	acceleration = 5;
	energy = 100;
	beingAttacked = false;
	characterDetected = false;
	tooClose = false;
	lastJump = false;
	groundPosition = 100;
	cache = new EndbossCache();
	i = 0;
	id;

	offset = {
		top: 100,
		bottom: 15,
		left: 50,
		right: 50,
	};

	constructor() {
		super().loadImage(this.cache.IMAGES_ALERT[0]);
		this.loadAllImagesFromCache();
		this.animate();
		this.animations();
	}

	/**
	 * It checks if the character is alert, walking, being attacked, attacking the character or dying.
	 */
	animate() {
		this.id = setInterval(() => {
			this.checkBeingAlert();
			this.checkWalking();
			this.checkBeingAttacked();
			this.checkAttackCharacter();
			this.checkIsBeingKilled();
		}, 200);
	}

	/**
	 * This function calls other functions that are responsible to show the endboss
	 * being alert, walking, attacking, being hurt and dying.
	 */
	animations(id) {
		this.alertAnimation();
		this.walkAnimation();
		this.attackAnimation();
		this.hurtAnimation();
		this.dyingAnimation(id);
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
		this.moveLeft(); // drinnen lassen?
	}

	/**
	 * This function plays the dying animation of the endboss.
	 */

	dyingAnimation() {
		if (this.i >= 3 || this.isAlive()) return;
		if (this.i >= 2 || this.lastJump)
			this.loadImage(this.cache.IMAGES_ENDBOSS_DYING[2]); //! HIER GEHT ES EINFACH NICHT REIN. WARUM?
		if (this.i < 2 || /* (!this.aboveGround() */ /* && */ this.isDead()) {
			/* ) */ this.playAnimation(this.cache.IMAGES_ENDBOSS_DYING);
			this.i++;
		}
		if (!this.aboveGround() && !this.lastJump) {
			this.applyGravity();
			this.jump();
			this.goesToGrave(2000);
			this.lastJump = true;
		}
		if (this.i == 2) this.lastJump = true;
	}

	/**
	 * If the character is detected or endboss being attacked,
	 * move left towards character.
	 */
	checkWalking() {
		if (this.tooClose || this.isDead()) return; // funktioniert zu spät!
		if (this.isAlive() && (this.characterDetected || this.beingAttacked)) {
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
		if (this.isDead()) return;
		if (this.beingAttacked && this.isInPain()) this.hurtAnimation();
	}

	/**
	 * If the player is too close to the enemy,
	 * the enemy will attack
	 */
	checkAttackCharacter() {
		if (this.tooClose && this.isAlive()) this.attackAnimation();
	}

	/**
	 * If the endboss is dead, he jumps, goes to his grave, and plays his dying animation.
	 * @param {checkEndbossIdInterval} - The ID of the interval that is used to check if the endboss is dead.
	 */
	checkIsBeingKilled() {
		if (this.isAlive()) return;
		if (this.isDead() && !this.lastJump) {
			this.dyingAnimation();
		}
	}
}
