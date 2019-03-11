var CUR = {};
var window_controller = {
  list: [],
  lockLeft: null,
  lockRight: null,
  lockDown: null,
  draw() {
    if(Screen.mouse.left.pressed) {
      var mx = Screen.mouse.x;
      var my = Screen.mouse.y;
      for(var i=window_controller.list.length-1; i>=0; i--) {
        var w = window_controller.list[i];
        if(mx > w.x && my > w.y && mx < w.x+w.w && my < w.y+w.h) {
          window_controller.focus = w;
          if(!w.core) {
            window_controller.list.splice(i, 1);
            window_controller.list.push(w);
          }
          i = -1;
        }
      }
    }
    Cursor.set(CUR.normal);
    for(var i=0; i<window_controller.list.length; i++) {
      var w = window_controller.list[i];
      if(!w.visible) continue;
      w.coreDraw();
      Screen.pen.save();
      Screen.pen.translate(w.x, w.y+window_controller.titleH);
      w.beginStep();
      w.step();
      w.endStep();
      w.beginDraw();
      w.draw();
      w.endDraw();
      Screen.pen.restore();
    }
  },
  rad: 3,
  off: 5,
  titleH: 32,
  focus: null,
  maxW: 150,
  maxH: 100,
  scaleS: 10,
  lockDistance: 64
}
drawable(window_controller);

class Window {
  constructor(x, y, w, h) {
    this.core = false;
    this.visible = true;
    this.x = x;
    this.y = y;
    this.w = w || 100;
    this.h = h || 100;
    this.entityList = [];
    this.bg = new Color(225, 225, 225);
    this.topColor = new Color(175, 175, 255);
    this.topColorS = new Color(100, 100, 225);
    this.title = "";
    this.lastX = x;
    this.lastY = y;
    this.lastW = w;
    this.lastH = h;
    this.lastMX= 0;
    this.lastMY= 0;
    this.moving = false;
    this.scalingW = 0;
    this.scalingH = 0;
    this.beforeLock = { x, y, w, h };
    window_controller.list.push(this);
    window_controller.focus = this;
  }
  push(o) { this.entityList.push(o); }
  Title(t) {
    this.title = t;
    return this;
  }
  coreDraw() {
    if(this.core) {
      this.x = 0;
      this.y = 0;
      this.w = Screen.width;
      this.h = Screen.height;
    }

    if(!this.core && Screen.mouse.left.pressed && (window_controller.focus == this || window_controller.focus == MWINDOW)) {
      var mx = Screen.mouse.x;
      var my = Screen.mouse.y;
      if(my > this.y && my < this.y + this.h)
      if(mx > this.x + this.w - window_controller.scaleS && mx < this.x + this.w + window_controller.scaleS) {
        this.scalingW = 1;
        this.lastX = this.w;
        this.lastMX = mx;
      }
      if(mx > this.x && mx < this.x + this.w)
      if(my > this.y + this.h - window_controller.scaleS && my < this.y + this.h + window_controller.scaleS) {
        this.scalingH = 1;
        this.lastY = this.h;
        this.lastMY = my;
      }
      if(my > this.y && my < this.y + this.h)
      if(mx > this.x - window_controller.scaleS && mx < this.x + window_controller.scaleS) {
        this.scalingW = -1;
        this.lastX = this.x;
        this.lastW = this.w;
        this.lastMX = mx;
      }
      if(mx > this.x && mx < this.x + this.w)
      if(my > this.y  - window_controller.scaleS && my < this.y  + window_controller.scaleS) {
        this.scalingH = -1;
        this.lastY = this.y;
        this.lastH = this.h;
        this.lastMY = my;
      }
      if(this.scalingW == 0 && this.scalingH == 0) {
        if(mx > this.x && my > this.y && mx < this.x+this.w && my < this.y+window_controller.titleH) {
          this.moving = true;
          this.lastX = this.x;
          this.lastY = this.y;
          this.lastMX = mx;
          this.lastMY = my;
        }
      }
    }
    if(this.scalingW == 1) {
      this.w = this.lastX - this.lastMX + Screen.mouse.x;
      Cursor.set(CUR.scale, true);
    }
    if(this.scalingH == 1) {
      this.h = this.lastY - this.lastMY + Screen.mouse.y;
      Cursor.set(CUR.scale, true);
    }
    if(this.scalingW == -1) {
      this.x = this.lastX - this.lastMX + Screen.mouse.x;
      this.x = Math.min(this.x, this.lastX+this.lastW-window_controller.maxW);
      this.w = this.lastW + this.lastMX - Screen.mouse.x;
      Cursor.set(CUR.scale, true);
    }
    if(this.scalingH == -1) {
      this.y = this.lastY - this.lastMY + Screen.mouse.y;
      this.y = Math.min(this.y, this.lastY+this.lastH-window_controller.maxH);
      this.h = this.lastH + this.lastMY - Screen.mouse.y;
      Cursor.set(CUR.scale, true);
    }
    if(this.moving) {
      Cursor.set(CUR.move, true);
      this.x = this.lastX - this.lastMX + Screen.mouse.x;
      this.y = this.lastY - this.lastMY + Screen.mouse.y;
      Screen.fill(255, 255, 255, .25);
      Screen.noStroke();
      if(window_controller.lockRight == this) {
        this.w = this.beforeLock.w;
        this.h = this.beforeLock.h;
        this.x = Screen.mouse.x - this.w/2;
        this.y = Screen.mouse.y - window_controller.titleH/2;
        this.lastX = this.x;
        this.lastY = this.y;
        window_controller.lockRight = null;
      }
      if(window_controller.lockRight == null && Screen.mouse.x > Screen.width - window_controller.lockDistance) {
        Screen.rect(Screen.width - this.w, 0, this.w, Screen.height);
        if(Screen.mouse.left.released) {
          this.beforeLock = {x: this.x, y: this.y, w: this.w, h: this.h};
          this.x = Screen.width - this.w;
          window_controller.lockRight = this;
        }
      }
      if(window_controller.lockLeft == this) {
        this.w = this.beforeLock.w;
        this.h = this.beforeLock.h;
        this.x = Screen.mouse.x - this.w/2;
        this.y = Screen.mouse.y - window_controller.titleH/2;
        this.lastX = this.x;
        this.lastY = this.y;
        window_controller.lockLeft = null;
      }
      if(window_controller.lockLeft == null && Screen.mouse.x < window_controller.lockDistance) {
        Screen.rect(0, 0, this.w, Screen.height);
        if(Screen.mouse.left.released) {
          this.beforeLock = {x: this.x, y: this.y, w: this.w, h: this.h};
          this.x = 0;
          window_controller.lockLeft = this;
        }
      }
      if(window_controller.lockDown == this) {
        this.w = this.beforeLock.w;
        this.h = this.beforeLock.h;
        this.x = Screen.mouse.x - this.w/2;
        this.y = Screen.mouse.y - window_controller.titleH/2;
        this.lastX = this.x;
        this.lastY = this.y;
        window_controller.lockDown = null;
      }
      if(window_controller.lockDown == null && Screen.mouse.y > Screen.height - window_controller.lockDistance) {
        Screen.rect(0, Screen.height - this.h, Screen.width, this.h);
        if(Screen.mouse.left.released) {
          this.beforeLock = {x: this.x, y: this.y, w: this.w, h: this.h};
          this.y = Screen.height - this.h;
          window_controller.lockDown = this;
        }
      }
    }
    if(Screen.mouse.left.released) {
      this.scalingW = 0;
      this.scalingH = 0;
      this.moving = false;
    }
    if(window_controller.lockRight == this) {
      this.y = window_controller.titleH;
      var off = 0;
      if(window_controller.lockDown != null) off = window_controller.lockDown.h;
      this.h = Screen.height - window_controller.titleH - off;
      this.w = Screen.width - this.x;
    }
    if(window_controller.lockLeft == this) {
      this.y = window_controller.titleH;
      var off = 0;
      if(window_controller.lockDown != null) off = window_controller.lockDown.h;
      this.h = Screen.height - window_controller.titleH - off;
      this.x = 0;
    }
    if(window_controller.lockDown == this) {
      this.x = 0;
      this.w = Screen.width;
      this.h = Screen.height - this.y;
      // this.w = Screen.width - this.x;
    }
    this.w = Math.max(this.w, window_controller.maxW);
    this.h = Math.max(this.h, window_controller.maxH);

    Screen.fill(0, 0, 0, .5);
    Screen.stroke(0, 0, 0, .5);
    Screen.strokeWeight(3);
    Screen.roundRect(this.x+window_controller.off, this.y+window_controller.off, this.w, this.h, window_controller.rad);
    Screen.stroke(255);
    Screen.fill(this.bg);
    Screen.roundRect(this.x, this.y, this.w, this.h, window_controller.rad);
    // Screen.noStroke();
    Screen.stroke(255);
    Screen.fill(this.topColor);
    if(window_controller.focus == this) Screen.fill(this.topColorS);
    Screen.rect(this.x, this.y, this.w, window_controller.titleH);
  }
  beginDraw() { for(var i=0; i<this.entityList.length; i++) if(this.entityList[i].beginDraw) this.entityList[i].beginDraw(); }
  draw() { for(var i=0; i<this.entityList.length; i++) if(this.entityList[i].draw) this.entityList[i].draw(); }
  endDraw() { for(var i=0; i<this.entityList.length; i++) if(this.entityList[i].endDraw) this.entityList[i].endDraw(); }
  beginStep() { for(var i=0; i<this.entityList.length; i++) if(this.entityList[i].beginStep) this.entityList[i].beginStep(); }
  step() { for(var i=0; i<this.entityList.length; i++) if(this.entityList[i].step) this.entityList[i].step(); }
  endStep() { for(var i=0; i<this.entityList.length; i++) if(this.entityList[i].endStep) this.entityList[i].endStep(); }
}
class Window_Entity {
  constructor(wind) {
    wind.push(this);
    this.wind = wind;
  }
  destroy() {
    for(var i=0; i<this.wind.entityList.length; i++) {
      var o = this.wind.entityList[i];
      if(o == this) {
        return this.wind.entityList[i].splice(i, 1);
      }
    }
  }
}
var MWINDOW = new Window(0, 0, 600, 600);
MWINDOW.core = true;
