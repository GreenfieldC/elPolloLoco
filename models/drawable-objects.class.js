class DrawableObject {
	x = 10;
	y = 80;
	height = 250;
	width = 120;
	img;
	imageCache = {};
	currentImage = 0;

	loadImage(path) {
		this.img = new Image(); // Image() = document.getElementById('').innerHTML = <img src="path" alt="" />
		this.img.src = path;
	}

	loadImages(arr) {
		arr.forEach((path) => {
			let img = new Image();
			img.src = path;
			this.imageCache[path] = img;
		});
	}

	draw(ctx) {
		ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
	}

	/* drawBorders(ctx) {
		// hier der Rahmen auf Character, Chicken, Chick begrent
		if (
			this instanceof Character ||
			this instanceof Chicken ||
			this instanceof Chick ||
			this instanceof Endboss ||
			this instanceof ThrowableObjects ||
			this instanceof BottlesInAir
		) {
			ctx.beginPath();
			ctx.lineWidth = '2';
			ctx.strokeStyle = 'blue';
			ctx.rect(this.x, this.y, this.width, this.height);
			ctx.stroke();
		}
	} */

	/**
	 * @param {collectedAmount} - The amount of items collected.
	 * @returns the index of the image to be displayed.
	 *! ODER auch hier mit Prozent? Oder keine Statusbar?
	 */
	resolveImageIndexCollectableObjectsBar(collectedAmount) {
		switch (true) {
			case collectedAmount < 2:
				return 0;
			case collectedAmount <= 2:
				return 1;
			case collectedAmount <= 4:
				return 2;
			case collectedAmount <= 6:
				return 3;
			case collectedAmount <= 8:
				return 4;
			case collectedAmount <= 10:
			case collectedAmount > 10:
				return 5;
		}
	}
	resolveImageIndexHealthBar() {
		switch (true) {
			case this.percentage == 100:
				return 5;
			case this.percentage > 80:
				return 4;
			case this.percentage > 60:
				return 3;
			case this.percentage > 40:
				return 2;
			case this.percentage > 20:
				return 1;
			default:
				return 0;
		}
	}
}
