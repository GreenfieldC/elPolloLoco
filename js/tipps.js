World.class.js
bottleIsSplashed(bottlePos) {
    let bottle = new SplashedBottle(bottlePos.x, bottlePos.y);
    this.sounds.bottle_break_sound.play();
    this.throwableObjects.splice(bottlePos, 1);
    this.launchedBottle.push(bottle);
    setTimeout(() => {
      this.launchedBottle.splice(bottle);
    }, 500);
  }


    
  /**
   * Bottle splashes when it hits the ground.
   * @param {ThrowableObject} bottle - the bottle object.
   */
  bottleGroundCollision() {
    this.throwableObjects.forEach((bottle) => {
        if (bottle.y >= 260) 
        this.bottleIsSplashed(bottle);
    });
  }


    /**
   * Bottle splashes when it hits the ground.
   * @param {ThrowableObject} bottle - the bottle object.
   */
    bottleGroundCollision() {
        this.throwableObjects.forEach((bottle) => {
            if (bottle.y >= 260) 
            this.bottleIsSplashed(bottle);
        });
      }


      bottleEnemyCollision() {
        this.throwableObjects.forEach((bottle) => {
          this.level.enemies.forEach((enemy, i) => {
            if (bottle.isColliding(enemy)) {
              this.enemyIsDead(enemy, i);
              this.bottleIsSplashed(bottle);
            }
          });
        });
      }

      enemyIsDead(enemy, i) {
        let deadEnemy = new DeadChicken(enemy.x, enemy.y);
        this.sounds.chicken_hurt_sound.play();
        this.deadEnemies.push(deadEnemy);
        this.level.enemies.splice(i, 1);
        setTimeout(() => {
          this.deadEnemies.splice(deadEnemy);
        }, 3000);
      }

      bottleIsSplashed(bottlePos) {
        let bottle = new SplashedBottle(bottlePos.x, bottlePos.y);
        this.sounds.bottle_break_sound.play();
        this.throwableObjects.splice(bottlePos, 1);
        this.launchedBottle.push(bottle);
        setTimeout(() => {
          this.launchedBottle.splice(bottle);
        }, 500);
      }