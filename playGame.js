
var score = 0;
var scoreText;

var fireballs;
var lastFireballFired;
var fireDelay = 400;
var fireballSpeed = 250;

var yoshiSpeed = 200;
var koopas;


MyGame.playGameState = function (game) {};

MyGame.playGameState.prototype = {

  create: function() {


      game.physics.startSystem(Phaser.Physics.ARCADE);
      this.hidden = this.add.tileSprite(0, 0, 600, 800, "sky-boss");

      this.background = game.add.tileSprite(0, 0, 600, 800, "sky");
      this.skyboss = this.add.tileSprite(0, 0, 600, 800, 'sky-boss');
      this.skyboss.alpha = 0;
      this.add.tween(this.skyboss).to( { alpha: 1 }, 1000, Phaser.Easing.Linear.None, true,  9000, 1000, true);


      music = game.add.audio('water');
      music.play();

      //Add Player
      this.yoshi = this.add.sprite(game.world.centerX, game.world.centerY +100, 'yoshi');
      //Add Player Animations
      this.yoshi.animations.add('ani', [0,1,2,3]);
      this.yoshi.anchor.setTo(0.5, 0.5);
      game.physics.enable(this.yoshi, Phaser.Physics.ARCADE);




      //Fireball
//      this.fireball = this.add.sprite(this.yoshi.position.x, this.yoshi.position.y, 'fireball-mini');
//      this.fireball.animations.add('spin', [0,1,2,3]);
//      this.fireballbig = this.add.sprite(this.yoshi.position.x, this.yoshi.position.y +100, 'fireball-big');
//      this.fireballbig.animations.add('woosh', [0,1]);
//      this.fireballbigger = this.add.sprite(this.yoshi.position.x, this.yoshi.position.y +200, 'fireball-bigger');
//      this.fireballbigger.animations.add('woosh2', [0,1]);

      //Score
      scoreText = game.add.text( 4, game.height - 32, 'score: 0',{font: 'Pixel' ,fontSize: '28px', fill: '#fff'});

      //Fireballs
      fireballs = game.add.group();
      fireballs.enableBody = true;

      this.generateFireball();




      //Enemies
      koopas = game.add.group();
      koopas.enableBody = true;

      this.generateKoopa();

  },
  update: function() {
      this.background.tilePosition.y += 2;
      this.skyboss.tilePosition.y += 2;
      this.hidden.tilePosition.y += 2;
      score += 1;
      scoreText.text = 'score: ' + score;
      this.yoshi.animations.play('ani', 6, true, false);

      game.physics.arcade.overlap(fireballs, koopas, this.destroyEnemy, null, this);


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

  },

generateFireball: function() {
    var fireball = fireballs.create(this.yoshi.position.x-10, this.yoshi.position.y-30, 'fireball-mini');

    fireball.animations.add('spin', [0,1,2,3]);
    fireball.animations.play('spin', 8, true, false);
    game.physics.enable(fireball, Phaser.Physics.ARCADE);
    fireball.events.onOutOfBounds.add(function(){
      fireball.kill();
    });
    fireball.checkWorldBounds = true;
    fireball.body.velocity.y = - fireballSpeed;
    this.lastFireballFired = game.time.now;

  },

generateKoopa: function() {
    var koopa = koopas.create(39, 46, 'koopa');

    koopa.animations.add('koopa-ani', [0,1,2,3,4,5,6,7,8,9]);
    koopa.animations.play('koopa-ani', 10, true, false);
    game.physics.enable(koopa, Phaser.Physics.ARCADE);
    koopa.checkWorldBounds = true;
    // koopa.body.velocity.y =  fireballSpeed;

  },

  destroyEnemy: function(fireball, koopa) {
      koopa.kill();
      fireball.kill();
    }


}
