class EndbossDies extends MovableObject {
	width = 300;
	height = 300;
	y = 140;

	offset = {
		top: 100,
		bottom: 15,
		left: 50,
		right: 50,
	};

	IMAGES_ENDBOSS_DYING = [
		'./img/4_enemie_boss_chicken/5_dead/G24.png',
		'./img/4_enemie_boss_chicken/5_dead/G25.png',
		'./img/4_enemie_boss_chicken/5_dead/G26.png',
	];

	constructor() {
		super().loadImage(this.IMAGES_ENDBOSS_DYING[0]);
		this.loadImages(this.IMAGES_ENDBOSS_DYING);
		this.x = 3420;
		this.animate();
	}

	animate() {
		setInterval(() => {
			this.playAnimation(this.IMAGES_ENDBOSS_DYING);
		}, 300);
	}
}
