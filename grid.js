var grid = {
  x: 0,
  y: 0,
  size: 64,
  UISize: 64,

  preX: 0,
  preY: 0,
  preMX: 0,
  preMY: 0,
  beginStep() {
    if(Screen.mouse.middle.pressed) {
      grid.preX = grid.x;
      grid.preY = grid.y;
      grid.preMX = Screen.mouse.x;
      grid.preMY = Screen.mouse.y;
    }
    if(Screen.mouse.middle.down) {
      grid.x = grid.preX - grid.preMX + Screen.mouse.x;
      grid.y = grid.preY - grid.preMY + Screen.mouse.y;
    }
  },
  draw() {
    Screen.noFill();
    Screen.stroke(255);
    Screen.rect(grid.x, grid.y, grid.size, grid.size);
  }
}
drawable(grid);
