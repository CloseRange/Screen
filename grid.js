var grid = {
  x: 0,
  y: 0,
  preX: 0,
  preY: 0,
  preMX: 0,
  preMY: 0,
  scale: .25,
  scaleAmount: 256,
  beginDraw() {
    // Screen.pen.translate(Screen.width /2, Screen.height/2);
    // Screen.pen.scale(grid.scale, grid.scale);
    // Screen.pen.translate(grid.x-(Screen.width/2-grid.x)*grid.scale, grid.y-(Screen.height/2-grid.y)*grid.scale);
  },
  endDraw() {
    // Screen.pen.resetTransform();
  },
  step() {
    if(Screen.mouse.middle.pressed) {
      grid.preX = grid.x;
      grid.preY = grid.y;
      grid.preMX = Screen.mouse.x;
      grid.preMY = Screen.mouse.y;
    }
    if(Screen.mouse.middle.down) {
      grid.x = -grid.preMX + grid.preX + Screen.mouse.x;
      grid.y = -grid.preMY + grid.preY + Screen.mouse.y;
    }
    // if(Screen.mouse.wheel.up) {
    //   grid.scale = (Screen.width*grid.scale + this.scaleAmount) / Screen.width;
    // }
    // if(Screen.mouse.wheel.down) {
    //   grid.scale = (Screen.width*grid.scale - this.scaleAmount) / Screen.width;
    // }
    // grid.scale = clamp(grid.scale, .1, 10);
  }
}
drawable(grid);
