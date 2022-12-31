class Bottle extends MovableObject {
	height = 90;
	width = 90;
	y = 340;

	constructor() {
		super().loadImage('./img/6_salsa_bottle/1_salsa_bottle_on_ground.png');
		this.x = 100;
	}
}
