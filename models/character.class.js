class Character extends MovableObject {
	speed = 20;
	y = 180;
	world;
	walking_sound = new Audio('audio/walking_sound.mp3'); //später auslagern

	offset = {
		top: 150,
		bottom: -5,
		left: 0,
		right: 0,
	};

	IMAGES_WALKING = [
		'./img/2_character_pepe/2_walk/W-21.png',
		'./img/2_character_pepe/2_walk/W-22.png',
		'./img/2_character_pepe/2_walk/W-23.png',
		'./img/2_character_pepe/2_walk/W-24.png',
		'./img/2_character_pepe/2_walk/W-25.png',
		'./img/2_character_pepe/2_walk/W-26.png',
	];

	IMAGES_JUMPING = [
		'./img/2_character_pepe/3_jump/J-31.png',
		'./img/2_character_pepe/3_jump/J-32.png',
		'./img/2_character_pepe/3_jump/J-33.png',
		'./img/2_character_pepe/3_jump/J-34.png',
		'./img/2_character_pepe/3_jump/J-35.png',
		'./img/2_character_pepe/3_jump/J-36.png',
		'./img/2_character_pepe/3_jump/J-37.png',
		'./img/2_character_pepe/3_jump/J-38.png',
		'./img/2_character_pepe/3_jump/J-39.png',
	];

	IMAGES_DEAD = [
		'./img/2_character_pepe/5_dead/D-51.png',
		'./img/2_character_pepe/5_dead/D-52.png',
		'./img/2_character_pepe/5_dead/D-53.png',
		'./img/2_character_pepe/5_dead/D-54.png',
		'./img/2_character_pepe/5_dead/D-55.png',
		'./img/2_character_pepe/5_dead/D-56.png',
		'./img/2_character_pepe/5_dead/D-57.png',
	];

	IMAGES_INPAIN = [
		'./img/2_character_pepe/4_hurt/H-41.png',
		'./img/2_character_pepe/4_hurt/H-42.png',
		'./img/2_character_pepe/4_hurt/H-43.png',
	];

	IMAGES_IDLE = [
		'./img/2_character_pepe/1_idle/idle/I-1.png',
		'./img/2_character_pepe/1_idle/idle/I-2.png',
		'./img/2_character_pepe/1_idle/idle/I-3.png',
		'./img/2_character_pepe/1_idle/idle/I-4.png',
		'./img/2_character_pepe/1_idle/idle/I-5.png',
		'./img/2_character_pepe/1_idle/idle/I-6.png',
		'./img/2_character_pepe/1_idle/idle/I-7.png',
		'./img/2_character_pepe/1_idle/idle/I-8.png',
		'./img/2_character_pepe/1_idle/idle/I-9.png',
		'./img/2_character_pepe/1_idle/idle/I-10.png',
	];

	IMAGES_LONG_IDLE = [
		'./img/2_character_pepe/1_idle/long_idle/I-11.png',
		'./img/2_character_pepe/1_idle/long_idle/I-12.png',
		'./img/2_character_pepe/1_idle/long_idle/I-13.png',
		'./img/2_character_pepe/1_idle/long_idle/I-14.png',
		'./img/2_character_pepe/1_idle/long_idle/I-15.png',
		'./img/2_character_pepe/1_idle/long_idle/I-16.png',
		'./img/2_character_pepe/1_idle/long_idle/I-17.png',
		'./img/2_character_pepe/1_idle/long_idle/I-18.png',
		'./img/2_character_pepe/1_idle/long_idle/I-19.png',
		'./img/2_character_pepe/1_idle/long_idle/I-20.png',
	];

	constructor() {
		super().loadImage('./img/2_character_pepe/2_walk/W-21.png');
		this.loadImages(this.IMAGES_JUMPING); // images werden vorgeladen
		this.loadImages(this.IMAGES_WALKING); // images werden vorgeladen
		this.loadImages(this.IMAGES_DEAD); // images werden vorgeladen
		this.loadImages(this.IMAGES_INPAIN); // images werden vorgeladen
		this.loadImages(this.IMAGES_IDLE); // images werden vorgeladen
		this.loadImages(this.IMAGES_LONG_IDLE); // images werden vorgeladen
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
			this.checkWalkingSound();
			this.checkWalkingLeft();
			this.checkJumping();

			this.setCameraForCharacter();
		}, 100);

		setInterval(() => {
			this.energy > 0 ? this.checkIsInPain() : this.checkIsDead();
		}, 100);
	}

	/* hier sollen die Animtionen rein! */
	animations() {
		this.walkAnimation();
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
			this.playAnimation(this.IMAGES_JUMPING);
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
				this.playAnimation(this.IMAGES_WALKING);
			}
		}, 100);
	}

	setCameraForCharacter() {
		this.world.camera_x = -this.x + 100;
	}

	checkIsInPain() {
		if (this.isInPain()) {
			this.playAnimation(this.IMAGES_INPAIN);
		}
	}

	checkIsDead() {
		this.playAnimation(this.IMAGES_DEAD);
	}
}
