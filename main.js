class test {
  constructor() {
    this.x = 0;
    this.y = 0;
    this.size = 32;
    this.img = addImage("img.jpg", function() {console.log("Hello");});
    drawable(this);
  }
  step() {
    // this.x += 2;
    // this.y += 2;
  }
  draw() {
    var c = new Color(255, 0, 0);
    Screen.fill(c);
    // Screen.rect(this.x, this.y, this.size, this.size);
    Screen.drawImageScale(this.x, this.y, this.img, .50, Screen.WIDTH);
  }
}
var t = new test();
