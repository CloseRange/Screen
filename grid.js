
var grid = {
  x: 0,
  y: 0,
  size: 64,
  cellCount: 10,
  canvasSize: 0,
  cell: [],
  setSize: function(sz, cellCnt) {
    grid.size = sz;
    grid.cellCount = cellCnt;
    grid.canvasSize = sz*cellCnt;
    grid.cell = [];

    for(var i=-1; i<=grid.cellCount; i++) {
      grid.cell[i] = [];
      for(var j=-1; j<=grid.cellCount; j++) {
        grid.cell[i][j] = null;
      }
    }
    grid.x = Screen.width/2 - grid.canvasSize/2;
    grid.y = Screen.height/2 - grid.canvasSize/2;
  },
  moving: {
    preX: 0,
    preY: 0,
    mx: 0,
    my: 0
  },
  step: function() {
    if(Screen.mouse.left.pressed) {
      grid.moving.mx = Screen.mouse.x;
      grid.moving.my = Screen.mouse.y;
      grid.moving.preX = this.x;
      grid.moving.preY = this.y;
      makeSelection(cursor.x, cursor.y)
    }
    if(Screen.mouse.left.down && tools.current == tools.move) {
      var mx_ = Screen.mouse.x;
      var my_ = Screen.mouse.y;
      this.x = grid.moving.preX + (mx_ - grid.moving.mx);
      this.y = grid.moving.preY + (my_ - grid.moving.my);
    }
    if(Screen.mouse.left.down && false) {
      var mx = Screen.mouse.x;
      var my = Screen.mouse.y;
      if(mx < this.x || my < this.y || mx>this.x+grid.canvasSize || my>this.y+grid.canvasSize)
        return false;
      var dx = Math.floor((Screen.mouse.x-this.x) / grid.size);
      var dy = Math.floor((Screen.mouse.y-this.y) / grid.size);
      // new trail(dx, dy);
    }
    if(false) {
      var mx = Screen.mouse.x;
      var my = Screen.mouse.y;
      if(mx < this.x || my < this.y || mx>this.x+grid.canvasSize || my>this.y+grid.canvasSize)
        return false;
      var dx = Math.floor((Screen.mouse.x-this.x) / grid.size);
      var dy = Math.floor((Screen.mouse.y-this.y) / grid.size);
      if(grid.cell[dx][dy]) {
        deleteDrawable(grid.cell[dx][dy])
        delete grid.cell[dx][dy];
      }
      grid.cell[dx][dy] = null;
    }
  },
  draw: function() {
    // Screen.noFill();
    Screen.fill(255, 255, 255, .5);
    Screen.noStroke();
    for(var i=0; i<=grid.cellCount; i++) {
      for(var j=0; j<=grid.cellCount; j++) {
        var dx = this.x+i*grid.size;
        var dy = this.y+j*grid.size;
        // Screen.rect(dx, dy, grid.size, grid.size);
        Screen.circle(dx, dy, .5);
      }
    }
  }
}
drawable(grid);
grid.setSize(8, 40);
