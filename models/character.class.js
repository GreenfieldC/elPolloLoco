class Character extends MovableObject {
	speed = 20;

	IMAGES_WALKING = [
		'./img/2_character_pepe/2_walk/W-21.png',
		'./img/2_character_pepe/2_walk/W-22.png',
		'./img/2_character_pepe/2_walk/W-23.png',
		'./img/2_character_pepe/2_walk/W-24.png',
		'./img/2_character_pepe/2_walk/W-25.png',
		'./img/2_character_pepe/2_walk/W-26.png',
	];

	world;
	walking_sound = new Audio('audio/walking_sound.mp3');

	constructor() {
		super().loadImage('./img/2_character_pepe/2_walk/W-21.png');
		this.loadImages(this.IMAGES_WALKING);

		this.animation();
	}

	animation() {
		setInterval(() => {
			this.walking_sound.pause();
			if (this.world.keyboard.RIGHT && this.x < this.world.level.endOfLevel_x) {
				// move to the right
				this.x += this.speed;
				this.otherDirection = false;
				this.walking_sound.play();
			}

			if (this.world.keyboard.LEFT && this.x > -50) {
				// move to the left
				this.x -= this.speed;
				this.otherDirection = true; //if true then mirror character
				this.walking_sound.play();
			}
			this.world.camera_x = -this.x + 100;
		}, 100);

		setInterval(() => {
			if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
				// walk animation
				this.playAnimation(this.IMAGES_WALKING);
			}
		}, 100);
	}

	jump() {}
}
