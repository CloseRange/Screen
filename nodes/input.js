class IO {
  constructor(nodeBase, dir, trans) {
    this.nodeBase = nodeBase;
    this.dir = dir;
    this.trans = trans
    this.hover = false;
    this.s = grid.size/4;
    this.canWire = false;
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
    if(tool.nearest.obj == this && this.canWire) {
      if(Screen.mouse.left.pressed) {
        tool.wireing = this;
        if(this.onWireSel) this.onWireSel();
      }
    }
    if(Screen.mouse.right.pressed) {
      tool.wireing = false;
    }
    this.hover = (tool.nearest.obj == this)
    Screen.fill(255, 255, 255*!this.hover);
    var p = this.getXY();
    var dx = p.x;
    var dy = p.y;

    Screen.circle(dx, dy, this.s);
    if(this.subDraw) this.subDraw();

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
    this.canWire = true;
    this.connections = [];
    this.connection_midpoints = [];
  }
  onWireSel() {
    this.connection_midpoints.push([]);
  }
  step() {
    if(tool.wireing == this) {
      if(Screen.mouse.left.pressed) {
        if(tool.nearest.obj instanceof Input) {
          this.connections.push(tool.nearest.obj);
          tool.wireing = false;
        } else {
          // console.log(this.connection_midpoints);
          // var i = this.connections.length-1;
          // console.log(this.connection_midpoints[i]);
          // this.connection_midpoints[i].push(point(Screen.mouse.x, Screen.mouse.y));
        }
      }
    }
  }
  subDraw() {
    var p = this.getXY();
    Screen.fill(255);
    Screen.strokeWeight(4);
    for(var i=0; i<this.connections.length; i++) {
      var o = this.connections[i];
      var p2 = o.getXY();
      var pts = [];
      var offset = point_distance(p.x, p.y, p2.x, p2.y)/3;
      var d = addDIR(this.dir, this.nodeBase.dir, DIR.left)
      var int = getDirectionIntegration(d);
      int = getRotatedDirectionIntegration(int);
      int = getInvertedDirectionIntegration(int);
      var d2 = addDIR(o.dir, o.nodeBase.dir, DIR.left)
      var int2 = getDirectionIntegration(d2);
      int2 = getRotatedDirectionIntegration(int2);
      int2 = getInvertedDirectionIntegration(int2);
      pts.push(point(p.x, p.y));
      pts.push(point(p.x+offset*int.x, p.y+offset*int.y));
      pts.push(point(p2.x+offset*int2.x, p2.y+offset*int2.y));
      pts.push(point(p2.x, p2.y));
      Screen.curve(pts);
    }
  }
}
