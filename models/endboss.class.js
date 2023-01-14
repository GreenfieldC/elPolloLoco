class Endboss extends MovableObject {
	width = 300;
	height = 300;
	y = 140;
	speed = 5;

	offset = {
		top: 100,
		bottom: 15,
		left: 50,
		right: 50,
	};
	IMAGES_ALERT = [
		'./img/4_enemie_boss_chicken/2_alert/G5.png',
		'./img/4_enemie_boss_chicken/2_alert/G6.png',
		'./img/4_enemie_boss_chicken/2_alert/G7.png',
		'./img/4_enemie_boss_chicken/2_alert/G8.png',
		'./img/4_enemie_boss_chicken/2_alert/G9.png',
		'./img/4_enemie_boss_chicken/2_alert/G10.png',
		'./img/4_enemie_boss_chicken/2_alert/G11.png',
		'./img/4_enemie_boss_chicken/2_alert/G12.png',
	];

	IMAGES_HURT = [
		'./img/4_enemie_boss_chicken/4_hurt/G21.png',
		'./img/4_enemie_boss_chicken/4_hurt/G22.png',
		'./img/4_enemie_boss_chicken/4_hurt/G23.png',
	];

	IMAGES_WALKING = [
		'./img/4_enemie_boss_chicken/1_walk/G1.png',
		'./img/4_enemie_boss_chicken/1_walk/G2.png',
		'./img/4_enemie_boss_chicken/1_walk/G3.png',
		'./img/4_enemie_boss_chicken/1_walk/G4.png',
	];

	IMAGES_ATTACK = [
		'./img/4_enemie_boss_chicken/3_attack/G13.png',
		'./img/4_enemie_boss_chicken/3_attack/G14.png',
		'./img/4_enemie_boss_chicken/3_attack/G15.png',
		'./img/4_enemie_boss_chicken/3_attack/G16.png',
		'./img/4_enemie_boss_chicken/3_attack/G17.png',
		'./img/4_enemie_boss_chicken/3_attack/G18.png',
		'./img/4_enemie_boss_chicken/3_attack/G19.png',
		'./img/4_enemie_boss_chicken/3_attack/G20.png',
	];

	constructor() {
		super().loadImage(this.IMAGES_ALERT[0]);
		this.loadImages(this.IMAGES_ALERT);
		this.loadImages(this.IMAGES_WALKING);
		this.loadImages(this.IMAGES_HURT);
		this.loadImages(this.IMAGES_ATTACK);
		this.x = 3420;
		this.moveLeft();
		this.livingBossAnimation();
	}

	livingBossAnimation() {
		setInterval(() => {
			this.alertAnimation();
		}, 300);
	}

	alertAnimation() {
		this.playAnimation(this.IMAGES_ALERT);
	}
}
