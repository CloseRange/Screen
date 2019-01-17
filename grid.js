var gridSize = 32;
var drawSize = 15;
var tSize = gridSize * drawSize;
var theGrid = [];

for(var i=0; i<drawSize; i++) {
  theGrid[i] = [];
  for(var j=0; j<drawSize; j++) {
    theGrid[i][j] = null;
  }
}
var grid = {
  x: 0,
  y: 0,
  moving: {
    preX: 0,
    preY: 0,
    mx: 0,
    my: 0
  },
  step: function() {
    if(Screen.mouse.middle.pressed) {
      grid.moving.mx = Screen.mouse.x;
      grid.moving.my = Screen.mouse.y;
      grid.moving.preX = this.x;
      grid.moving.preY = this.y;
    }
    if(Screen.mouse.middle.down) {
      var mx_ = Screen.mouse.x;
      var my_ = Screen.mouse.y;
      this.x = grid.moving.preX + (mx_ - grid.moving.mx);
      this.y = grid.moving.preY + (my_ - grid.moving.my);
    }
    if(Screen.mouse.left.down) {
      var mx = Screen.mouse.x;
      var my = Screen.mouse.y;
      if(mx < this.x || my < this.y || mx>this.x+tSize || my>this.y+tSize)
        return false;
      var dx = Math.floor((Screen.mouse.x-this.x) / gridSize);
      var dy = Math.floor((Screen.mouse.y-this.y) / gridSize);
      new trail(dx, dy);
    }
    if(Screen.mouse.right.down) {
      var mx = Screen.mouse.x;
      var my = Screen.mouse.y;
      if(mx < this.x || my < this.y || mx>this.x+tSize || my>this.y+tSize)
        return false;
      var dx = Math.floor((Screen.mouse.x-this.x) / gridSize);
      var dy = Math.floor((Screen.mouse.y-this.y) / gridSize);
      if(theGrid[dx][dy]) {
        deleteDrawable(theGrid[dx][dy])
        delete theGrid[dx][dy];
      }
      theGrid[dx][dy] = null;
    }
  },
  draw: function() {
    Screen.noFill();
    Screen.stroke(100);
    for(var i=0; i<drawSize; i++) {
      for(var j=0; j<drawSize; j++) {
        var dx = this.x+i*gridSize;
        var dy = this.y+j*gridSize;
        Screen.rect(dx, dy, gridSize, gridSize);
      }
    }
  }
}
drawable(grid);
