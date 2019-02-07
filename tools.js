var tool = {
  selected: 1,
  inMenu: false,
  wireing: false,
  movingNode: false,
  nearest: {
    obj: null,
    dist: Infinity
  },
  canMake: true,
  list: [
    {obj: default_action},
    {obj: andNode_make, img: IMG.and.norm, size: 2}
  ],
  rotate: DIR.right,
  beginStep() {
    if(tool.wireing || tool.movingNode) tool.canMake = false;
  },
  step() {
    if(tool.inMenu || tool.nearest.obj || !tool.canMake) return;
    if(Screen.mouse.left.pressed) {
      var mx = Screen.mouse.x - grid.x;
      var my = Screen.mouse.y - grid.y;
      var o = tool.list[tool.selected].obj(mx, my);
      if(o) {
        o.dir = tool.rotate;
      }
    }
    if(Screen.mouse.wheel.up) tool.rotate = addDIR(tool.rotate, 1);
    if(Screen.mouse.wheel.down) tool.rotate = addDIR(tool.rotate, -1);
  },
  endDraw() {
    tool.nearest.dist = Infinity;
    tool.nearest.obj = null;
    superHighlight = false;
    if(!tool.wireing && !tool.movingNode) tool.canMake = true;
  },
  draw() {
    if(tool.inMenu) return;
    var lst = tool.list[tool.selected];
    if(!lst.img || !lst.img.hasLoaded) return;
    if(tool.nearest.obj) return;
    if(!tool.canMake) return;

    var preS = lst.img.height;
    var scaler = grid.size / preS * (lst.size||1);
    var sc = Screen.size(false, scaler);
    var p = getPosition(Screen.mouse.x-grid.x, Screen.mouse.y-grid.y);
    Screen.pen.globalAlpha = .5;
    Screen.drawImageExt(p.x, p.y, lst.img, sc, addDIR(tool.rotate, DIR.left)*90);
    Screen.pen.globalAlpha = 1;
  }
}
drawable(tool);
function default_action(x, y) {

}
