class IO {
  constructor(nodeBase, dir, trans) {
    this.nodeBase = nodeBase;
    this.dir = dir;
    this.trans = trans
    this.hover = false;
    this.s = grid.size/4;
    drawable(this);
  }
  getXY() {

    var d = addDIR(this.dir, this.nodeBase.dir, DIR.left)
    var p = getStartEdge(this.nodeBase, d);
    p = getPosition(p.x, p.y);
    // var t = makeTranslation(TRANS.cell(this.cell), TRANS.scale(this.scale))
    p = applyTranslation(p.x, p.y, this.trans, d, this.nodeBase)
    return p;
  }
  beginStep() {
    var p = this.getXY();
    var mouseDist = point_distance(p.x-grid.x, p.y-grid.y, Screen.mouse.x-grid.x, Screen.mouse.y-grid.y);
    this.s = grid.size / 4;
    if(mouseDist < tool.nearest.dist && mouseDist <= this.s) {
      tool.nearest.dist = mouseDist;
      tool.nearest.obj = this;
    }
  }
  draw() {
    this.hover = (tool.nearest.obj == this)
    Screen.fill(255, 255, 255*!this.hover);
    var p = this.getXY();
    var dx = p.x;
    var dy = p.y;

    Screen.circle(dx, dy, this.s);
  }
}
class Input extends IO {
  constructor(base, d, t) {
    super(base, d, t);
    this.connections = [];
  }
}
class Output extends IO {
  constructor(base, d, t) {
    super(base, d, t);
  }
}
