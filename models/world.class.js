class World {
	character = new Character();
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
	}

	setWorld() {
		this.character.world = this;
	}

	draw() {
		this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height); //Inhalt von Canvas wird gelöscht

		this.ctx.translate(this.camera_x, 0);
		this.addObjectsToCanvas(this.level.backgroundObjects);
		this.addToCanvas(this.character);

		this.addObjectsToCanvas(this.level.enemies);
		this.addObjectsToCanvas(this.level.clouds);

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
			this.ctx.save();
			this.ctx.translate(movableObject.width, 0);
			this.ctx.scale(-1, 1);
			movableObject.x = movableObject.x * -1;
		}

		this.ctx.drawImage(
			movableObject.img,
			movableObject.x,
			movableObject.y,
			movableObject.width,
			movableObject.height
		);

		if (movableObject.otherDirection) {
			movableObject.x = movableObject.x * -1;
			this.ctx.restore();
		}
	}
}
