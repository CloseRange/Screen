
var select = {x: 0, y: 0, obj: null};
function makeSelection(x, y) {
  for(var i=0; i<grid.cell.length; i++) {
    for(var j=0; j<grid.cell[i].length; j++) {
      if(grid.cell[i][j]) {
        if(grid.cell[i][j].isSelected)
          grid.cell[i][j].isSelected = false;
      }
    }
  }
  if(x < 0 || y < 0 || x >= grid.cellCount || y >= grid.cellCount) return false;
  if(grid.cell[x][y] != null) {
    select.x = x;
    select.y = y;
    select.obj = grid.cell[x][y];
    grid.cell[x][y].isSelected = true;
  }
}
var cursor = {
  x: 0,
  y: 0,
  step: function() {
    cursor.x = Math.floor((Screen.mouse.x-grid.x) / grid.size);
    cursor.y = Math.floor((Screen.mouse.y-grid.y) / grid.size);
    cursor.x = clamp(cursor.x, 0, grid.cellCount-1);
    cursor.y = clamp(cursor.y, 0, grid.cellCount-1);
    cursor.realX = cursor.x*grid.size+grid.x;
    cursor.realY = cursor.y*grid.size+grid.y;
  },
  endDraw: function() {
    Screen.noFill();
    Screen.stroke(255, 0, 0);
    Screen.strokeWeight(1);
    Screen.rect(cursor.realX, cursor.realY, grid.size, grid.size);
  }
}
drawable(cursor);
