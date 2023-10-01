class Level {

    enemies;
    deadChicken;
    clouds;
    backgroundObjects;
    coin;
    bottle;
  
 
    level_end_x = 3300;
    endgame_x = 0;

    constructor (enemies, deadChicken, clouds, backgroundObjects, coin, bottle) {

        this.enemies = enemies;
        this.deadChicken = deadChicken;
        this.clouds = clouds;
        this.backgroundObjects = backgroundObjects;
        this.coin = coin;
        this.bottle = bottle;
    }

}