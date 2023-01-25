class Coins extends MovableObject {
	height = 150;
	width = 150;
	y = 0;
	growthRate = 10;

	offset = {
		top: 50,
		bottom: 20,
		left: 50,
		right: 50,
	};

	constructor(imagePath, x) {
		super().loadImage(imagePath, x);
		this.y = 80 + Math.random() * 200;
		this.x = x;
		this.pulsatingCoinsAnimation();
	}

	/**
	 * Enlarges and shrinks coins in an infinite loop.
	 *
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

	/**
	 * Makes sure that coins stay
	 * always at the same position while rezizing
	 */
	fixationCoins() {
		this.x -= this.growthRate / 2;
		this.y -= this.growthRate / 2;
	}

	/**
	 * Defines the growthrate
	 * of the coins
	 */
	sizingCoins() {
		this.height += this.growthRate;
		this.width += this.growthRate;
	}

	/**
	 * Changes growthrate to the opposite
	 * to activate shrinking or enlarging of coins
	 */
	toggleGrowthDirection() {
		this.growthRate = -this.growthRate;
	}
}
