
MyGame.playGameState = function (game) {};

MyGame.playGameState.prototype = {


  create: function() {

      //Sky background
      this.background = game.add.tileSprite(0, 0, 800, 600, "sky");
      //Init Player
      this.player = game.add.sprite(32, 32, 'yoshi');


      //Variable keyboard keys
      cursors = game.input.keyboard.createCursorKeys();


  },

  update: function() {
      this.background.tilePosition.y += 2;

      //Move left and right
      if (cursors.left.isDown)
      {
          //  Move to the left
          player.body.velocity.x = -150;

          player.animations.play('left');
      }
      else if (cursors.right.isDown)
      {
          //  Move to the right
          player.body.velocity.x = 150;

          player.animations.play('right');
      }
  }

}
