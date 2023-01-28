'use strict';

class World extends DrawableObject {
	character = new Character();
	throwableObject = [];
	splashedBottle = [];
	deadEnemies = [];
	healthStatusBar = new HealthStatusBar();
	bottlesStatusBar = new BottlesStatusBar();
	coinsStatusBar = new CoinsStatusBar();
	statusBarEndboss = new HealthStatusBarEndBoss();
	overlayIconStatusBarEndboss = new OverlayIconEndboss();
	sounds = new Sounds();

	level = level1;
	gameEnds = false;
	canvas;
	ctx;
	keyboard;
	camera_x = -100;

	constructor(canvas, keyboard) {
		super();
		this.ctx = canvas.getContext('2d');
		this.canvas = canvas;
		this.keyboard = keyboard;
		this.drawWorld();
		this.setWorld();
		this.run();
		this.sounds.setVolume();
	}

	setWorld() {
		this.character.world = this;
	}

	/**
	 * Runs checks for collisions
	 */
	run() {
		this.playinterval = setStoppableInterval(this.checks.bind(this), 40);
	}

	checks() {
		this.checkCollsionWithEnemies();
		this.checkCollsionWithCollectableObjects();
		this.checkCharacterMakingEndbossWild();
		this.checkBottleHitsGround();
		this.checkBottleHitsEnemy();
		this.checkCharacterGetDetectedByEndboss();
		this.checksRightEndScreen();
		this.sounds.checkSetSounds();
	}

	checkCollsionWithEnemies() {
		this.checkCollisionsWithSmallEnemies();
		this.checkCollisionsWithBiggerEnemies();
		this.checkCollisionsWithEndBossEnemies();
		this.checkKillEnemyByJump();
	}

	/**
	 * Checks collision with smaller enemies
	 * and reduces energy of character and
	 * updates his healthbar
	 * @param {object} enemy
	 */
	checkCollisionsWithSmallEnemies() {
		this.level.smallEnemies.forEach((enemy) => {
			if (this.character.aboveGround()) return;
			if (this.character.isColliding(enemy)) {
				this.character.injury(0.5);
				this.healthStatusBar.setPercentage(this.character.energy);
				/* this.character.isInactive = false; */
			}
		});
	}

	/**
	 * Checks collision with bigger enemies
	 * and reduces energy of character and
	 * updates his healthbar
	 * @param {object} enemy
	 */
	checkCollisionsWithBiggerEnemies() {
		this.level.biggerEnemies.forEach((enemy) => {
			if (this.character.isColliding(enemy)) {
				this.character.injury(1);
				this.healthStatusBar.setPercentage(this.character.energy);
				/* this.character.isInactive = false; */
			}
		});
	}

	/**
	 * Checks collision with endboss
	 * and reduces energy of character and
	 * updates his healthbar
	 * @param {object} enemy
	 */
	checkCollisionsWithEndBossEnemies() {
		this.level.endBoss.forEach((enemy) => {
			if (this.character.isColliding(enemy)) {
				this.character.injury(5);
				this.healthStatusBar.setPercentage(this.character.energy);
			}
		});
	}

	checkKillEnemyByJump() {
		this.checkHitsChickOnTop();
		this.checkHitsChickenOnTop();
	}

	/**
	 * Checks if character hits chicken on top
	 * and kills it if it is the case
	 * @param {object} chick
	 * @param {number} i
	 */
	checkHitsChickOnTop() {
		this.level.smallEnemies.forEach((chick, i) => {
			if (
				this.character.isColliding(chick) &&
				this.character.aboveGround()
			) {
				this.chickDies(chick, i);
				this.character.jump();
			}
		});
	}

	/**
	 * Checks if character hits chicken on top
	 * and kills it if it is the case
	 * @param {object} chicken
	 * @param {number} i
	 */
	checkHitsChickenOnTop() {
		this.level.biggerEnemies.forEach((chicken, i) => {
			if (
				this.character.isColliding(chicken) &&
				this.character.aboveGround()
			) {
				this.chickenDies(chicken, i);
				this.character.jump();
			}
		});
	}

	checkCollsionWithCollectableObjects() {
		this.checkCollisionsWithBottlesOnGround();
		this.checkCollisionsWithBottlesInAir();
		this.checkCollisionsWithCoins();
	}

	/**
	 * Checks collsion with bottle on ground
	 * takes the bottle from map in case of collision,
	 * if character can still carry more  bottles and updates status bar
	 */
	checkCollisionsWithBottlesOnGround() {
		this.level.bottlesOnGround.forEach((bottlesOnGround, i) => {
			if (this.cannotCarryMoreBottles()) return; //Pepe kann carry more than 10 bottles at the time
			if (this.character.isColliding(bottlesOnGround)) {
				this.collectBottleProcess(i);
				this.sounds.collect_sound.play();
			}
		});
	}

	/**
	 *
	 * @returns {boolean}
	 */
	cannotCarryMoreBottles() {
		return this.bottlesStatusBar.collectedBottles == 10;
	}

	/**
	 * Takes bottle from map by splicing
	 * obect out of bottlesOnGround array
	 * @param {number} i index of array of bottles
	 */
	takeBottleOnGroundFromMap(i) {
		this.level.bottlesOnGround.splice(i, 1);
	}

	/**
	 * Checks collision with bottles in air
	 * and takes them off the map at collision
	 * @returns if character cannot carry more bottles
	 * @param {objectInAir} bottle
	 */
	checkCollisionsWithBottlesInAir() {
		if (this.cannotCarryMoreBottles()) return; //Pepe kann carry more than 10 bottles at the time
		this.level.bottlesInAir.forEach((objectInAir, i) => {
			if (this.character.isColliding(objectInAir)) {
				this.collectBottleProcess(i);
				this.sounds.collect_sound.play();
			}
		});
	}

	/**
	 * Whole process of collecting bottle
	 * to updates status bar
	 * @param {number} i index of bottle
	 */
	collectBottleProcess(i) {
		this.takeBottleInAirFromMap(i);
		this.updateIncreaseStatusBarBottles();
		this.sounds.collect_sound.play();
	}

	/**
	 * Takes bottle from map by splicing
	 * obect out of bottlesInAir array
	 * @param {number} i index of array of bottles
	 */
	takeBottleInAirFromMap(i) {
		this.level.bottlesInAir.splice(i, 1);
	}

	/**
	 * Number of collected bottles gets increased and status bar gets updated
	 */
	updateIncreaseStatusBarBottles() {
		this.bottlesStatusBar.collectedBottles++;
		this.bottlesStatusBar.setAmountBottles(
			this.bottlesStatusBar.collectedBottles
		);
	}

	/**
	 * Number of collected bottles gets reduced and status bar gets updated
	 */
	updateDecreaseStatusBarBottles() {
		this.bottlesStatusBar.collectedBottles--;
		this.bottlesStatusBar.setAmountBottles(
			this.bottlesStatusBar.collectedBottles
		);
	}

	/**
	 * If character collides with coin, coin gets taken off the map
	 * and
	 */
	checkCollisionsWithCoins() {
		this.level.coins.forEach((coins, i) => {
			if (this.character.isColliding(coins)) {
				this.takesCoinOffMap(i);
				this.updateCoinStatusBar();
				this.sounds.collect_sound.play();
			}
		});
	}

	/**
	 * Takes coin of map
	 * @param {number} i is index of coin being spliced.
	 */
	takesCoinOffMap(i) {
		this.level.coins.splice(i, 1);
	}

	/**
	 * updates status bar of coins
	 * after adding 1 to collectedCoins
	 */
	updateCoinStatusBar() {
		this.coinsStatusBar.collectedCoins++;
		this.coinsStatusBar.setAmountCoins(this.coinsStatusBar.collectedCoins);
	}

	/**
	 * Checks if number of collected bottles equals 10
	 * @returns {boolean}
	 */
	noBottlesCollected() {
		return this.bottlesStatusBar.collectedBottles == 0;
	}

	/**
	 * lets bottle splash if it hits the ground
	 * @param {object} bottle
	 */
	checkBottleHitsGround() {
		this.throwableObject.forEach((bottle) => {
			if (bottle.y > 300) {
				this.smashingBottleAnimation(bottle);
			}
		});
	}

	bottleSmashes(bottleObj) {
		let bottle = new SplashedBottle(bottleObj.x, bottleObj.y);
		this.throwableObject.splice(bottleObj, 1);
		this.splashedBottle.push(bottle);
		setTimeout(() => {
			this.splashedBottle.splice(bottle);
		}, 500);
	}

	checkBottleHitsEnemy() {
		this.checkBottleHitsChick();
		this.checkBottleHitsChicken();
		this.checkBottleHitsEndboss();
	}

	/**
	 * Shows deadChick when being hit by bottle
	 * @param {object} bottle
	 * @param {object} enemy
	 */
	checkBottleHitsChick() {
		this.throwableObject.forEach((bottle) => {
			this.level.smallEnemies.forEach((enemy, i) => {
				if (bottle.isColliding(enemy)) {
					this.chickDies(enemy, i);
					this.smashingBottleAnimation(bottle);
				}
			});
		});
	}

	/**
	 *Splices chicken and puts died chicken
	 in its place
	 * @param {object} enemy that has died
	 * @param {number} index of died enemy
	 * @param {object} deadChick gets added to map
	 */
	chickDies(enemy, position) {
		let deadChick = new ChickDies(enemy.x, enemy.y);
		this.level.smallEnemies.splice(position, 1);
		this.deadEnemies.push(deadChick);
		setTimeout(() => {
			this.deadEnemies.splice(0, 1);
		}, 2000);
	}

	/**
	 * Whenever bottle hits chicken,
	 * bottle splashes and chicken is taken out of map
	 * @param {object} bottle that hits chicken splashes
	 * @param {number} chicken of index i gets spliced
	 */
	checkBottleHitsChicken() {
		this.throwableObject.forEach((bottle) => {
			this.level.biggerEnemies.forEach((enemy, i) => {
				if (bottle.isColliding(enemy)) {
					this.chickenDies(enemy, i);
					this.smashingBottleAnimation(bottle);
				}
			});
		});
	}

	/**
	 *
	 * @param {object} dead chicken image is being added, at the position,
	 * where chicken has died.
	 * @param {number} chicken being hit by bottle gets spliced at index i
	 */
	chickenDies(enemy, i) {
		let deadChicken = new ChickenDies(enemy.x, enemy.y);
		this.level.biggerEnemies.splice(i, 1);
		this.deadEnemies.push(deadChicken);
		setTimeout(() => {
			this.deadEnemies.splice(0, 1);
		}, 2000);
	}

	/**
	 * Whenever endboss gets hit by bottle,
	 * the bottle splashes and he either gets hurt or killed
	 *@param {object} bottle being thrown
	 *@param {object} enemy is the endboss
	 *@param {number} i is index of array containing endboss
	 */
	checkBottleHitsEndboss() {
		this.throwableObject.forEach((bottle) => {
			this.level.endBoss.forEach((enemy, i) => {
				if (bottle.isColliding(enemy)) {
					this.endbossLoosesEnergy(i);
					this.updatingHealthbarOfEndboss(i);
					this.smashingBottleAnimation(bottle);
					this.setsEndBossBeingAttackedByCharacter();
				}
				if (this.level.endBoss[i].isDead()) {
					this.stopEndboss(i);
				}
			});
		});
	}

	/**
	 * Endboss looses energy
	 * 10 is substracted from its current energy level
	 */
	endbossLoosesEnergy(i) {
		this.level.endBoss[i].injury(20);
	}

	/**
	 * Updates the healthbar of endboss
	 */

	updatingHealthbarOfEndboss(i) {
		this.statusBarEndboss.setPercentage(this.level.endBoss[i].energy);
	}

	smashingBottleAnimation(bottle) {
		this.bottleSmashes(bottle);
		this.sounds.smashing_bottle_sound.play();
	}

	/**
	 * Stops endboss moving forward
	 */
	stopEndboss(i) {
		this.level.endBoss[i].speed = 0;
	}

	/**
	 * Sets dectectedCharacter variable to true,
	 * if the character is getting on its radar
	 */
	checkCharacterGetDetectedByEndboss() {
		if (this.character.x > 3000) {
			this.endBossDetectedCharacter();
		}
	}

	/**
	 * Sets the variable characterDetected = true
	 */
	endBossDetectedCharacter() {
		this.level.endBoss[0].characterDetected = true;
	}

	/**
	 * Sets the variable beingAttackt = true
	 */
	setsEndBossBeingAttackedByCharacter() {
		this.level.endBoss[0].beingAttacked = true;
	}

	/**
	 * Sets tooClose value to false or true
	 * according to the distance between endboss and character
	 */
	checkCharacterMakingEndbossWild() {
		this.notEnoughDistance() && this.character.isAlive()
			? this.setCharacterTooClose()
			: this.setCharacterNotTooClose();
	}

	/**
	 * @returns a boolean depending on
	 * the distance between endboss and character
	 */
	notEnoughDistance() {
		return this.level.endBoss[0].x - this.character.x < 50;
	}

	/**
	 * Sets the tooClose to false
	 */
	setCharacterNotTooClose() {
		this.level.endBoss[0].tooClose = false;
	}

	setCharacterTooClose() {
		this.level.endBoss[0].tooClose = true;
	}

	/* =================
		SCREEN BEHAVIOR
	================= */

	/**
	 * Checks how the level ends
	 * and show the right screen accordingly: Game Over or You Lose
	 */
	checksRightEndScreen() {
		if (this.level.endBoss[0].isDead()) this.showEndScreen('endScreen');
		if (this.level.endBoss[0].isDead()) return;
		if (this.character.isDead()) this.showEndScreen('loosesEndScreen');
	}

	/**
	 *
	 * @param {number} is id of divs that contains endscreen image
	 */
	showEndScreen(screenId) {
		setTimeout(() => {
			document.getElementById(screenId).classList.remove('d-none');
			this.gameEnds = true;
			this.stopAllIntervals();
			this.backToStartScreen();
		}, 2000);
	}

	/**
	 * Reloads the page
	 * so that you are back on start screen
	 */
	backToStartScreen() {
		setTimeout(() => {
			if (this.gameEnds) {
				window.location.reload();
			}
		}, 3000);
	}

	/**
	 * Stops every setInterval in the game
	 */
	stopAllIntervals() {
		setTimeout(() => {
			intervallIds.forEach((id) => {
				clearInterval(id);
			});
		}, 3000);
	}
}
