//Variables
var currentScore = 0;
var scoreTick = 1;
var scoreText;
var gameDelay = 3000;
var goldText;

var fireballs;
var fireDelay = 400;
var lastFireballFired = gameDelay - fireDelay;
var fireballSpeed = 250;

var yoshiSpeed = 250;
var enemies;

var spawnDelay = 3000;
var lastWaveSpawned = gameDelay * 1.2 - spawnDelay;

var wave1 = 0;
var wave2 = 0;
var wave3 = 0;
var wave4 = 0;
var wave1Max = 5;
var wave2Max = 5;
var wave3Max = 5;
var wave4Max = 5;


MyGame.playGameState = function (game) {};

MyGame.playGameState.prototype = {

  create: function()
  {
      game.physics.startSystem(Phaser.Physics.ARCADE);
      //Reset Variables on New Game
      game.time.now = 0;
      currentScore = 0;

      wave1 = 0;
      wave2 = 0;
      wave3 = 0;
      wave4 = 0;


      //Backgrounds
      this.hidden = this.add.tileSprite(0, 0, 600, 800, 'sky-boss');
      this.background = game.add.tileSprite(0, 0, 600, 800, 'sky');
      this.skyboss = this.add.tileSprite(0, 0, 600, 800, 'sky-boss');
      this.skyboss.alpha = 0;
      this.add.tween(this.skyboss).to( { alpha: 1 }, 1000, Phaser.Easing.Linear.None, true,  9000, 1000, true);
      //Music


      //Backgrounds
      this.hidden = this.add.tileSprite(0, 0, 600, 800, 'sky-boss');
      this.background = game.add.tileSprite(0, 0, 600, 800, 'sky');
      this.skyboss = this.add.tileSprite(0, 0, 600, 800, 'sky-boss');
      this.skyboss.alpha = 0;
      this.add.tween(this.skyboss).to( { alpha: 1 }, 1000, Phaser.Easing.Linear.None, true,  9000, 1000, true);


      this.goomba = this.add.sprite(100, 50, 'goomba');
      this.goomba.animations.add('goomba-fly', [0,1,2,1,0]);

      //Player
      this.generatePlayer(game.world.centerX, game.world.centerY +100);

      //Score
      scoreText = game.add.text( 4, game.height - 32, 'score: 0',{font: 'Pixel' ,fontSize: '28px', fill: '#fff'});
      goldText = game.add.text( 4, game.height - 64, 'gold: 0',{font: 'Pixel' ,fontSize: '28px', fill: '#fff'});

      //Fireballs
      fireballs = game.add.group();
      fireballs.enableBody = true;

      //Enemies
      enemies = game.add.group();
      enemies.enableBody = true;

      //PickUps
      blocks = game.add.group();
      blocks.enableBody = true;
      coins = game.add.group();
      coins.enableBody = true;

      //Fireball
      //      this.fireballbig = this.add.sprite(this.yoshi.position.x, this.yoshi.position.y +100, 'fireball-big');
      //      this.fireballbig.animations.add('woosh', [0,1]);
      //      this.fireballbigger = this.add.sprite(this.yoshi.position.x, this.yoshi.position.y +200, 'fireball-bigger');
      //      this.fireballbigger.animations.add('woosh2', [0,1]);

      // scoreTimer
      game.time.events.loop(Phaser.Timer.SECOND / 1000 , this.addScore);
  },

  addScore: function () {
    currentScore += scoreTick;
  },

  update: function()
  {
    //Move Background
    this.background.tilePosition.y += 2;
    this.skyboss.tilePosition.y += 2;
    this.hidden.tilePosition.y += 2;

    //Score
    scoreText.text = 'score: ' + currentScore;
    goldText.text = 'gold: ' + currentGold;

    //Fire
    this.fireSequence();


    this.goomba.animations.play('goomba-fly', 7, true, false);
    game.physics.arcade.overlap(fireballs, enemies, this.destroyEnemy, null, this);
    game.physics.arcade.overlap(this.yoshi, enemies, this.gameOverScreen, null, this);
    game.physics.arcade.overlap(this.yoshi, coins, this.getCoin, null, this);
    game.physics.arcade.overlap(this.yoshi, blocks, this.getBlock, null, this);

      




    if (Phaser.Rectangle.contains(this.yoshi.body, game.input.x, game.input.y))
      {
          this.yoshi.body.velocity.setTo(0, 0);
      }
    else{
      game.physics.arcade.moveToPointer(this.yoshi, yoshiSpeed);
    }



     if(game.time.now > 21000)
     {
         this.background.alpha = 0;
     }

     //Waves
     this.waveManager();
  },

  generatePlayer: function(x, y) {
    this.yoshi = this.add.sprite(game.world.centerX, game.world.centerY + 100, 'yoshi');
    this.yoshi.animations.add('ani', [0,1,2,3]);
    this.yoshi.anchor.setTo(0.5, 0.5);
    game.physics.enable(this.yoshi, Phaser.Physics.ARCADE);
    this.yoshi.animations.play('ani', 6, true, false);
    },

  fireSequence: function(){
    if(game.time.now > (lastFireballFired + fireDelay))
      {
          this.generateFireball();
      }
  },

generateFireball: function() {
    var fireball = fireballs.create(this.yoshi.position.x-10, this.yoshi.position.y-30, 'fireball-mini');

    fireball.animations.add('spin', [0,1,2,3]);
    fireball.animations.play('spin', 8, true, false);
    game.physics.enable(fireball, Phaser.Physics.ARCADE);
    fireball.events.onOutOfBounds.add( function(){ fireball.kill(); } );
    fireball.checkWorldBounds = true;
    fireball.body.velocity.y = - fireballSpeed;
    lastFireballFired = game.time.now;

  },

generateEnemy: function(posX, posY, velX, velY, enemyName)
{
    var enemy = enemies.create(posX, posY, enemyName); //position, sprite

    enemy.animations.add(enemyName + '-ani', [0,1,2,3,4,5,6,7,8,9]); //Animation frames still hardcoded
    enemy.animations.play(enemyName + '-ani', 10, true, false);
    game.physics.enable(enemy, Phaser.Physics.ARCADE);
    enemy.anchor.setTo(0.5, 0.5);
    enemy.events.onOutOfBounds.add( function(){ enemy.kill(); } );
    enemy.body.velocity.y = velY;
    enemy.body.velocity.x =  velX;
  },

  generateExplosion: function(x, y) {
    this.explosion = this.add.sprite(x, y, 'explosion');
    this.explosion.animations.add('explosion-boom', [0,1,2,3,4,5,6,7,8]);
    this.explosion.animations.play('explosion-boom', 9, false, true);
    this.explosion.anchor.setTo(0.5, 0.5);

    },
    //PICKUP FUNCTION RANDOMIZE
    generatePickUp: function(x,y){
        var random =  game.rnd.integerInRange(0,100);
        if(random < 5){
            var block = blocks.create(x,y,'questionblock');
            block.animations.add('block-spin', [0,1,2,3]);
            block.animations.play('block-spin', 5, true, false);
            game.physics.enable(block, Phaser.Physics.ARCADE);
            block.body.velocity.y = 100;
        }
        else{
            var coin = coins.create(x,y,'coin');
            coin.animations.add('coin-spin', [0,1,2,3]);
            coin.animations.play('coin-spin', 5, true, false);
            game.physics.enable(coin, Phaser.Physics.ARCADE);
            coin.body.velocity.y = 100;
        }
        

        


    },

  destroyEnemy: function(fireball, enemy) { //fireballs, koopa
      currentScore += 1000;
      fireball.kill();
      enemy.kill();
      this.generateExplosion(enemy.centerX, enemy.centerY);
      this.generatePickUp(enemy.centerX, enemy.centerY);
    },
    getCoin: function(yoshi, coin) {
      coin.kill();
      currentGold += 10;
    },
    getBlock: function(yoshi, block) {
      block.kill();
      var random =  game.rnd.integerInRange(0,2);
        if(random==0){
            fireDelay -= 50;
            console.log('less fire delay');
            
        }
        if(random==1){
            fireballSpeed += 25;
            console.log('faster BALLS');

        }
        if(random==2){
            yoshiSpeed += 50;
            console.log('more speed');

        }
    },


//WAVEMANAGER
  waveManager: function()
  {
  //Amount of Enemies spawned, Spacing between Enemies spawned, startXposition, startYposition, velX, velY, enemyName

  // console.log(wave2);

  //Wave 1
    if(game.time.now > (lastWaveSpawned + spawnDelay) && wave1 < wave1Max)
      {
        var amount = Math.floor(Math.random() * 5 + 1);
        this.spawnWave(amount, 50, 50, 30, 30, 150, 'koopa');
        amount = Math.floor(Math.random() * 5 + 1);
        this.spawnWave(amount, 50, 300, 30, -50, 200, 'koopa');

        wave1++;
      }
  //Wave 2
  if(wave1 == wave1Max && game.time.now > (lastWaveSpawned + spawnDelay) && wave2 < wave2Max)
    {
      var amount = Math.floor(Math.random() * 5 + 1);
      var startX = Math.floor(Math.random() * 250 + 0);
      var velY = Math.floor(Math.random() * 200 + 100);

      this.spawnWave(amount, 50, startX, 30, 30, velY, 'koopa');

      amount = Math.floor(Math.random() * 5 + 1);
      startX = Math.floor(Math.random() * 150 + 150);
      velY = Math.floor(Math.random() * 200 + 150);

      this.spawnWave(amount, 50, startX, 30, -50, velY, 'koopa');

      wave2++;
    }
  },

  spawnWave: function(amount, spacing, startX, startY, velX, velY, enemyName){
    for (var i = 0; i < (amount * spacing) ; i += spacing) {
      this.generateEnemy(startX + i, startY, velX, velY, enemyName); //posX, posY, velX, velY, enemyName
    }
    lastWaveSpawned = game.time.now;
  },



  gameOverScreen: function(){
    this.state.start('gameOver', true, false, currentScore);
  }


}
