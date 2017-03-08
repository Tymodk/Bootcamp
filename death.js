MyGame.deathState = function (game) {};

MyGame.deathState.prototype = {
    create: function()
    {
        game.physics.startSystem(Phaser.Physics.ARCADE);
        this.background = game.add.tileSprite(0, 0, 600, 800, 'sky');
        this.background.tilePosition.y = backgroundPos;
        this.generatePlayer(yoshiPosX, yoshiPosY);
        
        i = 0;
    },
    
    update: function()
    {
        i += 1;
        console.log(i);
        
        if(i > 80)
        {
            game.state.start('gameOver');
        }
    },
    
    generatePlayer: function(x, y) {
    this.yoshi = this.add.sprite(x, y, 'yoshi');
    this.yoshi.animations.add('ani', [0,1,2,3]);
    this.yoshi.anchor.setTo(0.5, 0.5);
    game.physics.enable(this.yoshi, Phaser.Physics.ARCADE);
    this.yoshi.body.gravity.y = 1200;
    this.yoshi.body.velocity.y = -400;
    //this.yoshi.animations.play('ani', 6, true, false);
    }
    
    
    
}