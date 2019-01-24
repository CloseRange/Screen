
class input extends node {
  constructor(x, y) {
    super(x, y, 1, 1);
    this.x = x;
    this.y = y;
  }
  draw() {
    Screen.stroke(255);
    Screen.strokeWeight(1);
    Screen.noFill();
    var dx = getReal(this.x, Screen.WIDTH);
    var dy = getReal(this.y, Screen.HEIGHT);
    Screen.rect(dx, dy, grid.size, grid.size)
  }
}
