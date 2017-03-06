var fireballs;
var timecheck;
var fireRate = 200;

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
      this.troopa = this.add.sprite(game.world.centerX, game.world.centerY -200, 'paratroopa');
      this.troopa.animations.add('fly',[5,6,7,8,9,15,16,17,18,19]);
      fireballs = game.add.group();
      fireballs.enableBody = true;
      
      this.generateFireball();

  },

  update: function() {
      this.background.tilePosition.y += 2;
      this.yoshi.animations.play('ani', 6, true, false);
      this.troopa.animations.play('fly', 5, true, false);

      if (Phaser.Rectangle.contains(this.yoshi.body, game.input.x, game.input.y))
        {
            this.yoshi.body.velocity.setTo(0, 0);
        }
      else{
        game.physics.arcade.moveToPointer(this.yoshi, 300);
      }
      
      if(game.time.now > (this.timecheck + fireRate))
        {
            this.generateFireball();
    }
  },
    
generateFireball: function() {
<<<<<<< HEAD
    
    var fireball = fireballs.create(this.yoshi.position.x, this.yoshi.position.y, 'fireball-mini');
=======
    var fireball = fireballs.create(this.yoshi.position.x-10, this.yoshi.position.y-30, 'fireball-mini');
>>>>>>> 21ac5b1819c6f6d16e25cdc4bcb0b3206b36842e
      fireball.animations.add('spin', [0,1,2,3]);
      fireball.animations.play('spin', 8, true, false);
      game.physics.enable(fireball, Phaser.Physics.ARCADE);
      
      fireball.body.velocity.y = -200;
<<<<<<< HEAD
    }
=======
       
    this.timecheck = game.time.now;
}
>>>>>>> 21ac5b1819c6f6d16e25cdc4bcb0b3206b36842e
}
