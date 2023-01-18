class Character extends MovableObject {
	speed = 20;
	y = 180;
	world;
	walking_sound = new Audio('audio/walking_sound.mp3'); //später auslagern
	cache = new CharacterCache();
	isInactive = false;
	energy = 100;
	otherDirection = false;

	offset = {
		top: 150,
		bottom: -5,
		left: 0,
		right: 0,
	};

	constructor() {
		super().loadImage('./img/2_character_pepe/2_walk/W-21.png');
		this.loadImages(this.cache.IMAGES_WALKING); // images are being pre loaded for usage!
		this.loadImages(this.cache.IMAGES_JUMPING);
		this.loadImages(this.cache.IMAGES_DEAD);
		this.loadImages(this.cache.IMAGES_INPAIN);
		this.loadImages(this.cache.IMAGES_IDLE);
		this.loadImages(this.cache.IMAGES_LONG_IDLE);
		this.applyGravity();
		this.animations();
		this.animate();
	}

	/* hier nur die Funktionen, wo Tasten gedrückt werden */
	animate() {
		setInterval(() => {
			this.walking_sound.pause();
			this.checkWalking();
			this.checkWalkingRight();
			this.checkWalkingLeft();
			this.checkWalkingSound();
			this.checkJumping();
			this.checkIsIdling(); // intervall zu hoch auslagern in andere Funktionen
			this.checkIsLongIdling(); // intervall zu hoch auslagern in andere Funktionen
			this.checkStopLongIdling();
			this.checkReactionToInjury();
			this.setCameraForCharacter();
		}, 100);
	}

	/**
	 * It calls all the other functions that are responsible for animating the character
	 * walking, jumping, idling, being in pain and dying.
	 */
	animations() {
		this.walkingAnimation();
		this.jumpingAnimation();
		this.idlingAnimation();
		this.longIdlingAnimation();
		this.beingInPainAnimation();
		this.isBeingKilledAnimation();
	}

	/**
	 * If the player is pressing the right or left arrow key and the player is on the ground, then play
	 * the walking animation
	 */
	checkWalking() {
		if (
			(this.world.keyboard.RIGHT || this.world.keyboard.LEFT) &&
			this.objectOnGround()
		)
			this.walkingAnimation();
	}

	/**
	 * If the right arrow key is pressed and the player is not at the end of the level, then move the
	 * player right and play the walking sound
	 */
	checkWalkingRight() {
		if (
			this.world.keyboard.RIGHT &&
			this.x < this.world.level.endOfLevel_x
		) {
			this.moveRight();
			this.forwards();
			this.walking_sound.play();
		}
	}

	/**
	 * If the left arrow key is pressed and the character is not at the left edge of the screen, then move
	 * the character left and play the walking sound
	 */
	checkWalkingLeft() {
		if (this.world.keyboard.LEFT && this.x > -50) {
			this.moveLeft();
			this.backwards(); //if true then mirror character
			this.walking_sound.play();
		}
	}

	/**
	 * If the player is above ground, pause the walking sound
	 */
	checkWalkingSound() {
		if (this.aboveGround()) {
			this.walking_sound.pause();
		}
	}

	/**
	 * If the player is above the ground, then play the jumping animation.
	 * If the player is already above the
	 * ground, then return.
	 * If the player is above the ground, then jump. If the player is on the ground,
	 * then set the air status to false
	 * @returns the value of the variable airStatus.
	 */
	checkJumping() {
		if (this.aboveGround()) {
			this.jumpingAnimation();
		}
		if (this.aboveGround()) return; // restrict more than one jump at the time
		if (this.world.keyboard.UP) {
			this.jump();
		}
		if (this.objectOnGround) this.airStatus = false;
	}

	/**
	 * If the player is not moving, not dead, not above ground, and not already idling, then start idling
	 * @returns the value of the function.
	 */
	checkIsIdling() {
		if (
			this.isInactive == true ||
			this.isMoving() ||
			this.isDead() ||
			this.aboveGround()
		)
			return;
		this.idlingAnimation();
		/* this.stopLongIdling(); */
		setTimeout(() => {
			this.isInactive = true;
		}, 5000);
	}

	/**
	 * If the player is not inactive, moving, dead, or above ground,
	 * then play the long idling animation
	 * @returns the value of the function longIdlingAnimation()
	 */
	checkIsLongIdling() {
		if (
			this.isInactive == false ||
			this.isMoving() ||
			this.isDead() ||
			this.aboveGround()
		)
			return;
		this.longIdlingAnimation();
	}

	// islazy muss auch auf false gesetzt werden, wenn er getroffen ist!
	checkStopLongIdling() {
		if (this.isMoving()) this.isInactive = false;
		return;
	}

	/**
	 * If the energy is greater than 0, check if the character is in pain.
	 * If the energy is less than 0,
	 * play the animation for being killed
	 */
	checkReactionToInjury() {
		this.energy > 0 ? this.checkIsInPain() : this.isBeingKilledAnimation();
	}

	/**
	 * If the player is above ground, return.
	 * If the player is in pain, play the animation.
	 * @returns The function isInPain() is being returned.
	 */
	checkIsInPain() {
		if (this.aboveGround()) return;
		if (this.isInPain()) {
			this.beingInPainAnimation();
		}
	}

	/* ===========
	CAMERA ON CHARACTER
	==============*/

	/**
	 * "Set the camera's x position to the character's x position minus 100."
	 *
	 * The reason we subtract 100 is
	 * because we want the camera to be 100 pixels to the left of the character
	 */
	setCameraForCharacter() {
		this.world.camera_x = -this.x + 100;
	}

	/* ===============
	-----ANIMATIONS---
	=================*/

	/**
	 * This function plays the walking animation.
	 */
	walkingAnimation() {
		this.playAnimation(this.cache.IMAGES_WALKING);
	}

	/**
	 * This function plays the jumping animation.
	 */
	jumpingAnimation() {
		this.playAnimation(this.cache.IMAGES_JUMPING);
	}

	/**
	 * This function plays the idle animation.
	 */
	idlingAnimation() {
		this.playAnimation(this.cache.IMAGES_IDLE);
	}

	/**
	 * It plays the long idel animation.
	 */
	longIdlingAnimation() {
		this.playAnimation(this.cache.IMAGES_LONG_IDLE);
	}

	/**
	 * Play the animation of the player being in pain.
	 */
	beingInPainAnimation() {
		this.playAnimation(this.cache.IMAGES_INPAIN);
	}

	/**
	 * Play the animation of the player being killed.
	 */
	isBeingKilledAnimation() {
		this.playAnimation(this.cache.IMAGES_DEAD);
	}

	/**
	 * If the isInactive variable is false, then the isActive function will return true.
	 * @returns The value of the expression on the right side of the assignment operator.
	 */
	isActive() {
		return (this.isInactive = false);
	}

	/**
	 * If the player is pressing the right, left, up, or down arrow keys, return true.
	 * @returns a boolean value.
	 */
	isMoving() {
		return (
			this.world.keyboard.RIGHT ||
			this.world.keyboard.LEFT ||
			this.world.keyboard.UP ||
			this.world.keyboard.D
		);
	}
}
