var core = {
  draw: function() {
    var yInc = 60;
    var padding = 15;
    Screen.fill(255);
    Screen.text(users[ALL], padding, padding+yInc*0);
    Screen.text(users[LOBBY], padding, padding+yInc*2);
    Screen.fill(255, 255, 0);
    Screen.text(users[QUE], padding, padding+yInc*3);
    Screen.fill(0, 255, 0);
    Screen.text(users[GAME], padding, padding+yInc*4);
    Screen.fill(-255/60*Screen.fps+255, 255/60*Screen.fps, 0);
    Screen.text(Screen.fps, Screen.width/2, padding+yInc*1.5);
  },
  step: function() {
  }
}
while(users[ALL] < playerCount)
  addPlayer();

drawable(core);
