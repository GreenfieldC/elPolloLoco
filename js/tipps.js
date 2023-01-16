function checkKillByJump() {
	this.level.enemies.forEach((enemy, i) => {
		if (this.character.isColliding(enemy) && this.character.isAboveGround())
			this.enemyIsDead(enemy, i);
	});
}
