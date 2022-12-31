class MovableObject {
	x = 10;
	y = 180;
	speed = 0.25;
	img;
	height = 250;
	width = 120;
	currrentImage = 0;
	imageCache = {};
	otherDirection = false;

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

	/* moveRight() {
		console.log('moving right');
	} */

	moveLeft() {
		setInterval(() => {
			this.x -= this.speed;
		}, 1000 / 60);
	}
}
