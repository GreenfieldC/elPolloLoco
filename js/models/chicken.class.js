class Chicken extends MovableObject {
	IMAGES_WALKING = [
		'../img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
		'../img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
		'../img/3_enemies_chicken/chicken_normal/1_walk/3_w.png',
	];

	constructor() {
		super().loadImage('../img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');
		this.loadImages(this.IMAGES_WALKING);
		this.x = 200 + Math.random() * 500;
		this.y = 360;
		this.height = 75;
		this.width = 75;
		this.animation();
		this.speed = 0.15 + Math.random() * 0.9;
	}

	animation() {
		this.moveLeft();

		setInterval(() => {
			let i = this.currrentImage % this.IMAGES_WALKING.length;
			let path = this.IMAGES_WALKING[i];
			this.img = this.imageCache[path];
			this.currrentImage++;
		}, 300);
	}
}
