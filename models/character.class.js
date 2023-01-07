class Character extends MovableObject {
	speed = 20;
	y = 80;

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

	world;
	walking_sound = new Audio('audio/walking_sound.mp3');

	constructor() {
		super().loadImage('./img/2_character_pepe/2_walk/W-21.png');
		this.loadImages(this.IMAGES_JUMPING); // images werden vorgeladen
		this.loadImages(this.IMAGES_WALKING); // images werden vorgeladen
		this.loadImages(this.IMAGES_DEAD); // images werden vorgeladen
		this.loadImages(this.IMAGES_INPAIN); // images werden vorgeladen
		this.applyGravity();
		this.animation();
	}

	animation() {
		setInterval(() => {
			this.walking_sound.pause();
			if (
				this.world.keyboard.RIGHT &&
				this.x < this.world.level.endOfLevel_x
			) {
				this.moveRight();
				this.otherDirection = false;
				this.walking_sound.play();
			}

			if (this.world.keyboard.LEFT && this.x > -50) {
				this.moveLeft();
				this.otherDirection = true; //if true then mirror character
				this.walking_sound.play();
			}

			if (this.objectInAir()) {
				this.walking_sound.pause();
			}
			this.world.camera_x = -this.x + 100;
		}, 100);

		setInterval(() => {
			if (
				(this.world.keyboard.RIGHT || this.world.keyboard.LEFT) &&
				this.y >= 170
			) {
				// walk animation
				this.playAnimation(this.IMAGES_WALKING);
			}
		}, 100);

		/* 
		! Pepe soll immer gleich landen und abspringen! Muss noch gemacht werden.
		 */
		setInterval(() => {
			if (this.energy > 0) {
				if (this.isInPain()) {
					this.playAnimation(this.IMAGES_INPAIN);
				}
				if (this.objectInAir()) {
					this.playAnimation(this.IMAGES_JUMPING);
				}
				if (this.objectInAir()) return;
				if (this.world.keyboard.UP) {
					this.jump();
				}
				if (this.y >= 180) this.airStatus = false;
			} else {
				this.playAnimation(this.IMAGES_DEAD);
			}
		}, 150);
	}
}
