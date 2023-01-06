class MovableObject {
	x = 10;
	y = 80;
	speed = 0.25;
	img;
	height = 250;
	width = 120;
	currrentImage = 0;
	imageCache = {};
	otherDirection = false;
	speedY = 0;
	acceleration = 4;

	objectInAir() {
		return this.y < 180;
	}

	applyGravity() {
		setInterval(() => {
			if (this.objectInAir() || this.speedY > 0) {
				this.y -= this.speedY; // warum nicht plus???
				this.speedY -= this.acceleration;
			}
		}, 1000 / 25);
	}

	loadImage(path) {
		this.img = new Image(); // Image() = document.getElementById('').innerHTML = <img src="path" alt="" />
		this.img.src = path;
	}

	loadImages(arr) {
		arr.forEach(path => {
			let img = new Image();
			img.src = path;
			this.imageCache[path] = img;
		});
	}

	playAnimation(images) {
		let i = this.currrentImage % this.IMAGES_WALKING.length;
		let path = images[i];
		this.img = this.imageCache[path];
		this.currrentImage++;
	}

	moveLeft() {
		this.x -= this.speed;
	}

	moveRight() {
		this.x += this.speed;
	}

	jump() {
		this.speedY = 40;
	}
}
