class Coins extends MovableObject {
	height = 150;
	width = 150;
	y = 0;
	growthRate = 10;

	constructor(imagePath, x) {
		super().loadImage(imagePath, x);
		this.y = 80 + Math.random() * 200;
		this.x = x;
		this.pulsatingCoinsAnimation();
	}

	/**
	 * Enlarges and shrinks coins in an infinite loop.
	 * {growthrate}
	 */
	pulsatingCoinsAnimation() {
		setInterval(() => {
			if (this.height <= 150 || this.height < 200) {
				this.sizingCoins();
				this.fixationCoins();
			}
			this.toggleGrowthDirection();
		}, 800);
	}

	fixationCoins() {
		this.x -= this.growthRate / 2;
		this.y -= this.growthRate / 2;
	}

	sizingCoins() {
		this.height += this.growthRate;
		this.width += this.growthRate;
	}

	toggleGrowthDirection() {
		this.growthRate = -this.growthRate;
	}
}
