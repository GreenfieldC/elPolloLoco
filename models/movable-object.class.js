class MovableObject extends DrawableObject {
	speed = 0.25;
	img;
	otherDirection = false;
	speedY = 0;
	speedX = 80;
	acceleration = 10;
	energy = 100;
	lastHit = 0;
	timeLimit = 0;
	groundPosition = 180;
	setIntervalId = [];

	offset = {
		top: 0,
		bottom: 0,
		left: 0,
		right: 0,
	};

	isAlive() {
		return this.energy > 0;
	}

	isDead() {
		return this.energy <= 0;
	}

	forwards() {
		this.otherDirection = false;
	}

	headingForwards() {
		return this.otherDirection == false;
	}

	backwards() {
		this.otherDirection = true;
	}

	aboveGround() {
		return this.y < this.groundPosition;
	}

	objectOnGround() {
		return this.y >= this.groundPosition;
	}

	// if aus setinterval raus!?
	applyGravity() {
		this.playInterval = setStoppableInterval(this.gravity.bind(this), 40);
	}

	gravity() {
		if (this.aboveGround() || this.speedY > 0) {
			this.y -= this.speedY; // warum nicht plus???
			this.speedY -= this.acceleration;
		} else {
			this.speedX = 0; //bottles does not move on the ground!
			this.y = this.groundPosition;
		}
	}

	//character is colliding enemies
	isColliding(object) {
		return (
			this.rightBorderColliding(object) && // right side hits left of object
			this.bottomBorderColliding(object) && // Bottom hits top of object
			this.leftBorderColliding(object) && // left side hit right side of object
			this.topBorderColliding(object)
		);
		// Optional: hiermit könnten wir schauen, ob ein Objekt sich in die richtige Richtung bewegt. Nur dann kollidieren wir. Nützlich bei Gegenständen, auf denen man stehen kann.
	}

	/* Checking if the right side of the object is colliding with the left side of the object. */
	rightBorderColliding(object) {
		return (
			this.x + this.width - this.offset.right >
			object.x + object.offset.left
		);
	}

	bottomBorderColliding(object) {
		return (
			this.y + this.height - this.offset.bottom >
			object.y + object.offset.top
		);
	}

	leftBorderColliding(object) {
		return (
			this.x + this.offset.left <
			object.x + object.width - object.offset.right
		);
	}

	topBorderColliding(object) {
		return (
			this.y + this.offset.top <
			object.y + object.height - object.offset.bottom
		);
	}

	// character looses energy after collsion with enemy
	injury(damage) {
		this.energy -= damage;
		this.energy < 0
			? (this.energy = 0)
			: (this.lastHit = new Date().getTime());
	}

	/**
	 * Calculates the time being passed
	 * since the last hit/collision
	 * @param {number} timeLimit
	 * @returns {boolean} it is true when time passed it smaller than time
	 */
	isInPain(timeLimit) {
		let timepassed = this.now() - this.lastHit; // difference in ms
		timepassed = timepassed / 1000;
		return timepassed < timeLimit;
	}

	/**
	 *
	 * @returns {number} current time in ms
	 */
	now() {
		return new Date().getTime();
	}

	playAnimation(images) {
		let i = this.currentImage % images.length;
		let path = images[i];
		this.img = this.imageCache[path];
		this.currentImage++;
	}

	moveLeft() {
		this.x -= this.speed;
	}

	moveRight() {
		this.x += this.speed;
	}

	jump() {
		this.speedY = 60;
	}

	/**
	 * By setting the groundposition out of the map after its final jump,
	 * endboss falls out off map!.
	 */
	goesToGrave(newGround) {
		this.groundPosition = newGround;
	}
}
