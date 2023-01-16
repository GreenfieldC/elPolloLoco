class Character extends MovableObject {
	speed = 20;
	y = 180;
	x = 2900; // test
	world;
	walking_sound = new Audio('audio/walking_sound.mp3'); //später auslagern
	cache = new CharacterCache();
	isInactive = false;
	energy = 100;

	offset = {
		top: 150,
		bottom: -5,
		left: 0,
		right: 0,
	};

	constructor() {
		super().loadImage('./img/2_character_pepe/2_walk/W-21.png');
		this.loadImages(this.cache.IMAGES_WALKING); // images werden vorgeladen
		this.loadImages(this.cache.IMAGES_JUMPING); // images werden vorgeladen
		this.loadImages(this.cache.IMAGES_DEAD); // images werden vorgeladen
		this.loadImages(this.cache.IMAGES_INPAIN); // images werden vorgeladen
		this.loadImages(this.cache.IMAGES_IDLE); // images werden vorgeladen
		this.loadImages(this.cache.IMAGES_LONG_IDLE); // images werden vorgeladen
		this.applyGravity();
		this.animations();
		this.animate();
		this.otherDirection = false;
	}

	/* hier nur die Funktionen, wo Tasten gedrückt werden */
	animate() {
		setInterval(() => {
			this.walking_sound.pause();
			this.checkWalkingRight();
			this.checkWalkingLeft();
			this.checkWalkingSound();
			this.checkJumping();
			this.checkIsIdling(); // intervall zu hoch auslagern in andere Funktionen
			this.checkIsLongIdling(); // intervall zu hoch auslagern in andere Funktionen
			this.checkStopLongIdling();
			this.setCameraForCharacter();
		}, 100);

		setInterval(() => {
			this.energy > 0 ? this.checkIsInPain() : this.isDeadAnimation();
		}, 100);
	}

	/* hier sollen die Animtionen rein! */
	animations() {
		this.walkAnimation();
		this.idlingAnimation();
		this.longIdlingAnimation();
	}

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

	checkWalkingLeft() {
		if (this.world.keyboard.LEFT && this.x > -50) {
			this.moveLeft();
			this.backwards(); //if true then mirror character
			this.walking_sound.play();
		}
	}

	checkJumping() {
		if (this.aboveGround()) {
			this.playAnimation(this.cache.IMAGES_JUMPING);
		}
		if (this.aboveGround()) return; // restrict more than one jump at the time
		if (this.world.keyboard.UP) {
			this.jump();
		}
		if (this.objectOnGround) this.airStatus = false;
	}

	checkWalkingSound() {
		if (this.aboveGround()) {
			this.walking_sound.pause();
		}
	}

	/* 
! kein if in setinterval!!!!! ändern!
 */
	walkAnimation() {
		setInterval(() => {
			if (
				(this.world.keyboard.RIGHT || this.world.keyboard.LEFT) &&
				this.objectOnGround()
			) {
				this.playAnimation(this.cache.IMAGES_WALKING);
			}
		}, 100);
	}

	setCameraForCharacter() {
		this.world.camera_x = -this.x + 100;
	}

	checkIsInPain() {
		if (this.isInPain()) {
			this.playAnimation(this.cache.IMAGES_INPAIN);
		}
	}

	isDeadAnimation() {
		this.playAnimation(this.cache.IMAGES_DEAD);
	}

	idlingAnimation() {
		this.playAnimation(this.cache.IMAGES_IDLE);
	}

	longIdlingAnimation() {
		this.playAnimation(this.cache.IMAGES_LONG_IDLE);
	}

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

	// islazy muss auch auf false gesetzt werden, wenn er getroffen ist!
	checkStopLongIdling() {
		if (this.isMoving()) this.isInactive = false;
		return;
	}

	isActive() {
		return (this.isInactive = false);
	}

	isMoving() {
		return (
			this.world.keyboard.RIGHT ||
			this.world.keyboard.LEFT ||
			this.world.keyboard.UP ||
			this.world.keyboard.D
		);
	}
}
