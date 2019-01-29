var tool = {
  edit: 0,
  gates: 1,
  gateType: {
    and: 0
  },
  wire_: 2,
  move_: 3,
  edit_: 4,
  sub: -1,
  draw() {
    if(tool.current == tool.gates) {
      if(tool.sub == tool.gateType.and) {
        var sc = Screen.size(false, grid.scale);
        var p = mouseToDraw();
        Screen.drawImageExt(p.x, p.y, buttonImages.and, sc, 0);
        if(Screen.mouse.left.pressed && !buttonHov) {
          var p = mouseToReal();
          new andNode(p.x, p.y);
        }
      }
    }
  }
}
tool.current = tool.edit;
drawable(tool);
