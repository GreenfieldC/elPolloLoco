class Character extends MovableObject {
	speed = 20;
	y = 180;
	world;
	walking_sound = new Audio('audio/walking_sound.mp3'); //später auslagern
	cache = new CharacterCache();
	isInactive = false;
	energy = 100;
	/* otherDirection = false; */

	offset = {
		top: 150,
		bottom: -5,
		left: 25,
		right: 25,
	};

	constructor() {
		super().loadImage(this.cache.IMAGES_WALKING[0]);
		this.loadAllImagesFromCache();
		this.applyGravity();
		/* this.animations(); */ // muss das in den constructor?
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
			this.checkThrowing();
			this.checkReactionToInjury();
			this.checkIsBeingKilled();
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
		this.dyingAnimation();
	}

	/**
	 * If the player is pressing the right or left arrow key and the player is on the ground, then play
	 * the walking animation
	 */
	checkWalking() {
		(this.world.keyboard.RIGHT || this.world.keyboard.LEFT) && this.objectOnGround() ? this.walkingAnimation() : null;
	}

	/**
	 * If the right arrow key is pressed and the player is not at the end of the level, then move the
	 * player right and play the walking sound
	 */
	checkWalkingRight() {
		this.world.keyboard.RIGHT && this.x < this.world.level.endOfLevel_x ? (this.moveRight(), this.forwards(), this.walking_sound.play()) : null;
	}

	/**
	 * If the left arrow key is pressed and the character is not at the left edge of the screen, then move
	 * the character left and play the walking sound
	 */
	checkWalkingLeft() {
		this.world.keyboard.LEFT && this.x > -50 ? (this.moveLeft(), this.backwards(), this.walking_sound.play()) : null;
	}

	/**
	 * If the player is above ground, pause the walking sound
	 */
	checkWalkingSound() {
		this.aboveGround() ? this.walking_sound.pause() : null;
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
		if (this.aboveGround()) return; // restricts another jump while being above ground level
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
		if (this.isInactive == true || this.isMoving() || this.isDead() || this.aboveGround()) return;
		this.idlingAnimation();
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
		if (this.isInactive == false || this.isMoving() || this.isDead() || this.aboveGround()) return;
		this.longIdlingAnimation();
	}

	// islazy muss auch auf false gesetzt werden, wenn er getroffen ist!
	checkStopLongIdling() {
		if (this.isMoving()) this.isInactive = false;
		return;
	}

	/**
	 * If the player is alive, heading forwards, and pressing the D key,
	 * then throw a bottle
	 * @returns the value of the expression.
	 */
	checkThrowing() {
		let bottle = new ThrowableObjects(this.x + 60, this.y + 100);
		if (this.noBottleToThrow()) return;
		if (this.world.keyboard.D && this.isAlive() && this.headingForwards()) {
			this.throwBottle(bottle);
			this.world.updateDecreaseStatusBarBottles();
		}
	}

	/**
	 * The function takes a bottle object and pushes it into the throwableObject array
	 * @param bottle - The bottle object to throw.
	 */
	throwBottle(bottle) {
		this.world.throwableObject.push(bottle);
	}

	/**
	 * If there are no bottles collected,
	 * then the player cannot throw a bottle.
	 * @returns The method is returning a boolean value.
	 */
	noBottleToThrow() {
		return this.world.noBottlesCollected();
	}

	/**
	 * If the number of bottles collected is equal to 0, then return true.
	 * @returns The number of bottles collected.
	 */
	noBottlesCollected() {
		return this.world.bottlesStatusBar.collectedBottles == 0;
	}

	/**
	 * If the energy is greater than 0, check if the character is in pain.
	 * If the energy is less than 0,
	 * play the animation for being killed
	 */
	checkReactionToInjury() {
		if (this.isDead()) return;
		if (this.isAlive()) this.checkIsBeingHurt();
	}

	/**
	 * If the player is above ground, return.
	 * If the player is in pain, play the animation.
	 * @returns The function isInPain() is being returned.
	 */
	checkIsBeingHurt() {
		if (this.aboveGround()) return;
		if (this.isInPain()) {
			this.beingInPainAnimation();
		}
	}

	checkIsBeingKilled() {
		if (this.isDead()) {
			this.applyGravity();
			this.jump();
			this.goesToGrave(1000);
			this.dyingAnimation();
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
	dyingAnimation() {
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
		return this.world.keyboard.RIGHT || this.world.keyboard.LEFT || this.world.keyboard.UP || this.world.keyboard.D;
	}
}
