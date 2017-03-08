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
        
        if (Phaser.Rectangle.contains(this.yoshi.body, game.input.x, game.input.y))
        {
            this.yoshi.body.velocity.setTo(0, 0);
        }
        else{
            if(this.yoshi.y < game.height - 100){
                game.physics.arcade.moveToPointer(this.yoshi, yoshiSpeed);
            }
            else if(game.input.mousePointer.y < game.height - 100){
                game.physics.arcade.moveToPointer(this.yoshi, yoshiSpeed);
            }
            else{
                this.yoshi.body.velocity.y = 0;
                var horizontalTween = game.add.tween(this.yoshi).to({ 
                        x: game.input.mousePointer.x
                    }, yoshiSpeed, Phaser.Easing.Linear.None, true);
            }
        }
        
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