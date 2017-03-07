//Variables
var currentScore = 0;
var scoreText;

var fireballs;
var lastFireballFired;
var fireDelay = 400;
var fireballSpeed = 250;

var yoshiSpeed = 250;
var enemies;
var lastWaveSpawned = 0;
var spawnDelay = 3000;
var wave1, wave2, wave3, wave4 = 0;
var wave1Max, wave2Max, wave3Max, wave4Max = 5;


MyGame.playGameState = function (game) {};

MyGame.playGameState.prototype = {

  create: function()
  {
      game.physics.startSystem(Phaser.Physics.ARCADE);
      //Reset Variables on New Game
      game.time.now = 0;
      lastWaveSpawned = 0;

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

      //Fireballs
      fireballs = game.add.group();
      fireballs.enableBody = true;

      this.generateFireball();

      //Enemies
      enemies = game.add.group();
      enemies.enableBody = true;

      //Waves
      this.waveManager();

      //PickUps
      pickUps = game.add.group();
      pickUps.enableBody = true;

      //Fireball
      //      this.fireballbig = this.add.sprite(this.yoshi.position.x, this.yoshi.position.y +100, 'fireball-big');
      //      this.fireballbig.animations.add('woosh', [0,1]);
      //      this.fireballbigger = this.add.sprite(this.yoshi.position.x, this.yoshi.position.y +200, 'fireball-bigger');
      //      this.fireballbigger.animations.add('woosh2', [0,1]);
  },


  update: function()
  {
    //Move Background
    this.background.tilePosition.y += 2;
    this.skyboss.tilePosition.y += 2;
    this.hidden.tilePosition.y += 2;

    //Score
    currentScore += 1;
    scoreText.text = 'score: ' + currentScore;



    this.goomba.animations.play('goomba-fly', 7, true, false);
    game.physics.arcade.overlap(fireballs, enemies, this.destroyEnemy, null, this);
    game.physics.arcade.overlap(this.yoshi, enemies, this.gameOverScreen, null, this);
    game.physics.arcade.overlap(this.yoshi, pickUps, this.getPickUp, null, this);




    if (Phaser.Rectangle.contains(this.yoshi.body, game.input.x, game.input.y))
      {
          this.yoshi.body.velocity.setTo(0, 0);
      }
    else{
      game.physics.arcade.moveToPointer(this.yoshi, yoshiSpeed);
    }

    if(game.time.now > (this.lastFireballFired + fireDelay))
      {
          this.generateFireball();
      }

     if(game.time.now > 21000)
     {
         this.background.alpha = 0;
     }


     //Spawn Enemies
     this.waveManager();

  },

  generatePlayer: function(x, y) {
    this.yoshi = this.add.sprite(game.world.centerX, game.world.centerY + 100, 'yoshi');
    this.yoshi.animations.add('ani', [0,1,2,3]);
    this.yoshi.anchor.setTo(0.5, 0.5);
    game.physics.enable(this.yoshi, Phaser.Physics.ARCADE);
    this.yoshi.animations.play('ani', 6, true, false);
    },

generateFireball: function() {
    var fireball = fireballs.create(this.yoshi.position.x-10, this.yoshi.position.y-30, 'fireball-mini');

    fireball.animations.add('spin', [0,1,2,3]);
    fireball.animations.play('spin', 8, true, false);
    game.physics.enable(fireball, Phaser.Physics.ARCADE);
    fireball.events.onOutOfBounds.add( function(){ fireball.kill(); } );
    fireball.checkWorldBounds = true;
    fireball.body.velocity.y = - fireballSpeed;
    this.lastFireballFired = game.time.now;

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
      if(random < 30){
      var pickUp = pickUps.create(x,y,'questionblock');
      pickUp.animations.add('block-spin', [0,1,2,3]);
      pickUp.animations.play('block-spin', 5, true, false);}
      else{
      var pickUp = pickUps.create(x,y,'coin');
      pickUp.animations.add('coin-spin', [0,1,2,3]);
      pickUp.animations.play('coin-spin', 5, true, false);}
      game.physics.enable(pickUp, Phaser.Physics.ARCADE);

      pickUp.body.velocity.y = 100;


  },

  destroyEnemy: function(fireball, enemy) { //fireballs, koopa
      fireball.kill();
      enemy.kill();
      this.generateExplosion(enemy.centerX, enemy.centerY);
      this.generatePickUp(enemy.centerX, enemy.centerY);
    },
    getPickUp: function(yoshi, pickUp) {
      pickUp.kill();
    },


//WAVEMANAGER
  waveManager: function()
  {
  //Amount of Enemies spawned, Spacing between Enemies spawned, startXposition, startYposition, velX, velY, enemyName

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
  if(wave1 == wave1Max && game.time.now > (lastWaveSpawned + spawnDelay) && wave1 < wave1Max)
    {
      var amount = Math.floor(Math.random() * 5 + 1);
      var startX = Math.floor(Math.random() * 150 + 150);
      this.spawnWave(amount, 50, 50, 30, 30, 150, 'koopa');

      amount = Math.floor(Math.random() * 5 + 1);

      this.spawnWave(amount, 50, startX, 30, -50, 200, 'koopa');

      wave1++;
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
