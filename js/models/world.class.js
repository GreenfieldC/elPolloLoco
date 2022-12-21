class World {
	character = new Character();
	enemies = [new Chicken(), new Chicken(), new Chicken(), new Chicken(), new Chicken()];

	clouds = [new Cloud()];
	backgroundObjects = [
		new BackgroundObject('../img/5_background/layers/air.png', 0),
		new BackgroundObject('../img/5_background/layers/3_third_layer/1.png', 0),
		new BackgroundObject('../img/5_background/layers/2_second_layer/1.png', 0),
		new BackgroundObject('../img/5_background/layers/1_first_layer/1.png', 0),
	];

	canvas;
	ctx;
	constructor(canvas) {
		this.ctx = canvas.getContext('2d');
		this.canvas = canvas;
		this.draw();
	}

	draw() {
		this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height); //Inhalt von Canvas wird gelöscht

		this.addObjectsToCanvas(this.backgroundObjects);
		this.addToCanvas(this.character);

		this.addObjectsToCanvas(this.enemies);
		this.addObjectsToCanvas(this.clouds);

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
		this.ctx.drawImage(
			movableObject.img,
			movableObject.x,
			movableObject.y,
			movableObject.width,
			movableObject.height
		);
	}
}
