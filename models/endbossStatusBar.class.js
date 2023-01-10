class EndbossStatusBar extends DrawableObject {
	IMAGES = [
		'./img/7_statusbars/1_statusbar/1_statusbar_coin/orange/0.png',
		'./img/7_statusbars/1_statusbar/1_statusbar_coin/orange/20.png',
		'./img/7_statusbars/1_statusbar/1_statusbar_coin/orange/40.png',
		'./img/7_statusbars/1_statusbar/1_statusbar_coin/orange/60.png',
		'./img/7_statusbars/1_statusbar/1_statusbar_coin/orange/80.png',
		'./img/7_statusbars/1_statusbar/1_statusbar_coin/orange/100.png',
	];

	percentage = 0;

	constructor() {
		super();
		this.loadImages(this.IMAGES);
		this.x = 15;
		this.y = 90;
		this.width = 200;
		this.height = this.width * 0.265;
		this.setPercentage(0);
	}

	//example set percentage = 40
	setPercentage(percentage) {
		this.percentage = percentage; //hieraus einen index zwischen 0 und 5 ermitteln
		let path = this.IMAGES[this.resolveImageIndex()];
		this.img = this.imageCache[path];
	}

	resolveImageIndex() {
		switch (true) {
			case this.percentage == 100:
				return 5;
			case this.percentage > 80:
				return 4;
			case this.percentage > 60:
				return 3;
			case this.percentage > 40:
				return 2;
			case this.percentage > 20:
				return 1;
			default:
				return 0;
		}
	}
}
