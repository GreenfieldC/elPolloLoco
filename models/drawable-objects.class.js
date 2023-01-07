class DrawableObject {
	x = 10;
	y = 80;
	height = 250;
	width = 120;
	img;
	imageCache = {};
	currrentImage = 0;

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

	draw(ctx) {
		ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
	}

	drawBorders(ctx) {
		// hier der Rahmen auf Character, Chicken, Chick begrent
		if (
			this instanceof Character ||
			this instanceof Chicken ||
			this instanceof Chick ||
			this instanceof Endboss
		) {
			ctx.beginPath();
			ctx.lineWidth = '2';
			ctx.strokeStyle = 'blue';
			ctx.rect(this.x, this.y, this.width, this.height);
			ctx.stroke();
		}
	}
}
