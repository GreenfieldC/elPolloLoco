class World {
	character = new Character();
	throwableBottle = [new ThrowableObjects()];
	healthStatusBar = new HealthStatusBar();
	bottlesStatusBar = new BottlesStatusBar();
	coinsStatusBar = new CoinsStatusBar();
	level = level1;
	canvas;
	ctx;
	keyboard;
	camera_x = -100;

	constructor(canvas, keyboard) {
		this.ctx = canvas.getContext('2d');
		this.canvas = canvas;
		this.keyboard = keyboard;
		this.draw();
		this.setWorld();
		this.run();
	}

	setWorld() {
		this.character.world = this;
	}

	injury() {
		this.character.energy--;
	}

	checkCollisions() {
		this.level.enemies.forEach(enemy => {
			if (this.character.isColliding(enemy)) {
				this.character.injury();
				this.healthStatusBar.setPercentage(this.character.energy);
			}
		});
	}

	checkThrowBottles() {
		let bottle = new ThrowableObjects(
			this.character.x + 50,
			this.character.y + 100
		);
		if (this.keyboard.D) this.throwableBottle.push(bottle);
	}

	run() {
		setInterval(() => {
			this.checkCollisions();
			this.checkThrowBottles();
		}, 200);
	}

	draw() {
		this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height); //Inhalt von Canvas wird gelöscht

		this.ctx.translate(this.camera_x, 0);
		//The order is important. Objects are being put on top of each other.
		this.addObjectsToCanvas(this.level.backgroundObjects);
		this.addObjectsToCanvas(this.level.clouds);

		this.ctx.translate(-this.camera_x, 0); //backwards
		this.addToCanvas(this.healthStatusBar);
		this.addToCanvas(this.bottlesStatusBar);
		this.addToCanvas(this.coinsStatusBar);
		this.ctx.translate(this.camera_x, 0); // forwards

		this.addObjectsToCanvas(this.level.enemies);

		this.addObjectsToCanvas(this.level.bottlesOnGround);
		this.addObjectsToCanvas(this.level.objectsInAir);
		this.addToCanvas(this.character);
		this.addObjectsToCanvas(this.throwableBottle);

		this.ctx.translate(-this.camera_x, 0);

		// Draw() wird immer wieder aufgerufen
		let self = this;
		requestAnimationFrame(function () {
			self.draw();
		});
	}

	addObjectsToCanvas(objects) {
		objects.forEach(object => {
			this.addToCanvas(object);
		});
	}

	addToCanvas(movableObject) {
		if (movableObject.otherDirection) {
			this.flipImage(movableObject);
		}

		movableObject.draw(this.ctx);
		movableObject.drawBorders(this.ctx);

		if (movableObject.otherDirection) {
			this.flipImageBack(movableObject);
		}
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

	flipImageBack(movableObject) {
		movableObject.x = movableObject.x * -1;
		this.ctx.restore();
	}
}
