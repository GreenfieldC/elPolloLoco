checkThrowableObjects();
const throwable = this.keyboard.F && !this.character.otherDirection ? this.canBeLaunched() : false;
if (throwable) {
	const bottle = new ThrowableObject(this.characterPos() + 100, this.character.y + 100);
	if ((this.canThrow() && this.character.health > 0) || this.statusBarBottle.collectedBottle.length <= 0) {
		this.throwableObjects.push(bottle);
		this.lastThrow = performance.now();
		this.statusBarBottle.collectedBottle--;
		this.sounds.throw_bottle_sound.play();
	}
}
