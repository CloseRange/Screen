var buttonHov = false;
var buttonImages = {
  hand: addImage("src/hand.png"),
  and: addImage("src/and.png")
};
class button {
  constructor(x, y, img, f) {
    this.x = x;
    this.y = y;
    this.img = img;
    this.scale = .1;
    this.f = f;
    drawable(this);
  }
  beginDraw() {
    var w = Screen.width * this.scale;
    var h = this.img.height / this.img.width * w;
    var bbox = Screen.getImageScale(this.x*w+w/2, this.y*h+h/2, this.img, this.scale, Screen.WIDTH);
    var inside = mouseBox(bbox.x1, bbox.y1, bbox.x2, bbox.y2);
    Screen.drawImageScale(this.x*w+w/2, this.y*h+h/2, this.img, this.scale+(this.scale*.1*inside), Screen.WIDTH);
    buttonHov = inside || buttonHov;
    if(Screen.mouse.left.released && inside) {
      this.f();
    }
  }
  endGui() {
    buttonHov = false;
  }
}
new button(0, 0, buttonImages.hand, function() {tool.current = tool.edit})
new button(1, 0, buttonImages.and, function() {tool.current = tool.gates; tool.sub = tool.gateType.and})
