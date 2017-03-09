//state variables
var soundText;
var sfxText;
var difficultyText;
var creditsText;
var yesButton;
var noButton;
var yesSFXButton;
var noSFXButton;
var swipeText;
var onButton;
var offButton;
//initiating state
MyGame.optionsState = function (game) {};
MyGame.optionsState.prototype = {
  create: function() {
    //background and title
    this.background = game.add.tileSprite(0, 0, 600, 820, 'sky');
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
    noButton = game.add.button(game.world.centerX + 120, game.height - 450, 'buttonNo', this.toggleSound);
    noButton.scale.setTo(0.7);
    noButton.anchor.set(0.5);
    if(soundEnabled){
      yesButton.visible = true;
      noButton.visible = false;
    }
    else{
      yesButton.visible = false;
      noButton.visible = true;
    }
    //sfx enabler text
    sfxText = game.add.text(game.world.centerX - 70, game.height - 380, '',{font: 'Pixel', fontSize: '28px', fill: '#fff'});
    sfxText.scale.setTo(0.75);
    sfxText.anchor.set(0.5);
    yesSFXButton = game.add.button(game.world.centerX + 140, game.height - 380, 'buttonYes', this.toggleSFXSound);
    yesSFXButton.scale.setTo(0.7);
    yesSFXButton.anchor.set(0.5);
    noSFXButton = game.add.button(game.world.centerX + 140, game.height - 380, 'buttonNo', this.toggleSFXSound);
    noSFXButton.scale.setTo(0.7);
    noSFXButton.anchor.set(0.5);
    if(sfxEnabled){
      yesSFXButton.visible = true;
      noSFXButton.visible = false;
    }
    else{
      yesSFXButton.visible = false;
      noSFXButton.visible = true;
    }
    //swiper enabled
    swipeText = game.add.text(game.world.centerX - 60, game.height - 310, '',{font: 'Pixel', fontSize: '28px', fill: '#fff'});
    swipeText.scale.setTo(0.75);
    swipeText.anchor.set(0.5);
    onButton = game.add.button(game.world.centerX + 120, game.height - 310, 'buttonOn', this.toggleSwipe);
    onButton.scale.setTo(0.7);
    onButton.anchor.set(0.5);
    offButton = game.add.button(game.world.centerX + 120, game.height - 310, 'buttonOff', this.toggleSwipe);
    offButton.scale.setTo(0.7);
    offButton.anchor.set(0.5);
    if(swipeEnabled)
    {
      onButton.visible = true;
      offButton.visible = false;
    }
    else{
      onButton.visible = false;
      offButton.visible = true;
    }
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
  toggleSwipe: function(){
    if(!swipeEnabled){
      onButton.visible = true;
      offButton.visible = false;
      swipeEnabled = true;
    }
    else{
      onButton.visible = false;
      offButton.visible = true;
      swipeEnabled = false;
    }
  },
  update: function(){
    this.background.tilePosition.y += 2;
      backgroundPos = this.background.tilePosition.y;
      
    creditsText.text = 'Jens Van Assche - Jordy Pereira \nLennert Peeters - Tymo de Kock';
    soundText.text = 'enable sound - ';
    sfxText.text = 'enable sfx sound - ';
    swipeText.text = 'enable swiper - ';
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