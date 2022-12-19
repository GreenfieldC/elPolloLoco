class MovableObject {
	x = 10;
	y = 200;
	img;
	height = 250;
	width = 100;

	loadImage(path) {
		this.img = new Image();
		this.img.src = path;
	}

	moveRight() {
		console.log('moving right');
	}

	moveLeft() {
		console.log('moving left');
	}
}
