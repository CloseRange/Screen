class node {
  constructor(x, y, img, size, resizable) {
    this.x = x;
    this.y = y;
    this.img = addImage(img);
    this.r = 0;
    this.size = size;
    this.canResize = resizable;
    this.ins = [];
    this.outs = [];
    this.width = 1;
    this.height = 1;
    drawable(this);
  }
  draw() {
    var sc = Screen.size(false, grid.scale);
    var p = getPosition(this.x, this.y);
    Screen.drawImageExt(p.x, p.y, this.img, sc, 0);
    this.width = this.size * grid.scale * this.img.width;
    this.height = this.size * grid.scale * this.img.height;
  }
  setIO(preIns, preOuts) {
  }
}
// new node(0, 0);
// new node(100, 100);
