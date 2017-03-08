//Variables
var currentScore = 0;
var scoreTick = 1;
var scoreText;
var gameDelay = 4000;
var goldText;
var currentGold = 0;

var fireballs;
var fireDelay = 400;
var fireDelayMin = 100;
var lastFireballFired = gameDelay - fireDelay;
var fireballSpeed = 250;
var pickUpNr;
var pickUpTextFD;
var pickUpTextFS;
var pickUpTextYS;
var pickUpTextTime;

var yoshiSpeed = 250;
var enemies;

var spawnDelay = 3000;
var lastWaveSpawned = gameDelay * 1.2 - spawnDelay;
var velMultiplier = 0;

var wave1;
var wave2;
var wave3;
var wave4;

var wave1Max = 5;
var wave2Max = 5;
var wave3Max = 5;
var wave4Max = 5;
var stage;
var minAmount = 1;
var velMultiplier;



MyGame.playGameState = function (game) {};

MyGame.playGameState.prototype = {

  create: function()
  {
      game.physics.startSystem(Phaser.Physics.ARCADE);
      //Reset Variables on New Game
      game.time.now = 0;
      currentScore = 0;
      currentGold = 0;
      fireDelay = 400;
      fireballSpeed = 250;
      yoshiSpeed = 250;

      wave1 = 0;
      wave2 = 0;
      wave3 = 0;
      wave4 = 0;
      stage = 1;
      minAmount = 1;
      velMultiplier = 0;
      spawnDelay = 3000;




      //Backgrounds
      // this.hidden = this.add.tileSprite(0, 0, 600, 800, 'sky-boss');
      this.background = game.add.tileSprite(0, 0, 600, 800, 'sky');
      this.background.tilePosition.y = backgroundPos;
      // this.skyboss = this.add.tileSprite(0, 0, 600, 800, 'sky-boss');
      // this.skyboss.alpha = 0;
      // this.add.tween(this.skyboss).to( { alpha: 1 }, 1000, Phaser.Easing.Linear.None, true,  9000, 1000, true);


//      this.goomba = this.add.sprite(100, 50, 'goomba');
//      this.goomba.animations.add('goomba-fly', [0,1,2,1,0]);

      //Player
      this.generatePlayer(yoshiPosX, yoshiPosY);

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

      //SFX
      coinSound = game.add.audio('coinSound');
      blockSound = game.add.audio('blockSound');

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
    // this.skyboss.tilePosition.y += 2;
    // this.hidden.tilePosition.y += 2;

    //Score
    scoreText.text = 'score: ' + currentScore;
    goldText.text = 'gold: ' + currentGold;

    //Fire
    this.fireSequence();


  //    this.goomba.animations.play('goomba-fly', 7, true, false);
      game.physics.arcade.overlap(fireballs, enemies, this.destroyEnemy, null, this);
      game.physics.arcade.overlap(this.yoshi, enemies, this.gameOverScreen, null, this);
      game.physics.arcade.overlap(this.yoshi, coins, this.getCoin, null, this);
      game.physics.arcade.overlap(this.yoshi, blocks, this.getBlock, null, this);



  // if(game.time.now > 21000)
  //     {
  //         this.background.alpha = 0;
  //     }

    if (Phaser.Rectangle.contains(this.yoshi.body, game.input.x, game.input.y))
      {
          this.yoshi.body.velocity.setTo(0, 0);
      }
    else{
      game.physics.arcade.moveToPointer(this.yoshi, yoshiSpeed);
    }

     //Waves
     this.waveManager();

     //PickUpText
     pickUpTextFD = game.add.text(game.world.centerX, game.world.centerY, 'FIRE DELAY DOWN', {font: 'Pixel', fontSize: '28px', fill: '#fff'});
     pickUpTextFD.anchor.set(0.5);
     pickUpTextFD.visible = false;
     pickUpTextFS = game.add.text(game.world.centerX, game.world.centerY, 'FIRE SPEED UP', {font: 'Pixel', fontSize: '28px', fill: '#fff'});
     pickUpTextFS.anchor.set(0.5);
     pickUpTextFS.visible = false;
     pickUpTextYS = game.add.text(game.world.centerX, game.world.centerY, 'YOSHI SPEED UP', {font: 'Pixel', fontSize: '28px', fill: '#fff'});
     pickUpTextYS.anchor.set(0.5);
     pickUpTextYS.visible = false;
     this.pickUpNotification();
     if(pickUpTextTime + 2000 > game.time.now ){
    		pickUpTextFD.visible = false;
    		pickUpTextFS.visible = false;
    		pickUpTextYS.visible = false;
    	}
  },

  generatePlayer: function(x, y) {
    this.yoshi = this.add.sprite(x, y, 'yoshi');
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

generateEnemy: function(posX, posY, velX, velY, enemyName, health)
{
    var enemy = enemies.create(posX, posY, enemyName); //position, sprite
    var enemyHealth = health;
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
  damageEnemy: function(fireball, enemy) { //fireballs, koopa
      fireball.kill();
      enemy.kill();
      this.generateExplosion(enemy.centerX, enemy.centerY);
      this.generatePickUp(enemy.centerX, enemy.centerY);
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
      coinSound.play();
    },

    getBlock: function(yoshi, block) {
      block.kill();
      var random =  game.rnd.integerInRange(0,2);
        if(random == 0 && fireDelay > fireDelayMin){
            fireDelay /= 1.1;
            pickUpNr = 0;
        }
        if(random==1){
            fireballSpeed += 25;
            pickUpNr = 1;
        }
        if(random==2){
            yoshiSpeed += 50;
            pickUpNr = 2;
        }
    },
    pickUpNotification: function(){
    	pickUpTextTime = game.time.now;
    	if(pickUpNr == 0){
    		pickUpTextFS.visible = false;
    		pickUpTextYS.visible = false;
    		pickUpTextFD.visible = true;
    	}
    	if(pickUpNr == 1){
    		pickUpTextFD.visible = false;
    		pickUpTextYS.visible = false;
    		pickUpTextFS.visible = true;
    	}
    	if(pickUpNr == 2){
    		pickUpTextFD.visible = false;
    		pickUpTextFS.visible = false;
    		pickUpTextYS.visible = true;
    	}
        blockSound.play();
    },


//WAVEMANAGER
  waveManager: function()
  {
  //Amount of Enemies spawned, Spacing between Enemies spawned, startXposition, startYposition, velX, velY, enemyName
  var maxMinAmount = 5;
  var amount = Math.floor(Math.random() * 5 + minAmount); //1 to 5
  var startX = Math.floor(Math.random() * 250 + 0);
  velY = Math.floor(Math.random() * 200 + (100 + velMultiplier));


  //Wave 1
    if(game.time.now > (lastWaveSpawned + spawnDelay) && wave1 < wave1Max)
      {
        this.spawnWave(amount, 50, 50, 30, 30, 150, 'koopa');
        amount = Math.floor(Math.random() * 5 + minAmount);
        this.spawnWave(amount, 50, 300, 30, -50, 200, 'goomba');

        wave1++;
      }
  //Wave 2
  if(wave1 == wave1Max && game.time.now > (lastWaveSpawned + spawnDelay) && wave2 < wave2Max)
    {
      amount = Math.floor(Math.random() * 5 + minAmount);

      this.spawnWave(amount, 50, 50, 30, 30, velY, 'goomba');

      amount = Math.floor(Math.random() * 5 + minAmount);
      startX = Math.floor(Math.random() * 150 + 150);
      velY = Math.floor(Math.random() * 200 + (150 + velMultiplier));

      this.spawnWave(amount, 50, startX, 30, -50, velY, 'koopa');

      wave2++;
    }
    //When both waves are completed, repeat but more difficult
    if (wave1 == wave1Max && wave2 == wave2Max) {
      wave1 = 0;
      wave2 = 0;
      velMultiplier += 50;
      spawnDelay /= 1.2;
      if( minAmount <= maxMinAmount) { minAmount += 0.5; }
      console.log('round: ' + stage);
      console.log('spawn delay: ' + spawnDelay);
      console.log('velocity multiplier: ' + velMultiplier);
      console.log('minamount: ' + minAmount);
      console.log('fire Delay: ' + fireDelay);
      console.log('fire ball speed: ' + fireballSpeed);
      console.log('yoshi Speed: ' + yoshiSpeed);
      console.log('\n');

      stage++;
    }
  },

  spawnWave: function(amount, spacing, startX, startY, velX, velY, enemyName){
    for (var i = 0; i < (amount * spacing) ; i += spacing) {
      this.generateEnemy(startX + i, startY, velX, velY, enemyName); //posX, posY, velX, velY, enemyName
    }
    lastWaveSpawned = game.time.now;
  },



  gameOverScreen: function(){
      backgroundPos = this.background.tilePosition.y;
    this.state.start('gameOver', true, false, currentScore, currentGold);
  }


}
