var gridSize = 32;
var drawSize = 15;
var tSize = gridSize * drawSize;
var theGrid = [];
for(var i=0; i<drawSize; i++) {
  theGrid[i] = [];
  theGrid[i][i] = null;
}
class connectNode {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    theGrid[x][y] = this;
    drawable(this);
  }
  draw() {
    var s = 15;
    var color = new Color(100);
    Screen.stroke(color);
    Screen.strokeWeight(s);
    var dx = offset.x+this.x*gridSize;
    var dy = offset.y+this.y*gridSize;
    // Screen.line(dx, dy, dx+gridSize, dy+gridSize)
    if(findCell(this.x-1, this.y))
      lineDir(dx, dy, -1, 0);
    if(findCell(this.x+1, this.y))
      lineDir(dx, dy, +1, 0);
    if(findCell(this.x, this.y-1))
      lineDir(dx, dy, 0, -1);
    if(findCell(this.x, this.y+1))
      lineDir(dx, dy, 0, 1);
    Screen.strokeWeight(1);
    Screen.noStroke();
    Screen.fill(color);
    var c = (findCell(this.x-1, this.y) && findCell(this.x+1, this.y)) || (findCell(this.x, this.y-1)&&findCell(this.x, this.y+1))
    if(!c)
      Screen.circle(dx+gridSize/2, dy+gridSize/2, s/2)
  }
}

function findCell(x, y) {
  if(x < 0) return false;
  if(y < 0) return false;
  if(x >= drawSize) return false;
  if(y >= drawSize) return false;
  return (theGrid[x][y] != null);
}
function lineDir(x, y, dx, dy) {
  x += gridSize/2;
  y += gridSize/2;
  Screen.line(x, y, x+dx*gridSize/2, y+dy*gridSize/2)
}

function makeNode(x, y) {
  if(theGrid[x][y] != null) return false;
  return new connectNode(x, y);
}
