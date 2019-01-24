var gate = {};
class node {
  constructor(x, y, width, height) {
    this.width = width;
    this.height = height;
    if(!node.isFree(x, y, width, height)) {
      delete this;
    } else {
      drawable(this);
    }
    this.x = x*grid.size;
    this.y = y*grid.size;
    this.isSelected = false;
    grid.cell[x][y] = this;
  }
  static isFree(x, y, width, height) {
    for(var i=0; i<1; i++) {
      for(var j=0; j<1; j++) {
        var dx = x+i;
        var dy = y+j;
        if(dx < 0) return false;
        if(dy < 0) return false;
        if(dx >= grid.cellCount || dy >= grid.cellCount) return false
        if(grid.cell[dx][dy] != null) return false;
      }
    }
    return true;
  }
}
var tools = {
  current: 0,
  selection: 0,
  move: 1
};
