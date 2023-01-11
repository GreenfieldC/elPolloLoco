class MovableObject extends DrawableObject {
	speed = 0.25;
	img;
	otherDirection = false;
	speedY = 0;
	speedX = 35;
	acceleration = 9;
	energy = 100;
	lastHit = 0;
	groundPosition = 180;
	offset = {
		top: 0,
		bottom: 0,
		left: 0,
		right: 0,
	};

	forwards() {
		this.otherDirection = false;
	}

	backwards() {
		this.otherDirection = true;
	}

	objectInAir() {
		return this.y < this.groundPosition;
	}

	objectOnGround() {
		return this.y >= 180;
	}

	applyGravity() {
		setInterval(() => {
			if (this.objectInAir() || this.speedY > 0) {
				this.y -= this.speedY; // warum nicht plus???
				this.speedY -= this.acceleration;
			} else {
				this.speedX = 0; //bottles does not move on the ground!
			}
		}, 1000 / 25);
	}

	//character is colliding enemies
	isColliding(MovableObject) {
		return (
			this.x + this.width - this.offset.right >
				MovableObject.x + MovableObject.offset.left && // right side hits left of object
			this.y + this.height - this.offset.bottom >
				MovableObject.y + MovableObject.offset.top && // Bottom hits top of object
			this.x + this.offset.left <
				MovableObject.x +
					MovableObject.width -
					MovableObject.offset.right && // left side hit right side of object
			this.y + this.offset.top <
				MovableObject.y +
					MovableObject.height -
					MovableObject.offset.bottom
		);
		// Optional: hiermit könnten wir schauen, ob ein Objekt sich in die richtige Richtung bewegt. Nur dann kollidieren wir. Nützlich bei Gegenständen, auf denen man stehen kann.
	}

	// character looses energy after collsion with enemy
	injury() {
		this.energy--;
		this.energy < 0
			? (this.energy = 0)
			: (this.lastHit = new Date().getTime());
		/* console.log(this.energy); */
	}

	isInPain() {
		let timepassed = new Date().getTime() - this.lastHit; // difference in ms
		timepassed = timepassed / 1000;
		return timepassed < 0.5;
	}

	isDead() {
		return this.energy == 0;
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
		// Pepe landet tiefer als 180. Warum?
		this.speedY = 60;
	}
}
