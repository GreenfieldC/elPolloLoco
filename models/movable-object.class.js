class MovableObject extends DrawableObject {
	speed = 0.25;
	img;
	otherDirection = false;
	speedY = 0;
	acceleration = 4;
	energy = 100;
	lastHit = 0;

	objectInAir() {
		return this.y < 180;
	}

	applyGravity() {
		setInterval(() => {
			if (this.objectInAir() || this.speedY > 0) {
				this.y -= this.speedY; // warum nicht plus???
				this.speedY -= this.acceleration;
			}
		}, 1000 / 25);
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

	//character is colliding enemies
	isColliding(MovableObject) {
		return (
			this.x + this.width >= MovableObject.x &&
			this.x <= MovableObject.x + MovableObject.width &&
			this.x /* + this.offsetY */ + this.height >= MovableObject.x &&
			this.x /* + this.offsetY */ <=
				MovableObject.x + MovableObject.height /* &&
			MovableObject.onCollisionCourse */
			/* offSetY?????? */
			/* 
			!wenn pepe über den enemies ist, dann verliert er energy */
		); // Optional: hiermit könnten wir schauen, ob ein Objekt sich in die richtige Richtung bewegt. Nur dann kollidieren wir. Nützlich bei Gegenständen, auf denen man stehen kann.
	}

	// character looses energy after collsion with enemy
	injury() {
		this.energy--;
		this.energy < 0
			? (this.energy = 0)
			: (this.lastHit = new Date().getTime());
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
		let i = this.currrentImage % images.length;
		let path = images[i];
		this.img = this.imageCache[path];
		this.currrentImage++;
	}

	moveLeft() {
		this.x -= this.speed;
	}

	moveRight() {
		this.x += this.speed;
	}

	jump() {
		this.speedY = 40;
	}
}
