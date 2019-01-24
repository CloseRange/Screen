
class output extends node {
  constructor(x, y) {
    super(x, y, 1, 1);
    this.x = x;
    this.y = y;
    this.x2 = x;
    this.y2 = y;
    this.colorGrad = new Cycle(0, 1, .1);
  }
  draw() {
    var size = grid.size / 2;
    var color = new Color(255);

    if(this.isSelected) {
      this.x2 = cursor.x;
      this.y2 = cursor.y;
    }
    var x1_ = this.x*grid.size+grid.x;//+grid.size/2;
    var y1_ = this.y*grid.size+grid.y+grid.size/2;
    var x2_ = this.x2*grid.size+grid.x+grid.size;
    var y2_ = this.y2*grid.size+grid.y+grid.size/2;
    var isPoint = this.x != this.x2 || this.y != this.y2;
    if(!isPoint) {
      Screen.strokeWeight(grid.size/4);
      Screen.stroke(color);
      Screen.line(x1_, y1_, x1_+grid.size/2, y1_);
    }
    // Screen.setStrokeGradient(new Color(255, 255, this.colorGrad.value), color, {x: x1_, y: y1_}, {x: x2_, y: y2_}, 0, .5);
    Screen.fill(color);
    Screen.noStroke();
    Screen.setStrokeGradientInner(new Color(255, 255, 50), color,
      {x: x1_, y: y1_}, {x: x2_, y: y2_},
      4, this.colorGrad.value, .05);
    Screen.strokeWeight(size);
    // Screen.line(x1_, y1_, x2_, y2_);
    if(isPoint) {
      Screen.curve([
        P(x1_, y1_),
        P(x1_+32, y1_),
        P(x2_-32, y2_),
        P(x2_, y2_)
      ]);
    }
  }
}
