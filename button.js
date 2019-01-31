var superHighlight = false;
class button {
  constructor(dx, dy, w, h) {
    this.x = dx;
    this.y = dy;
    this.w = w;
    this.h = h;
    this.isHover = false;
    drawable(this);
  }
  step() {
    this.isHover = false;
    if(Screen.mouse.x > this.x && Screen.mouse.x < this.x+this.w) {
      if(Screen.mouse.y > this.y && Screen.mouse.y < this.y+this.h) {
        this.isHover = true;
      }
    }
    if(this.isHover && Screen.mouse.left.pressed) {
      this.toRun();
    }
  }
  toRun() {}
}
class option extends button {
  constructor(parent, ind, text, action) {
    super(0, 0, 1, 1);
    this.parent = parent;
    this.ind = ind/2 + .5;
    this.x = parent.x-parent.width/2;
    this.y = parent.y-parent.height/2 - (grid.size*this.ind);
    this.h = grid.size*.75/2;
    this.w = parent.width;
    tool.inMenu = true;
    this.color = {
      normal: new Color(255, 255, 255),
      hover: new Color(200, 200, 255),
      text: new Color(0, 0, 0)
    }
    this.text = text;
    this.action = action;
  }
  inBox() {
    return mouseBox(this.x, this.y, this.x+this.w, this.y+this.h);
  }
  draw() {
    var sizes = getSizes(this.parent);
    this.w = Math.max(sizes.width, sizes.height);
    this.x = this.parent.x-this.w/2;
    this.y = this.parent.y-sizes.height/2 - (grid.size*this.ind);
    var p = getPosition(this.x, this.y);
    Screen.fill(this.color.normal);
    Screen.noStroke();
    if(this.inBox()) {
      Screen.fill(this.color.hover);
    }
    Screen.roundRect(p.x, p.y, this.w, this.h, this.h/2);
    if(!this.text) return;
    Screen.fill(this.color.text);
    Screen.textAlign.v = 0;
    Screen.textAlign.h = 0;
    Screen.fontSize = this.h*.9;
    // Screen.drawText(25, 25, this.text);
    Screen.drawText(p.x+this.w/2, p.y+this.h/2, this.text);
  }
  endStep() {
    if(Screen.mouse.left.pressed || Screen.mouse.right.pressed) {
      if(this.inBox()) {
        if(this.action) this.action();
      }
      if(superHighlight) return;
      tool.inMenu = false
      deleteDrawable(this);
      delete this;
    }
  }
}
class optionGrow extends option {
  constructor(parent) {
    super(parent, 0, "", null);
    this.color = {
      normal: new Color(25, 255, 100),
      hover: new Color(0, 175, 50),
      text: new Color(0, 0, 0)
    }
    this.adit = -1;
    this.topLine = true;
    this.action = function() {
      this.parent.resize(this.parent.size+1);
    }
  }
  inBox() {
    return mouseBox(this.x, this.y, this.x+this.w, this.y+this.h);
  }
  step() {
    if(this.inBox()) {
      superHighlight = true;
    }
  }
  draw() {
    var sizes = getSizes(this.parent);
    this.h = grid.size/2;
    this.w = this.h;
    this.x = this.parent.x+this.adit*this.h-this.w/2;
    this.y = this.parent.y-sizes.height/2 - (grid.size*this.ind);
    var p = getPosition(this.x, this.y);
    Screen.fill(this.color.normal);
    Screen.noStroke();
    if(this.inBox()) {
      Screen.fill(this.color.hover);
    }
    Screen.stroke(0);
    // Screen.roundRect(p.x, p.y, this.w, this.h, this.h/2);
    Screen.circle(p.x+this.w/2, p.y+this.h/2, this.h/2);
    Screen.noFill();
    Screen.strokeWeight(3);
    var s= this.h;
    var pad = s * 1/4;
    Screen.line(p.x+pad, p.y+s/2, p.x+s-pad, p.y+s/2);
    if(this.topLine) Screen.line(p.x+s/2, p.y+pad, p.x+s/2, p.y+s-pad);
  }
}
class optionShrink extends optionGrow{
  constructor(parent, action) {
    super(parent, action);
    this.color = {
      normal: new Color(255, 25, 100),
      hover: new Color(175, 0, 50),
      text: new Color(0, 0, 0)
    }
    this.adit = 1;
    this.topLine = false;
    this.action = function() {
      this.parent.resize(this.parent.size-1);
    }
  }
}
