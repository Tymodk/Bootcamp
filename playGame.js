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
      
      fireballs = game.add.group();
      fireballs.enableBody = true;
      
      this.generateFireball();

  },

  update: function() {
      this.background.tilePosition.y += 2;
      this.yoshi.animations.play('ani', 6, true, false);
      

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
    
    

    var fireball = fireballs.create(this.yoshi.position.x-10, this.yoshi.position.y-30, 'fireball-mini');

      fireball.animations.add('spin', [0,1,2,3]);
      fireball.animations.play('spin', 8, true, false);
      game.physics.enable(fireball, Phaser.Physics.ARCADE);
      
      fireball.body.velocity.y = -200;
    this.timecheck = game.time.now;

    }
       
    
}


