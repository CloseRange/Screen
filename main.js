class test {
  constructor() {
    this.img = addImage("img.jpg", function() {console.log("Hello");});
    drawable(this);
  }
  step() {
    if(Screen.mouse.left.pressed)
      new drop(Screen.mouse.x-16, Screen.mouse.y-16);
  }
  draw() {
    var r = Screen.drawImageScale(0, 0, this.img, .50, Screen.WIDTH);
    Screen.drawImageScale(r.x2, 0, this.img, .50, Screen.HEIGHT);
    var color = new Color(255, 255, 255);
    Screen.fill(color);
    Screen.stroke(255, 0, 0);
    Screen.rect(Screen.mouse.x-16, Screen.mouse.y-16, 32, 32);
    Screen.fill(0);
    Screen.circle(Screen.mouse.x, Screen.mouse.y, 8);
    if(Screen.mouse.left.pressed)
      new drop(Screen.mouse.x-16, Screen.mouse.y-16);
    if(Screen.mouse.right.down)
      Screen.background(0, 0, 255);
    else Screen.background(0);
  }
}

class drop {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    drawable(this);
  }
  draw() {
    Screen.fill(255, 0, 0);
    Screen.rect(this.x, this.y, 32, 32);
  }
}


new test();
