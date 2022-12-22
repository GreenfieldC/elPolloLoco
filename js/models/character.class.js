class Character extends MovableObject {
	speed = 10;
	IMAGES_WALKING = [
		'../../img/2_character_pepe/2_walk/W-21.png',
		'../../img/2_character_pepe/2_walk/W-22.png',
		'../../img/2_character_pepe/2_walk/W-23.png',
		'../../img/2_character_pepe/2_walk/W-24.png',
		'../../img/2_character_pepe/2_walk/W-25.png',
		'../../img/2_character_pepe/2_walk/W-26.png',
	];

	world;

	constructor() {
		super().loadImage('../../img/2_character_pepe/2_walk/W-21.png');
		this.loadImages(this.IMAGES_WALKING);

		this.animation();
	}

	animation() {
		setInterval(() => {
			if (this.world.keyboard.RIGHT) {
				// move to the right
				this.x += this.speed;
				this.otherDirection = false;
			}

			if (this.world.keyboard.LEFT) {
				// move to the right
				this.x -= this.speed;
				this.otherDirection = true; //if true then mirror character
			}
			this.world.camera_x = -this.x;
		}, 100);

		setInterval(() => {
			if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
				// walk animation
				let i = this.currrentImage % this.IMAGES_WALKING.length;
				let path = this.IMAGES_WALKING[i];
				this.img = this.imageCache[path];
				this.currrentImage++;
			}
		}, 100);
	}

	jump() {}
}
