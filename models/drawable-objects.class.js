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

	/**
	 * Gets all the values in "cache",
	 * itertates through the array with values
	 * and preloads images.
	 */
	loadAllImagesFromCache() {
		Object.values(this.cache).forEach((source) => {
			if (Array.isArray(source)) {
				this.loadImages(source);
			}
		});
	}

	/**
	 * Main draw-function to draw elemnts on canvas
	 * @param {ctx} ctx
	 */
	draw(ctx) {
		ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
	}

	drawWorld() {
		this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height); //Inhalt von Canvas wird gelöscht
		this.ctx.translate(this.camera_x, 0);
		this.drawNature();
		this.ctx.translate(-this.camera_x, 0); //backwards
		this.drawFixedObjects();
		this.ctx.translate(this.camera_x, 0); // forwards
		this.drawMovableObjects();
		this.ctx.translate(-this.camera_x, 0);
		this.requestFrame();
	}

	/**
	 * Calls drawWorld() in an infinite loop
	 * to draw the game world on the canvas
	 */
	requestFrame() {
		let self = this;
		requestAnimationFrame(() => {
			self.drawWorld();
		});
	}

	drawNature() {
		this.addObjectsToCanvas(this.level.backgroundObjects);
		this.addObjectsToCanvas(this.level.clouds);
	}

	/**
	 * Draws fixed objects (statusbars) on the canvas
	 * statusbar gets drawn if character gets detected by endboss or attaks it.
	 */
	drawFixedObjects() {
		this.drawStatusBarEndBossIfFightStarted();
		this.addToCanvas(this.healthStatusBar);
		this.addToCanvas(this.bottlesStatusBar);
		this.addToCanvas(this.coinsStatusBar);
	}

	drawStatusBarEndBossIfFightStarted() {
		if (this.endbossGetsAnnoyed()) {
			this.addToCanvas(this.statusBarEndboss);
			this.addToCanvas(this.overlayIconStatusBarEndboss);
		}
	}

	/**
	 * @returns the values that initiate the endboss
	 * moving and fighting against the character
	 */
	endbossGetsAnnoyed() {
		return (
			this.level.endBoss[0].characterDetected || this.level.endBoss[0].beingAttacked
		);
	}

	drawMovableObjects() {
		this.addObjectsToCanvas(this.level.smallEnemies);
		this.addObjectsToCanvas(this.level.biggerEnemies);
		this.addObjectsToCanvas(this.level.endBoss);
		this.addObjectsToCanvas(this.level.bottlesOnGround);
		this.addObjectsToCanvas(this.level.bottlesInAir);
		this.addObjectsToCanvas(this.level.coins);
		this.addObjectsToCanvas(this.throwableObject);
		this.addObjectsToCanvas(this.splashedBottle);
		this.addObjectsToCanvas(this.deadEnemies);
		this.addToCanvas(this.character);
	}

	/**
	 * objects from array are being drawn on the canvas
	 * @param {object} objects to be drawn like small eniemies etc.
	 */
	addObjectsToCanvas(objects) {
		objects.forEach((object) => {
			this.addToCanvas(object);
		});
	}

	/**
	 * Draws all mo in the right way.
	 * statusBarEndboss gets flipped once
	 * character only by change of direction
	 * @param {movableObject} objects that can change direction (only character)
	 */
	addToCanvas(movableObject) {
		if (movableObject.otherDirection || movableObject == this.statusBarEndboss)
			this.flipImage(movableObject);

		movableObject.draw(this.ctx);

		if (movableObject.otherDirection || movableObject == this.statusBarEndboss)
			this.flipImageBack(movableObject);
	}

	/**
	 * The function flips the image by translating the canvas to the width of the image, scaling the
	 * canvas by -1, and then translating the image by the width of the image.
	 * @param {movableObject} - The object that you want to flip.
	 */
	flipImage(movableObject) {
		this.ctx.save();
		this.ctx.translate(movableObject.width, 0);
		this.ctx.scale(-1, 1);
		movableObject.x = movableObject.x * -1;
	}

	/**
	 * Flips mo horizontally
	 * @param {mo} movableObject
	 */
	flipImageBack(movableObject) {
		movableObject.x = movableObject.x * -1;
		this.ctx.restore();
	}

	/**
	 * @param {collectedAmount} - The amount of items collected.
	 * @returns the index of the image to be displayed.
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

	/**
	 * @param {percentage} - The percent of energy of character/endboss.
	 * @returns the index of the image to be displayed.
	 */
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
