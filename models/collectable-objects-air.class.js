class CollectableObjectsAir extends MovableObject {
	height = 80;
	width = 80;
	y = 0;

	constructor(imagePath, x) {
		super().loadImage(imagePath, x);
		this.y = 80 + Math.random() * 200;
		this.x = x;
	}
}
