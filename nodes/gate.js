class gate_ extends node {
  constructor(x, y, w, h) {
    super(x, y, w, h);
    this.x = x;
    this.y = y;
    this.width = w;
    this.height = h;
  }
  draw() {
    Screen.stroke(255);
    Screen.strokeWeight(2);
    Screen.noFill();
    var dx = this.x * grid.size + grid.x;
    var dy = this.y * grid.size + grid.y;
    Screen.rect(dx, dy, this.width*grid.size, this.height*grid.size);
  }
}
