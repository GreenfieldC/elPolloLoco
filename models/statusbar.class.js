class StatusBar extends DrawableObject {
	IMAGES = [
		'./img/7_statusbars/1_statusbar/2_statusbar_health/orange/0.png',
		'./img/7_statusbars/1_statusbar/2_statusbar_health/orange/20.png',
		'./img/7_statusbars/1_statusbar/2_statusbar_health/orange/40.png',
		'./img/7_statusbars/1_statusbar/2_statusbar_health/orange/60.png',
		'./img/7_statusbars/1_statusbar/2_statusbar_health/orange/80.png',
		'./img/7_statusbars/1_statusbar/2_statusbar_health/orange/100.png',
	];

	percentage = 100;

	constructor() {
		this.loadImages(this.IMAGES);
	}

	//example set percentage = 40
	setPercentage(percentage) {
		this.percentage = percentage; //hieraus einen index zwischen 0 und 5 ermitteln
	}
}
