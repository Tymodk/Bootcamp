var i = 0;
var countDownSprite;
var yoshiSpeed = 250;
//yohsi positions
var yoshiPosX;
var yoshiPosY;

MyGame.preGameState = function (game) {};

MyGame.preGameState.prototype = {
    create: function()
    {
        game.physics.startSystem(Phaser.Physics.ARCADE);
        this.background = game.add.tileSprite(0, 0, 600, 800, 'sky');
        this.background.tilePosition.y = backgroundPos;
        this.generatePlayer(game.world.centerX, game.world.centerY + 200);
        var scoreBack = game.add.image(0, 0, 'scoreBackground');
        scoreText = game.add.text( 4, 4, 'score: 0',{font: 'Pixel' ,fontSize: '24px', fill: '#fff'});
        coinText = game.add.text( game.world.centerX + 50, 4, 'coins: 0',{font: 'Pixel' ,fontSize: '24px', fill: '#fff'});
        
        i = 0;
    },
    
    update: function()
    {
        i += 1;
        
        this.background.tilePosition.y += 2;
        
    // vertical movement
    if(game.input.mousePointer.y + 10 < this.yoshi.y){
      game.physics.arcade.moveToPointer(this.yoshi, yoshiSpeed);
    }
    else if(game.input.mousePointer.y - 10 > this.yoshi.y){
      game.physics.arcade.moveToPointer(this.yoshi, yoshiSpeed);
    }
    else{
      this.yoshi.body.velocity.y = 0;
    }

    // vertical borders
    if(this.yoshi.y <= 52){
      this.yoshi.y = 52;
    }
    if(this.yoshi.y < 52){
      this.yoshi.body.velocity.y = 0;
    }

    if(this.yoshi.y >= game.height - 120){
      this.yoshi.y = game.height - 120;
    }
    if(this.yoshi.y > game.height - 120){
      this.yoshi.body.velocity.y = 0;
    }

    // horizontal movement
    if(game.input.mousePointer.x + 10 < this.yoshi.x){
      game.physics.arcade.moveToPointer(this.yoshi, yoshiSpeed);
    }
    else if(game.input.mousePointer.x - 10 > this.yoshi.x){
      game.physics.arcade.moveToPointer(this.yoshi, yoshiSpeed);
    }
    else{
      this.yoshi.body.velocity.x = 0;
    }

    // horizontal borders
    if(this.yoshi.x <= 20){
        this.yoshi.x = 20;
    }
    if (this.yoshi.x < 20) {
        this.yoshi.body.velocity.x = 0;
    }

    if(this.yoshi.x >= game.width - 20){
        this.yoshi.x = game.width - 20;
    }
    if(this.yoshi.x > game.width - 20){
        this.yoshi.body.velocity.x = 0;
    }

        // countdown
        if (i == 1)
        {
            this.countDown(0);
        }
        else if (i == 60)
        {
            this.countDown(1);
        }
        else if (i == 120)
        {
            this.countDown(2);
        }
        else if (i == 180)
        {
            yoshiPosX = this.yoshi.world.x;
            yoshiPosY = this.yoshi.world.y;
            
            backgroundPos = this.background.tilePosition.y;
            game.state.start('playGame', true, false, yoshiPosX, yoshiPosY);
        }
        
    },
    
    generatePlayer: function(x, y) {
    this.yoshi = this.add.sprite(x, y, 'yoshi');
    this.yoshi.animations.add('ani', [0,1,2,3]);
    this.yoshi.anchor.setTo(0.5, 0.5);
    this.yoshi.scale.setTo(1.75,1.75);

    game.physics.enable(this.yoshi, Phaser.Physics.ARCADE);
    this.yoshi.animations.play('ani', 6, true, false);
    },
    
    countDown: function(z) {
        switch (z)
        {
            case 0:
                this.countDownSprite = game.add.sprite(240, 400, 'ready');
                this.countDownSprite.anchor.setTo(0.5, 0.5);
                break;
                
            case 1:
                this.countDownSprite.kill();
                this.countDownSprite = game.add.sprite(240, 400, 'set');
                this.countDownSprite.anchor.setTo(0.5, 0.5);
                break;
                
            case 2:
                this.countDownSprite.kill();
                this.countDownSprite = game.add.sprite(240, 400, 'go');
                this.countDownSprite.anchor.setTo(0.5, 0.5);
                
            default:
                break;
        }
    }
}