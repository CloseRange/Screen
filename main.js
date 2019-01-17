var offset = {x: Screen.width/2 - tSize/2, y: Screen.height/2 - tSize/2};

var grid = {
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
      grid.moving.preX = offset.x;
      grid.moving.preY = offset.y;
    }
    if(Screen.mouse.middle.down) {
      var mx_ = Screen.mouse.x;
      var my_ = Screen.mouse.y;
      offset.x = grid.moving.preX + (mx_ - grid.moving.mx);
      offset.y = grid.moving.preY + (my_ - grid.moving.my);
    }
    if(Screen.mouse.left.down) {
      var mx = Screen.mouse.x;
      var my = Screen.mouse.y;
      if(mx < offset.x || my < offset.y || mx>offset.x+tSize || my>offset.y+tSize)
        return false;
      var dx = Math.floor((Screen.mouse.x-offset.x) / gridSize);
      var dy = Math.floor((Screen.mouse.y-offset.y) / gridSize);
      makeNode(dx, dy);
    }
    if(Screen.mouse.right.down) {
      var mx = Screen.mouse.x;
      var my = Screen.mouse.y;
      if(mx < offset.x || my < offset.y || mx>offset.x+tSize || my>offset.y+tSize)
        return false;
      var dx = Math.floor((Screen.mouse.x-offset.x) / gridSize);
      var dy = Math.floor((Screen.mouse.y-offset.y) / gridSize);
      if(theGrid[dx][dy]) {
        deleteDrawable(theGrid[dx][dy])
        delete theGrid[dx][dy];
      }
      theGrid[dx][dy] = null;
    }
  },
  draw: function() {
    Screen.background(255);
    Screen.noFill();
    Screen.stroke(100);
    for(var i=0; i<drawSize; i++) {
      for(var j=0; j<drawSize; j++) {
        var dx = offset.x+i*gridSize;
        var dy = offset.y+j*gridSize;
        Screen.rect(dx, dy, gridSize, gridSize);
      }
    }
  }
}

drawable(grid);
