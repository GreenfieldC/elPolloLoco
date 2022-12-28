class MovableObject {
	x = 10;
	y = 190;
	speed = 0.25;
	img;
	height = 250;
	width = 120;
	currrentImage = 0;
	imageCache = {};
	otherDirection = false;

	loadImage(path) {
		this.img = new Image();
		this.img.src = path;
	}

	loadImages(arr) {
		arr.forEach(path => {
			let img = new Image();
			img.src = path;
			this.imageCache[path] = img;
		});
	}

	moveRight() {
		console.log('moving right');
	}

	moveLeft() {
		setInterval(() => {
			this.x -= this.speed;
		}, 1000 / 60);
	}
}
