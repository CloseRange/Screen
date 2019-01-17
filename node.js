
class node {
  constructor(x, y, width, height) {
    this.width = width;
    this.height = height;
    if(!node.isFree(x, y, width, height)) {
      delete this;
    } else {
      drawable(this);
    }
    this.x = x*gridSize;
    this.y = y*gridSize;
  }
  static isFree(x, y, width, height) {
    for(var i=0; i<width; i++) {
      for(var j=0; j<height; j++) {
        var dx = x+i;
        var dy = y+j;
        if(dx < 0) return false;
        if(dy < 0) return false;
        if(dx >= gridSize || dy >= gridSize) return false
        if(theGrid[dx][dy] != null) return false;
      }
    }
    return true;
  }
}
class trail extends node {
  constructor(x, y) {
    super(x, y, 2, 2);
  }
  draw() {
    Screen.fill(255);
    Screen.rect(this.x+grid.x, this.y+grid.y, 32, 32);
  }
}
new trail(0, 0);
