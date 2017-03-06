
var score = 0;
var scoreText;

var fireballs;
var lastFireballFired;
var fireDelay = 400;
var fireballSpeed = 250;
var yoshiSpeed = 200;


MyGame.playGameState = function (game) {};

MyGame.playGameState.prototype = {

  create: function() {


      game.physics.startSystem(Phaser.Physics.ARCADE);

      this.background = game.add.tileSprite(0, 0, 600, 800, "sky");

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


      
      
      fireballs = game.add.group();
      fireballs.enableBody = true;
      
      this.generateFireball();

  },
  update: function() {
      this.background.tilePosition.y += 2;
      score += 1;
      scoreText.text = 'score: ' + score;
      this.yoshi.animations.play('ani', 6, true, false);
      

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
  },
    
generateFireball: function() {
    
    

    var fireball = fireballs.create(this.yoshi.position.x-10, this.yoshi.position.y-30, 'fireball-mini');

      fireball.animations.add('spin', [0,1,2,3]);
      fireball.animations.play('spin', 8, true, false);
      game.physics.enable(fireball, Phaser.Physics.ARCADE);
      fireball.events.onOutOfBounds.add(function(){
    fireball.kill();   console.log('killed');
      });
    fireball.checkWorldBounds = true;
      fireball.body.velocity.y = - fireballSpeed;
    this.lastFireballFired = game.time.now;

    }

       
    
}


