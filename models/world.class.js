class World {
	character = new Character();
	throwableObject = [];
	splashedBottle = [];
	deadEnemies = [];
	healthStatusBar = new HealthStatusBar();
	bottlesStatusBar = new BottlesStatusBar();
	coinsStatusBar = new CoinsStatusBar();
	statusBarEndboss = new HealthStatusBarEndBoss();
	overlayIconStatusBarEndboss = new OverlayIconEndboss();
	level = level1;
	canvas;
	ctx;
	keyboard;
	camera_x = -100;

	constructor(canvas, keyboard) {
		this.ctx = canvas.getContext('2d');
		this.canvas = canvas;
		this.keyboard = keyboard;
		this.draw();

		this.setWorld();
		this.run();
	}

	setWorld() {
		this.character.world = this;
	}

	/* important to run the game */
	run() {
		setInterval(() => {
			this.checkCollsionWithEnemies();
			this.checkCollsionWithCollectableObjects();
			this.checkThrowBottles(); // hier ansetzen für splashed bottles
			this.checkBottleHitsGround();
			this.checkBottleHitsEnemy();
			this.checkCharacterGetDetectedByEndboss();
		}, 30);
	}

	checkCollsionWithEnemies() {
		this.checkCollisionsWithSmallEnemies();
		this.checkCollisionsWithBiggerEnemies();
		this.checkCollisionsWithEndBossEnemies();
		this.checkKillEnemyByJump();
	}

	checkCollisionsWithSmallEnemies() {
		this.level.smallEnemies.forEach((enemy) => {
			if (this.character.aboveGround()) return;
			if (this.character.isColliding(enemy)) {
				this.character.injury(0.5);
				this.healthStatusBar.setPercentage(this.character.energy);
				/* this.character.isInactive = false; */ // Warum geht das nicht
			}
		});
	}

	checkCollisionsWithBiggerEnemies() {
		this.level.biggerEnemies.forEach((enemy) => {
			if (this.character.isColliding(enemy)) {
				this.character.injury(1);
				this.healthStatusBar.setPercentage(this.character.energy);
				/* this.character.isInactive = false; */
			}
		});
	}

	checkCollisionsWithEndBossEnemies() {
		this.level.endBoss.forEach((enemy) => {
			if (this.character.isColliding(enemy)) {
				this.character.injury(5);
				this.healthStatusBar.setPercentage(this.character.energy);
				setTimeout(() => {
					this.characterIsTooClose();
				}, 1500);
			}
			this.characterNotTooClose();
		});
	}

	checkKillEnemyByJump() {
		this.checkHitsChickOnTop();
		this.checkHitsChickenOnTop();
	}

	checkHitsChickOnTop() {
		this.level.smallEnemies.forEach((chick, i) => {
			if (
				this.character.isColliding(chick) &&
				this.character.aboveGround()
			) {
				this.chickDies(chick, i);
				/* this.character.jump(); */
			}
		});
	}

	checkHitsChickenOnTop() {
		this.level.biggerEnemies.forEach((chicken, i) => {
			if (
				this.character.isColliding(chicken) &&
				this.character.aboveGround()
			) {
				this.chickenDies(chicken, i);
				/* this.character.jump(); */
			}
		});
	}

	checkCollsionWithCollectableObjects() {
		this.checkCollisionsWithBottlesOnGround();
		this.checkCollisionsWithBottlesInAir();
		this.checkCollisionsWithCoins();
	}

	checkCollisionsWithBottlesOnGround() {
		this.level.bottlesOnGround.forEach((bottlesOnGround, i) => {
			if (this.bottlesStatusBar.collectedBottles == 10) return; //Pepe kann carry more than 10 bottles at the time
			if (this.character.isColliding(bottlesOnGround)) {
				this.takeBottleOnGroundFromMap(i);
				this.updateIncreaseStatusBarBottles();
			}
		});
	}

	takeBottleOnGroundFromMap(i) {
		this.level.bottlesOnGround.splice(i, 1);
	}

	checkCollisionsWithBottlesInAir() {
		if (this.bottlesStatusBar.collectedBottles == 10) return; //Pepe kann carry more than 10 bottles at the time
		this.level.bottlesInAir.forEach((objectInAir, i) => {
			if (this.character.isColliding(objectInAir)) {
				this.takeBottleInAirFromMap(i);
				this.updateIncreaseStatusBarBottles();
			}
		});
	}

	takeBottleInAirFromMap(i) {
		this.level.bottlesInAir.splice(i, 1);
	}

	updateIncreaseStatusBarBottles() {
		this.bottlesStatusBar.collectedBottles++;
		this.bottlesStatusBar.setAmountBottles(
			this.bottlesStatusBar.collectedBottles
		);
	}

	updateDecreaseStatusBarBottles() {
		this.bottlesStatusBar.collectedBottles--;
		this.bottlesStatusBar.setAmountBottles(
			this.bottlesStatusBar.collectedBottles
		);
	}

	checkCharacterAbleOfCollectingMoreBottles() {
		if (this.bottlesStatusBar.collectedBottles == 10) return;
	}

	checkCollisionsWithCoins() {
		this.level.coins.forEach((coins, i) => {
			if (this.character.isColliding(coins)) {
				console.log('coin on ground collected');
				this.level.coins.splice(i, 1);
				this.coinsStatusBar.collectedCoins++;
				this.coinsStatusBar.setAmountCoins(
					this.coinsStatusBar.collectedCoins
				);
			}
		});
	}

	checkThrowBottles() {
		let bottle = new ThrowableObjects(
			this.character.x + 60,
			this.character.y + 100
		);
		if (this.noBottlesCollected()) return;
		if (this.keyboard.D && this.headingLeft()) {
			this.throwableObject.push(bottle);
			this.updateDecreaseStatusBarBottles();
		}
	}

	headingLeft() {
		return !this.character.otherDirection;
	}

	noBottlesCollected() {
		return this.bottlesStatusBar.collectedBottles == 0;
	}

	checkBottleHitsGround() {
		this.throwableObject.forEach((bottle) => {
			if (bottle.y > 300) this.bottleSplashes(bottle);
		});
	}

	bottleSplashes(bottleObj) {
		let bottle = new SplashedBottle(bottleObj.x, bottleObj.y);
		this.throwableObject.splice(bottleObj, 1);
		this.splashedBottle.push(bottle);
		setTimeout(() => {
			this.splashedBottle.splice(bottle);
		}, 500);
	}

	/* showStatusBarOfEndBoss() {
		let statusbar = new statusBarEndboss();
		this.statusBarEndboss.push(statusbar);
	} */

	checkBottleHitsEnemy() {
		this.checkBottleHitsChick();
		this.checkBottleHitsChicken();
		this.checkBottleHitsEndboss();
	}

	checkBottleHitsChick() {
		this.throwableObject.forEach((bottle) => {
			this.level.smallEnemies.forEach((enemy, i) => {
				if (bottle.isColliding(enemy)) {
					this.chickDies(enemy, i);
					this.bottleSplashes(bottle);
				}
			});
		});
	}

	chickDies(enemyObj, position) {
		let deadChick = new ChickDies(enemyObj.x, enemyObj.y);
		this.level.smallEnemies.splice(position, 1);
		this.deadEnemies.push(deadChick);
		setTimeout(() => {
			this.deadEnemies.splice(0, 1);
		}, 2000);
	}

	// Das Funktioniert noch nicht so gut. offset überprüfen
	checkBottleHitsChicken() {
		this.throwableObject.forEach((bottle) => {
			this.level.biggerEnemies.forEach((enemy, i) => {
				if (bottle.isColliding(enemy)) {
					this.chickenDies(enemy, i);
					this.bottleSplashes(bottle);
				}
			});
		});
	}

	chickenDies(enemyObj, position) {
		let deadChicken = new ChickenDies(enemyObj.x, enemyObj.y);
		this.level.biggerEnemies.splice(position, 1);
		this.deadEnemies.push(deadChicken);
		setTimeout(() => {
			this.deadEnemies.splice(0, 1);
		}, 2000);
	}

	checkBottleHitsEndboss() {
		this.throwableObject.forEach((bottle) => {
			this.level.endBoss.forEach((enemy, i) => {
				if (bottle.isColliding(enemy)) {
					this.level.endBoss[i].injury(10);
					this.statusBarEndboss.setPercentage(
						this.level.endBoss[i].energy
					);
					this.bottleSplashes(bottle);
					this.endBossBeingAttackedByCharacter();
				}

				if (this.level.endBoss[i].energy <= 0) {
					/* this.endBossDies(0, i); */
					this.bottleSplashes(bottle);
					this.level.endBoss[i].speed = 0;
					this.endBossDies(i);
				}
			});
		});
	}

	endBossDies(position) {
		setTimeout(() => {
			this.level.endBoss.splice(position, 1);
		}, 500000);
	}

	checkCharacterGetDetectedByEndboss() {
		if (this.character.x > 3000) {
			this.endBossDetectedCharacter();
		}
	}

	endBossDetectedCharacter() {
		this.level.endBoss[0].characterDetected = true;
	}

	endBossBeingAttackedByCharacter() {
		this.level.endBoss[0].beingAttacked = true;
	}

	characterIsTooClose() {
		this.level.endBoss[0].tooClose = true;
	}

	characterNotTooClose() {
		this.level.endBoss[0].tooClose = false;
	}

	draw() {
		this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height); //Inhalt von Canvas wird gelöscht

		this.ctx.translate(this.camera_x, 0);

		this.drawNature();

		this.ctx.translate(-this.camera_x, 0); //backwards
		this.drawFixedObjects();
		this.ctx.translate(this.camera_x, 0); // forwards

		this.drawMovableObjects();
		this.ctx.translate(-this.camera_x, 0);

		// Draw() wird immer wieder aufgerufen
		let self = this;
		requestAnimationFrame(() => {
			self.draw();
		});
	}

	drawNature() {
		this.addObjectsToCanvas(this.level.backgroundObjects);
		this.addObjectsToCanvas(this.level.clouds);
	}

	drawFixedObjects() {
		if (
			this.level.endBoss[0].characterDetected ||
			this.level.endBoss[0].beingAttacked
		) {
			this.addToCanvas(this.statusBarEndboss);
			this.addToCanvas(this.overlayIconStatusBarEndboss);
		}
		this.addToCanvas(this.healthStatusBar);
		this.addToCanvas(this.bottlesStatusBar);
		this.addToCanvas(this.coinsStatusBar);
	}

	drawMovableObjects() {
		this.addObjectsToCanvas(this.level.smallEnemies);
		this.addObjectsToCanvas(this.level.biggerEnemies);
		this.addObjectsToCanvas(this.level.endBoss);
		this.addObjectsToCanvas(this.level.bottlesOnGround);
		this.addObjectsToCanvas(this.level.bottlesInAir);
		this.addObjectsToCanvas(this.level.coins);
		this.addToCanvas(this.character);
		this.addObjectsToCanvas(this.throwableObject);
		this.addObjectsToCanvas(this.splashedBottle);
		this.addObjectsToCanvas(this.deadEnemies);
	}

	addObjectsToCanvas(objects) {
		objects.forEach((object) => {
			this.addToCanvas(object);
		});
	}

	addToCanvas(movableObject) {
		if (
			movableObject.otherDirection ||
			movableObject == this.statusBarEndboss
		)
			this.flipImage(movableObject);

		movableObject.draw(this.ctx);
		/* movableObject.drawBorders(this.ctx); */

		if (
			movableObject.otherDirection ||
			movableObject == this.statusBarEndboss
		)
			this.flipImageBack(movableObject);
	}

	/**
	 * The function flips the image by translating the canvas to the width of the image, scaling the
	 * canvas by -1, and then translating the image by the width of the image.
	 * @param {movableObject} - The object that you want to flip.
	 */
	flipImage(movableObject) {
		this.ctx.save();
		this.ctx.translate(movableObject.width, 0);
		this.ctx.scale(-1, 1);
		movableObject.x = movableObject.x * -1;
	}

	flipImageBack(movableObject) {
		movableObject.x = movableObject.x * -1;
		this.ctx.restore();
	}
}
