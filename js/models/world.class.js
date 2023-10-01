class World {

    character = new Character(140);
    chicken = new Chicken();
    level = level1;
    canvas;
    ctx;
    keyboard;
    camera_x = 0;
    statusBar = new StatusBarEnergy();
    statusBarEndboss = new StatusBarEnergyEndBoss();
    statusBarCoins = new StatusBarCoins();
    statusBarBottles = new StatusBarBottles();
    deadChicken = new DeadChicken();
    ThrowableObject = [];
    coin = [];
    collectedBottles = [];
    collectedCoins = [];
    coinX = 200;
    lastThrow = new Date().getTime();
    chickenCry = new Audio('audio/chicken.mp3');
    characterHurt = new Audio('audio/hurt.mp3')
    coin_sound = new Audio('audio/coin.mp3')
    background_music = new Audio('audio/background_music.mp3')
    enemiesInterval;
    runInterval;
    won;
    background_music_interval;
    muteClicked;
    gameBreak;




    constructor(canvas, keyboard) {

        this.ctx = canvas.getContext('2d');
        this.keyboard = keyboard;
        this.canvas = canvas;
        this.draw();
        this.setWorld();
        this.run();
        this.playBackgroundMusic();

    }


    handlePortrait(mediaQuery) {
        if (mediaQuery.matches) {
            this.character.pauseCharacter();
            this.pauseEnemies();
            this.gamePaused();
        }
    }
    portraitQuery = window.matchMedia("(orientation: portrait)");

    /**
     * sets screen on pause
     */

    gamePaused() {
        document.getElementById('pause').classList.add('d-none');
        document.getElementById('goAhead').classList.remove('d-none');
        document.getElementById('description').classList.remove('d-none');
        this.muteAll();
        this.background_music.volume = 0;
        this.gameBreak = true;

    }

    muteBackgroundMusic() {
        this.background_music.volume = 0;
        this.muteClicked = true;
    }


    muteAll() {
        /**
         * mute all sounds - used when pressing pause button
         */
        this.chickenCry.volume = 0;
        this.character.walking_sound.volume = 0;
        this.characterHurt.volume = 0;
        this.coin_sound.volume = 0;
    };

    /**
     * interval for the background music
     */

    playBackgroundMusic() {
        this.background_music_interval = setInterval(() => {
            this.background_music.play();

            if (this.muteClicked) {
                this.background_music.volume = 0;
            }
            else if (!this.muteClicked && !this.gameBreak) {
                this.background_music.volume = 0.5;
            }

        }, 0);

    }

    /**
     * moveable Objects sounds
     */

    soundOn() {
        this.chickenCry.volume = 1;
        this.character.walking_sound.volume = 1;
        this.characterHurt.volume = 1;
        this.coin_sound.volume = 1;
        this.mute = false;
    }

    /**
     * executes different functions ones as an interval
     */

    run() {
        this.runInterval = setInterval(() => {
            this.collisionCheckEnemChar();
            this.checkThrowableObjects();
            this.showLooser();
            this.collisionCheckEnemChar();
            this.collisionCheckBottleChar();
            this.collisionCheckBottleEnem();
            this.collisionCheckCoin();
            this.handlePortrait(this.portraitQuery);
        }, 20);
    }

    /**
     * checks if the user won and sets the "winnder screen"
     */
    showLooser() {
        if (this.character.checkForDeath() && !this.won) {
            this.character.pauseCharacter();
            this.setScreenOnLoose();
        }

    }

    /**
     * 
     * @param {object} enemy - chicken can be killed by a bottle
     * @param {object} flyingBottle 
     * 
     * the variables enemy and flyingBottle comes from the function "collisionCheckBottleEnem()"
     */
    chickenDeadByBottle(enemy, flyingBottle) {
        enemy.energy = 0;
        this.level.deadChicken.push(new DeadChicken(enemy.x, enemy.y))      // for every chicked that has been killed, there will be created a new dead chicken
        this.level.enemies.splice(this.level.enemies.indexOf(enemy), 1);    // for every chicken killed, this exact enemy will be spliced out of the enemy array
        let indeXOF = this.ThrowableObject.indexOf(flyingBottle);           // every thrown bottle will be spliced after it was thrown
        this.ThrowableObject[indeXOF].hit = true;
    }


    /**
     * 
     * @param {object} enemy 
     * @param {object} flyingBottle 
     * 
     * function for killing baby chicken thorwing a bottle
     */
    babyChickenDeadByBottle(enemy, flyingBottle) {
        enemy.energy = 0;
        enemy.img.src = enemy.IMAGE_DEAD;
        let indeXOF = this.ThrowableObject.indexOf(flyingBottle);
        this.ThrowableObject[indeXOF].hit = true;
    }


    /**
     * 
     * @param {object} enemy 
     * 
     * function for killing a chicken jumping on it
     */
    chickenDeadByJump(enemy) {
        enemy.energy = 0;
        this.level.deadChicken.push(new DeadChicken(enemy.x, enemy.y))
        this.level.enemies.splice(this.level.enemies.indexOf(enemy), 1);
    }

    /**
     * 
     * @param {object} enemy 
     * 
     * funtion for killing a baby cikcen jumping on it
     */
    babyChickenDeadByJump(enemy) {
        enemy.energy = 0;
        enemy.img.src = enemy.IMAGE_DEAD;
    }


    /**
     * condition for new throw - break for one throw to the next
     */
    checkThrowableObjects() {
        if (this.keyboard.D && this.collectedBottles.length > 0 && this.lastThrow <= new Date().getTime()) {
            this.setBottleThrow();

        }
    }

    setStatusBarEndboss() {
        this.statusBarEndboss.y = 90;
    }

    /**
     * sets what happens when the charachter has been hitten
     */
    setCharOnCollision() {
        this.character.hit();
        this.statusBar.setPercentage(this.character.energy);
        this.characterHurt.play();
    }

    /**
     * sets what happens when the character jumps on a chicken
     */
    killChickenByJump(enemy) {
        this.character.jump();
        this.chickenDeadByJump(enemy);
        this.chickenCry.play();
    }

    /**
     * sets what happens when the charachter jumps on a baby chicken
     */
    killBabyChickenByJump(enemy) {
        this.character.jump();
        this.babyChickenDeadByJump(enemy);
        this.chickenCry.play();
    }

    /**
     * checks if the Character is colliding with an enemy and execute the function to change the state of the object
     */
    collisionCheckEnemChar() {
        this.level.enemies.forEach((enemy) => {

            if (this.conditionForCharCollision(enemy)) {
                this.setCharOnCollision();

            } else if (this.conditionForJumpKill(enemy)) {
                this.killChickenByJump(enemy);

            } else if (this.conditionForJumpKillonBchick(enemy)) {
                this.killBabyChickenByJump(enemy);

            } else if (this.conditionForEndbossRun(enemy)) {
                this.enbossRun(enemy)

            } else if (this.conditionForWin(enemy)) {
                this.setScreenOnWin()
            }

        });
    }


    /**
     * checks for each bottle in the bottle array if it is colliding with the character and adds the collected bottle to the bottle basket of the character
     */
    collisionCheckBottleChar() {
        this.level.bottle.forEach((bottle) => {
            if (this.character.isColliding(bottle)) {
                this.setBottleCollection(bottle);
            }
        });
    }

    /**
     * restarts the background-music after pause
     */
    playBackgroundAfterPause() {
        this.muteClicked = false;
        this.playBackgroundMusic();

    }

    /**
     * restars the game pressing play button on pause
     */
    goAhead() {
        this.level.enemies.forEach(enemy => {
            enemy.restart();
        }
        );
        this.character.restart();
        this.run();
        this.playBackgroundMusic();
        this.gameBreak = false;
    }

    /**
     * stops all enemy intervals when the pause butten is clicked
     */
    pauseEnemies() {
        clearInterval(this.runInterval)
        this.level.enemies.forEach(enemy => {

            if (enemy instanceof Chicken || enemy instanceof BabyChicken) {
                enemy.pause();

            } else if (enemy instanceof Endboss) {
                enemy.pauseEndboss();
            }
        });
    }

    /**
     * checks if an enemy was hitten by a bottle
     */
    collisionCheckBottleEnem() {
        this.level.enemies.forEach(enemy => {

            this.ThrowableObject.forEach(flyingBottle => {

                if (this.chickenHitByBottle(enemy, flyingBottle)) {
                    this.chickenDeadByBottle(enemy, flyingBottle)
                    this.chickenCry.play();
                }

                else if (this.babyChickenHitByBottle(enemy, flyingBottle)) {
                    this.babyChickenDeadByBottle(enemy, flyingBottle);
                    this.chickenCry.play();

                } else if (this.endbossHitByBottle(enemy, flyingBottle)) {
                    this.setEndbossAfterHit(enemy, flyingBottle);
                }

            });
        });

    }

    /**
     * checks if the character is colliding with a coin
     */
    collisionCheckCoin() {
        this.level.coin.forEach((coin) => {
            if (this.character.isColliding(coin)) {
                this.setCoinCollection(coin);
            }
        });
    }


    setWorld() {
        this.character.world = this;
    }

    /**
     * draws the objects to the canvas
     *  */
    draw() {
        this.ctx.clearRect(0, 0, this, canvas.width, this.canvas.height);
        this.ctx.translate(this.camera_x, 0);
        this.addObjectsToMap(this.level.backgroundObjects);
        this.addObjects();
        this.ctx.translate(-this.camera_x, 0);
        this.addStaticObjects();
        this.ctx.translate(this.camera_x, 0);
        this.addToMap(this.character);
        this.ctx.translate(-this.camera_x, 0);
        let self = this;
        requestAnimationFrame(function () {
            self.draw();
        });
    }

    /**
     * 
     * @param {object} objects
     * executes a forEach loop that passes the objects into the variable "o" from the addToMap function
     * the addToMap function draws the object to the canvas
     */


    addObjectsToMap(objects) {
        objects.forEach(o => {
            this.addToMap(o);
        });
    }


    /**
     * 
     * @param {object} mo - mo stands for movable object
     * in this function the movable object is drawn to the map and it's direction gets defiened
     */
    addToMap(mo) {
        if (mo.otherDirection) {
            this.flipImage(mo);
        }

        mo.draw(this.ctx);

        if (mo.otherDirection) {
            this.flipImageBack(mo);
        }
    }

    /**
     * 
     * @param {object} mo 
     * draws the object back to the right
     */
    flipImageBack(mo) {
        mo.x = mo.x * -1;
        this.ctx.restore();
    }

    /**
     * 
     * @param {object} mo
     * drwas the object to the left 
     */
    flipImage(mo) {
        this.ctx.save();
        this.ctx.translate(mo.width, 0);
        this.ctx.scale(-1, 1);
        mo.x = mo.x * -1;
    }

    /**
     * adds all movable objects to the map
     */
    addObjects() {
        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.ThrowableObject)
        this.addObjectsToMap(this.level.coin);
        this.addObjectsToMap(this.level.deadChicken);
        this.addObjectsToMap(this.level.bottle);
        this.addObjectsToMap(this.level.clouds);
    };

    /**
     * adds all static objects to the map
     */
    addStaticObjects() {
        this.addToMap(this.statusBar);
        this.addToMap(this.statusBarCoins);
        this.addToMap(this.statusBarBottles);
        this.addToMap(this.statusBarEndboss);
    };

    /**
     * 
     * @param {object} bottle 
     * adds a bottle the collectedBottles array when the character collides with a bottle
     * splices a bottle of the collectedBottles array when the character has thrown a bottle
     * execute the setPercentage function to set the bottles status bar
     */
    setBottleCollection(bottle) {
        this.collectedBottles.push(bottle)
        this.level.bottle.splice(this.level.bottle.indexOf(bottle), 1)
        this.statusBarBottles.setPercentage(this.collectedBottles.length);
    }

    /**
     * 
     * @param {object} coin 
     * adds a coin the collectedBottles array when the character collides with a bottle
     * splices a coin of the collectedBottles array when the character has thrown a bottle
     * execute the setPercentage function to set the coin status bar
     */
    setCoinCollection(coin) {
        this.collectedCoins.push(coin)
        this.level.coin.splice(this.level.coin.indexOf(coin), 1)
        this.statusBarCoins.setPercentage(this.collectedCoins.length);
        this.coin_sound.play();

    }

    conditionForCharCollision(enemy) {
        return this.character.isColliding(enemy) && enemy.energy != 0 && !this.character.aboveGround();
    }

    conditionForJumpKill(enemy) {
        return enemy instanceof Chicken && this.character.isColliding(enemy) && this.character.y + this.character.height <= enemy.y + 200 && !enemy.checkForDeath() && this.character.speedY < 0;
    }

    conditionForJumpKillonBchick(enemy) {
        return enemy instanceof BabyChicken && this.character.isColliding(enemy) && this.character.y + this.character.height <= enemy.y + 1000 && !enemy.checkForDeath() && this.character.speedY < 0;
    }

    enbossRun(enemy) {
        this.setStatusBarEndboss();
        enemy.endBossRun = true;

    }

    /**
     * 
     * @param {object} enemy 
     * enables the endBoss to run if the character is in a certain position
     */
    conditionForEndbossRun(enemy) {
        return enemy instanceof Endboss && this.character.x > 3000 && !enemy.checkForDeath()
    }

    chickenHitByBottle(enemy, flyingBottle) {
        return enemy instanceof Chicken && flyingBottle.isColliding(enemy) && enemy.energy
    }

    babyChickenHitByBottle(enemy, flyingBottle) {

        return enemy instanceof BabyChicken && flyingBottle.isColliding(enemy)

    }
    /**
     * 
     * @param {object} enemy 
     * @param {object} flyingBottle 
     * subtract 0.5 energy points after endboss was hitten
     * plays animation with hurt images
     * sets the endbos energy bar
     * lets the endboss cry
     */
    setEndbossAfterHit(enemy, flyingBottle) {
        let indeXOF = this.ThrowableObject.indexOf(flyingBottle)
        this.ThrowableObject[indeXOF].hit = true; // The indexOf method is used to find the index of a specified value- within the array or string. If the value is found, it returns the index; otherwise, it returns -1.
        enemy.energy -= 0.5;
        enemy.playAnimation(enemy.imagesHurt);
        this.statusBarEndboss.setPercentage(enemy.energy);
        this.chickenCry.play();
    }

/**
 * 
 * @param {object} enemy 
 * @param {object} flyingBottle 
 * proves if the endboss was hitten by a bottle
 */    endbossHitByBottle(enemy, flyingBottle) {
        return enemy instanceof Endboss && flyingBottle.isColliding(enemy)
    }

    /**
     * 
     * @param {object} enemy 
     * proves if the character won
     */
    conditionForWin(enemy) {
        return enemy instanceof Endboss && enemy.checkForDeath();
    }

    setBottleThrow() {
        this.lastThrow = new Date().getTime() + 800;
        this.character.idleCounter = 0;
        let bottle = new ThrowableObject(this.character.x + 105, this.character.y + 130, this.character.otherDirection);
        this.ThrowableObject.push(bottle);
        this.collectedBottles.splice(0, 1);
        this.statusBarBottles.setPercentage(this.collectedBottles.length);

    }

    /**
     *  sets the screen when the player lost
     */
    setScreenOnLoose() {
        document.getElementById('audio').classList.add('d-none');
        document.getElementById('max').classList.add('d-none');
        document.getElementById('pause').classList.add('d-none');
        document.getElementById('reload').classList.remove('d-none');
        this.character.pauseCharacter();
        this.statusBarEndboss.y = -1000
        document.getElementById('looser').classList.remove('d-none')
        document.getElementById('canvas').style.zIndex = -1;
        document.getElementById('max').classList.add('d-none');
    }

    /**
     * sets the screen when the player won
     */
    setScreenOnWin() {
        document.getElementById('audio').classList.add('d-none');
        document.getElementById('max').classList.add('d-none');
        document.getElementById('pause').classList.add('d-none');
        document.getElementById('reload').classList.remove('d-none');
        this.character.pauseCharacter();
        this.statusBarEndboss.y = -1000
        document.getElementById('gameOver').classList.remove('d-none')
        document.getElementById('canvas').style.zIndex = -1;
        this.won = true;
        this.character.won = true;
    }

}

