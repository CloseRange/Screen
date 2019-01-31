
class node {
  constructor(x, y, img, size, resizable) {
    this.x = x;
    this.y = y;
    this.img = img;
    this.r = 0;
    this.size = size;
    this.canResize = resizable;
    this.ins = [];
    this.outs = [];
    this.width = 1;
    this.height = 1;
    this.dir = DIR.right;
    drawable(this);
  }
  beginStep() {
    var p = getPosition(this.x, this.y);
    var mouseDist = point_distance(p.x-grid.x, p.y-grid.y, Screen.mouse.x-grid.x, Screen.mouse.y-grid.y);
    if(mouseBox(this.x-this.width/2, this.y-this.height/2, this.x+this.width/2, this.y+this.height/2)) {
      console.log("HI")
      tool.canMake = false;
      if(mouseDist < tool.nearest.dist) {
        tool.nearest.dist = mouseDist;
        tool.nearest.obj = this;
      }
    }
  }
  draw() {
    if(!this.img.norm.hasLoaded) return;
    var preS = this.img.norm.height;
    var scaler = grid.size / preS * this.size;
    var sc = Screen.size(false, scaler);
    var p = getPosition(this.x, this.y);
    var a = "norm";
    var op = 1;
    if(tool.nearest.obj == this) {
      a = "sel";
      if(Screen.mouse.right.pressed) {
        new optionGrow(this);
        new optionShrink(this);
        new option(this, 1, "Move");
        new option(this, 2, "Delete");
        new option(this, 3, "Grow");
      }
      var op = .5;
    }
    Screen.pen.globalAlpha = op;
    Screen.drawImageExt(p.x, p.y, this.img[a], sc, addDIR(this.dir, DIR.left)*90);
    Screen.pen.globalAlpha = 1;
    this.width = this.img.norm.width * scaler;
    this.height = this.img.norm.height * scaler;

  }
  setIO(preIns, preOuts) {
  }
  addIn(dir, trans, cins) {
    var ind = this.ins.length;
    var l = cins.length - 1;
    if(ind <= l) {
      this.ins.push(cins[ind]);
    } else {
      var i = new IO(this, dir, trans);
      this.ins.push(i);
    }
  }
  clearOldIOS(ins_, outs_) {
    for(var i=this.ins.length; i<ins_.length; i++) {
      deleteDrawable(ins_[i]);
      delete ins_[i];
    }
    for(var i=this.outs.length; i<outs_.length; i++) {
      deleteDrawable(ins_[i]);
      delete ins_[i];
    }
  }
  addOut(dir, trans, couts) {
    var ind = this.outs.length;
    var l = couts.length - 1;
    if(ind <= l) {
      this.outs.push(couts[ind]);
    } else {
      var i = new IO(this, dir, trans);
      this.outs.push(i);
    }
  }
}
// new node(0, 0);
// new node(100, 100);
