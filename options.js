//state variables
var soundText;
var sfxText;
var difficultyText;
var creditsText;
var yesButton;
var noButton;
var yesSFXButton;
var noSFXButton;
var easyButton;
var mediumButton;
var hardButton;
//initiating state
MyGame.optionsState = function (game) {};
MyGame.optionsState.prototype = {
  create: function() {
    //background and title
    this.background = game.add.tileSprite(0, 0, 600, 800, 'sky');
    this.background.tilePosition.y = backgroundPos;
    var title = game.add.image(game.world.centerX, 20, 'title');
    title.scale.setTo(0.7);
    title.anchor.set(0.5, 0);
    //sound enabler text
    soundText = game.add.text(game.world.centerX - 60, game.height - 450, '',{font: 'Pixel', fontSize: '28px', fill: '#fff'});
    soundText.scale.setTo(0.75);
    soundText.anchor.set(0.5);
    yesButton = game.add.button(game.world.centerX + 120, game.height - 450, 'buttonYes', this.toggleSound);
    yesButton.scale.setTo(0.7);
    yesButton.anchor.set(0.5);
    if(soundEnabled){
      yesButton.visible = true;
    }
    else{
      yesButton.visible = false;
    }
    noButton = game.add.button(game.world.centerX + 120, game.height - 450, 'buttonNo', this.toggleSound);
    noButton.scale.setTo(0.7);
    noButton.anchor.set(0.5);
    if(soundEnabled){
      noButton.visible = false;
    }
    else{
      noButton.visible = true;
    }
    //sfx enabler text
    sfxText = game.add.text(game.world.centerX - 70, game.height - 400, '',{font: 'Pixel', fontSize: '28px', fill: '#fff'});
    sfxText.scale.setTo(0.75);
    sfxText.anchor.set(0.5);
    yesSFXButton = game.add.button(game.world.centerX + 140, game.height - 400, 'buttonYes', this.toggleSFXSound);
    yesSFXButton.scale.setTo(0.7);
    yesSFXButton.anchor.set(0.5);
    if(sfxEnabled){
      yesSFXButton.visible = true;
    }
    else{
      yesSFXButton.visible = false;
    }
    noSFXButton = game.add.button(game.world.centerX + 140, game.height - 400, 'buttonNo', this.toggleSFXSound);
    noSFXButton.scale.setTo(0.7);
    noSFXButton.anchor.set(0.5);
    if(sfxEnabled){
      noSFXButton.visible = false;
    }
    else{
      noSFXButton.visible = true;
    }
    //difficulty text
    difficultyText = game.add.text(game.world.centerX - 70, game.height - 350, '', {font: 'Pixel', fontSize: '28px', fill: '#fff'});
    difficultyText.scale.setTo(0.75);
    difficultyText.anchor.set(0.5);

    //exit button and credits
    var exitButton = game.add.button(game.width / 2, game.height - 100, 'exit', this.exitGame);
    exitButton.scale.setTo(0.7);
    exitButton.anchor.set(0.5);
    creditsText = game.add.text( 10, game.height - 10, '',{font: 'Pixel' ,fontSize: '28px', fill: '#fff'});
    creditsText.anchor.set(0, 1)
    creditsText.scale.setTo(0.7);
  },
  toggleSound: function(){
    if(!soundEnabled){
        yesButton.visible = true;
        noButton.visible = false;
        soundEnabled = true;
    }
    else{
        noButton.visible = true;
        yesButton.visible = false;
        soundEnabled = false;
    }
  },
  toggleSFXSound: function(){
    if(!sfxEnabled){
        yesSFXButton.visible = true;
        noSFXButton.visible = false;
        sfxEnabled = true;
    }
    else{
        noSFXButton.visible = true;
        yesSFXButton.visible = false;
        sfxEnabled = false;
    }
  },
  update: function(){
    this.background.tilePosition.y += 2;
      backgroundPos = this.background.tilePosition.y;
      
    creditsText.text = 'Jens Van Assche - Jordy Pereira \nLennert Peeters - Tymo de Kock';
    soundText.text = 'enable sound - ';
    sfxText.text = 'enable sfx sound - ';
    if(soundEnabled){
          music.mute = false;
      }
      else{
          music.mute = true;
      }
  },
  exitGame: function(){
    game.state.start('titlescreen');
  },
}