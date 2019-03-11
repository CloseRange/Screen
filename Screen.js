
var Screen = {
  fps: 30,
  bgcolor: null,
  mouse: {x: 0, y: 0,
    left: {pressed: false, released: false, down: false},
    right: {pressed: false, released: false, down: false},
    middle: {pressed: false, released: false, down: false},
    reset: function() {
      Screen.mouse.left.pressed = false;
      Screen.mouse.left.released = false;
      Screen.mouse.right.pressed = false;
      Screen.mouse.right.released = false;
      Screen.mouse.middle.pressed = false;
      Screen.mouse.middle.released = false;
      Screen.mouse.wheel.up = false;
      Screen.mouse.wheel.down = false;

    },
    wheel: {
      up: false,
      down: false
    }
  },
  init: function() {

    Screen.paper = document.createElement("CANVAS");
    document.body.appendChild(Screen.paper);
    Screen.pen = Screen.paper.getContext('2d');
    window.onresize = function() {
      Screen.width = window.innerWidth;
      Screen.height = window.innerHeight;
      Screen.paper.width = Screen.width;
      Screen.paper.height = Screen.height;
      Screen.paper.style.top = "0px";
      Screen.paper.style.left = "0px";
      Screen.paper.style.position = "absolute";
      draw_iterator();
    }
    Screen.background(0);
    window.onresize();
    Screen.paper.onmousemove = function(event) {
      Screen.mouse.x = event.clientX;
      Screen.mouse.y = event.clientY;
    }
    Screen.paper.onmousedown = function(event) {
      var b = Screen.mouse.left;
      if(event.button == 1) b = Screen.mouse.middle;
      if(event.button == 2) b = Screen.mouse.right;
      b.pressed = true;
      b.down = true;
    }
    Screen.paper.onmouseup = function(event) {
      var b = Screen.mouse.left;
      if(event.button == 1) b = Screen.mouse.middle;
      if(event.button == 2) b = Screen.mouse.right;
      b.released = true;
      b.down = false;
    }
    Screen.paper.onwheel = function(event) {
      if(event.wheelDeltaY > 0) {
        Screen.mouse.wheel.up = true;
      } else if(event.wheelDeltaY < 0) {
        Screen.mouse.wheel.down = true;
      }
    }
    document.addEventListener("contextmenu", function(e){
      e.preventDefault();
    }, false);
    Screen.paper.onContextMenu = function() {return false;}
    Screen.backgroundDraw(0, 0, 0, 255);
    Screen.fill(255, 255, 255);
    Screen.rect(0, 0, 32, 32);
    delete Screen.init;
  },
  fontSize: 30,
  font: "Arial",
  textAlign: {
    h: 0,
    v: 0
  },
  drawText: function(x, y, t) {
    Screen.pen.font = Screen.fontSize + "px " + Screen.font;
    if(Screen.textAlign.h == -1)
      Screen.pen.textAlign = "left";
    if(Screen.textAlign.h == 0)
      Screen.pen.textAlign = "center";
    if(Screen.textAlign.h == 1)
      Screen.pen.textAlign = "right";
    var h = Screen.fontSize;
    Screen.pen.fillText(t, x, y +h*(2 - (Screen.textAlign.v+1))/2);
    Screen.pen.strokeText(t, x, y +h*(2 - (Screen.textAlign.v+1))/2);
  },
  strokeWeight: function(w) {
    Screen.pen.lineWidth = w;
  },
  background: function(r, g, b, a) {
    if(r != undefined)
      Screen.bgcolor = new Color(r, g, b, a);
  },
  backgroundDraw: function() {
    Screen.fill(Screen.bgcolor);
    Screen.noStroke();
    Screen.rect(0, 0, Screen.width, Screen.height);
  },
  fill: function(r, g, b, a) {
    var c = new Color(r, g, b, a);
    Screen.pen.fillStyle = c.string();
  },
  stroke: function(r, g, b, a) {
    var c = new Color(r, g, b, a);
    Screen.pen.strokeStyle = c.string();
  },
  noStroke: function() {Screen.stroke(0, 0, 0, 0)},
  noFill: function() {Screen.fill(0, 0, 0, 0)},
  rect: function(x, y, w, h) {
    Screen.pen.fillRect(x, y, w, h);
    Screen.pen.strokeRect(x, y, w, h);
  },
  makeRoundRectDimensions: function(tl, tr, bl, br) {
    return {
      top: {
        left: tl, right: tr
      },
      bot: {
        left: bl, right: br
      }
    }
  },
  roundRect: function(x, y, w, h, rad) {
    if(typeof rad === 'number') var r = Screen.makeRoundRectDimensions(rad, rad, rad, rad);
    else r = rad;
    Screen.pen.beginPath();
    Screen.pen.moveTo(x+r.top.left, y);
    Screen.pen.lineTo(x+w-r.top.right, y);
    Screen.pen.quadraticCurveTo(x+w, y, x+w, y+r.top.right);
    Screen.pen.lineTo(x+w, y+h-r.bot.right);
    Screen.pen.quadraticCurveTo(x+w, y+h, x+w-r.bot.right, y+h);
    Screen.pen.lineTo(x+r.bot.left, y+h);
    Screen.pen.quadraticCurveTo(x, y+h, x, y+h-r.bot.left);
    Screen.pen.lineTo(x, y+r.top.left);
    Screen.pen.quadraticCurveTo(x, y, x+r.top.left, y);
    Screen.pen.closePath();
    Screen.pen.fill();
    Screen.pen.stroke();
  },
  line: function(x1, y1, x2, y2) {
    // console.log(x1, y1, x2, y2)
    Screen.pen.beginPath();
    Screen.pen.moveTo(x1, y1);
    Screen.pen.lineTo(x2, y2);
    Screen.pen.stroke();
  },
  drawImage: function(x, y, img) {
    if(!img.hasLoaded) return false;
    Screen.pen.drawImage(img, x, y);
    var r = {
      x, y,
      x1: x, y1: y,
      width: img.width, height: img.height,
      x2: x+img.width, y2: y+img.height
    };
    return r;
  },
  getImage: function(x, y, img) {
    if(!img.hasLoaded) return false;
    var r = {
      x, y,
      x1: x, y1: y,
      width: img.width, height: img.height,
      x2: x+img.width, y2: y+img.height
    };
    return r;
  },
  size: function(relative, scale, orientation) {
    var r = { relative, scale, orientation };
    r.getScale = function(width, height) {
      if(this.relative) {
        if(this.orientation == Screen.WIDTH) {
          return this.scale *Screen.width / width;
        } else {
          return this.scale *Screen.height / height;
        }
      } else return this.scale;
    }
    r.getWidth = function(width, height) {
      if(r.relative instanceof Number) return r.relative
      if(this.relative) {
        return this.getScale(width, height) * width;
      } else return this.scale * width;
    }
    r.getHeight = function(width, height) {
      if(r.relative instanceof Number) return r.relative
      if(this.relative) {
        return this.getScale(width, height) * height;
      } else return this.scale * height;
    }
    return r;
  },
  drawImageExt: function(x, y, img, size, rotation, corner) {
    if(!img.hasLoaded) return false;
    var w = size.getWidth(img.width, img.height);
    var h = size.getHeight(img.width, img.height);
    Screen.pen.save();
    Screen.pen.translate(x, y);
    Screen.pen.rotate(rotation * Math.PI / 180 );
    Screen.pen.translate(-w/2, -h/2);
    Screen.pen.drawImage(img, 0, 0, w, h);
    Screen.pen.restore();
  },
  drawImageSized: function(x, y, img, width, height) {
    if(!img.hasLoaded) return false;
    Screen.pen.drawImage(img, x, y, width, height);
  },
  drawImageScale: function(x, y, img, scale, Orientation) {
    if(!img.hasLoaded) return false;
    var preS = img.width;
    if(Orientation == Screen.HEIGHT) preS = img.height;
    var sc = scale*Screen.width / preS;
    if(Orientation == Screen.HEIGHT) sc = scale*Screen.height / preS;
    Screen.pen.drawImage(img, x-sc*img.width/2, y-sc*img.height/2, sc*img.width, sc*img.height);
    var r = {};
    r.x = x-sc*img.width/2;
    r.y = y-sc*img.height/2;
    r.width = sc*img.width;
    r.height = sc*img.height;
    r.x1 = r.x;
    r.y1 = r.y;
    r.x2 = r.x1 + r.width;
    r.y2 = r.y1 + r.height;
    return r;
  },
  getImageScale: function(x, y, img, scale, Orientation) {
    if(!img.hasLoaded) return false;
    var preS = img.width;
    if(Orientation == Screen.HEIGHT) preS = img.height;
    var sc = scale*Screen.width / preS;
    if(Orientation == Screen.HEIGHT) sc = scale*Screen.height / preS;
    var r = {};
    r.x = x-sc*img.width/2;
    r.y = y-sc*img.height/2;
    r.width = sc*img.width;
    r.height = sc*img.height;
    r.x1 = r.x;
    r.y1 = r.y;
    r.x2 = r.x1 + r.width;
    r.y2 = r.y1 + r.height;
    return r;
  },
  curve: function(points) {
    Screen.pen.beginPath();
    Screen.pen.moveTo(points[0].x, points[0].y);
    for(var i=1; i<points.length-2; i++) {
      var xc = (points[i].x + points[i + 1].x) / 2;
      var yc = (points[i].y + points[i + 1].y) / 2;
      Screen.pen.quadraticCurveTo(points[i].x, points[i].y, xc, yc);
    }
    Screen.pen.quadraticCurveTo(points[i].x, points[i].y, points[i+1].x,points[i+1].y);
    Screen.pen.stroke();
  },
  circle: function(x, y, r) {
    Screen.arc(x, y, r, 0, 2*Math.PI);
  },
  arc: function(x, y, r, a1, a2) {
    Screen.pen.beginPath();
    Screen.pen.arc(x, y, r, a1, a2);
    Screen.pen.fill();
    Screen.pen.stroke();
  },
  setStrokeGradient: function(col1, col2, coord1, coord2, cstop, cstop2) {
    cstop = cstop || 0;
    cstop2 = cstop2 || 1;
    coord1 = coord1 || {x: 50, y: 50};
    coord2 = coord2 || {x: 150, y: 150};
    var grad = Screen.pen.createLinearGradient(coord1.x, coord1.y, coord2.x, coord2.y);
    grad.addColorStop(cstop, col1.string());
    grad.addColorStop(cstop2, col2.string());
    Screen.pen.strokeStyle = grad;
  },
  setStrokeGradientInner: function(col1, col2, coord1, coord2, stopN, stopInner, space) {
    var grad = Screen.pen.createLinearGradient(coord1.x, coord1.y, coord2.x, coord2.y);
    // var d = point_distance(coord1.x, coord1.y, coord2.x, coord2.y) / stopN;
    var d = 1/stopN;
    for(var i=0; i<stopN; i++) {
      var st_middle = i*d + d*stopInner;
      var st_left = st_middle - space;
      var st_right = st_middle + space;
      if(st_left >= 0 && st_left <= 1)
        grad.addColorStop(st_left, col2.string());
      if(st_middle >= 0 && st_middle <= 1)
        grad.addColorStop(st_middle, col1.string());
      if(st_right >= 0 && st_right <= 1)
        grad.addColorStop(st_right, col2.string());
    }
    Screen.pen.strokeStyle = grad;
  },
  WIDTH: 0,
  HEIGHT: 1
};
class Color {
  constructor(r, g, b, a) {
    if(r instanceof Color) {
      this.r = r.r;
      this.g = r.g;
      this.b = r.b;
      this.a = r.a;
    } else {
      this.r = toDefault(r, 255);
      this.g = toDefault(g, this.r);
      this.b = toDefault(b, this.r);
      this.a = toDefault(a, 1);
    }
  }
  string() {
    return "rgba(" + this.r + "," + this.g + "," + this.b + "," + this.a + ")";
  }
};
function toDefault(base, def) {
  if(base == undefined || base == null) return def;
  return base;
}

var object_drawables = [];
function drawable(o) {
  object_drawables.push(o);
}
function fullDeleteDrawable(obj) {
  for(var i=0; i<object_drawables.length; i++) {
    if(object_drawables[i] == obj) {
      var o = object_drawables[i];
      object_drawables.splice(i, 1);
    }
  }
}
function deleteDrawable(obj) {
  obj.TIME_TO_DELETE = true;
}
function clearData(obj) {
  for(var i in object_drawables)
    if(object_drawables[i] == obj) {
      object_drawables.splice(i);
      return;
    }
}

var Cursor = {
  image: null,
  show: false,
  center: false,
  size: 32,
  draw() {
    if(Cursor.show) {
      var of = 0;
      if(Cursor.center)
        of = -Cursor.size/2;
      Screen.drawImageSized(Screen.mouse.x+of, Screen.mouse.y+of, Cursor.image, Cursor.size, Cursor.size);
    }
  },
  set(t, center) {
    if(!t) return;
    Cursor.image = t;
    Cursor.center = center;
    Cursor.show = true;
  }
}
function frame_iterator() {
  step_iterator();
  draw_iterator();
  Cursor.draw();
  Screen.mouse.reset();
}
function step_iterator() {
  for(var i=0; i<object_drawables.length; i++)
    if(object_drawables[i].TIME_TO_DELETE) fullDeleteDrawable(object_drawables[i]);
  for(var i=0; i<object_drawables.length; i++)
    if(object_drawables[i].beginLoop) object_drawables[i].beginLoop();
  for(var i=0; i<object_drawables.length; i++)
    if(object_drawables[i].beginStep) object_drawables[i].beginStep();
  for(var i=0; i<object_drawables.length; i++)
    if(object_drawables[i].step) object_drawables[i].step();
  for(var i=0; i<object_drawables.length; i++)
    if(object_drawables[i].endStep) object_drawables[i].endStep();
}
function draw_iterator() {
  Screen.backgroundDraw();
  for(var i=0; i<object_drawables.length; i++)
    if(object_drawables[i].beginDraw) object_drawables[i].beginDraw();
  for(var i=0; i<object_drawables.length; i++)
    if(object_drawables[i].draw) object_drawables[i].draw();
  for(var i=0; i<object_drawables.length; i++)
    if(object_drawables[i].endDraw) object_drawables[i].endDraw();
  for(var i=0; i<object_drawables.length; i++)
    if(object_drawables[i].beginGui) object_drawables[i].beginGui();
  for(var i=0; i<object_drawables.length; i++)
    if(object_drawables[i].gui) object_drawables[i].gui();
  for(var i=0; i<object_drawables.length; i++)
    if(object_drawables[i].endGui) object_drawables[i].endGui();
  for(var i=0; i<object_drawables.length; i++)
    if(object_drawables[i].endLoop) object_drawables[i].endLoop();
}
Screen.init();

var image = {};
var list = [];
function addImage(name, func) {
  var x = document.createElement("IMG");
  x.src = name;
  x.func_end = func || function() {};
  x.crossOrigin = "Anonymous";
  x.onload = function() {
    this.func_end();
    this.hasLoaded = true;
  }
  x.hasLoaded = false;
  image[name] = x;
  list.push(x);
  return x;
}
const times = [];
function refreshLoop() {
  frame_iterator();
  window.requestAnimationFrame(() => {
    const now = performance.now();
    while (times.length > 0 && times[0] <= now - 1000) {
      times.shift();
    }
    times.push(now);
    Screen.fps = times.length;
    refreshLoop();
  });
}
refreshLoop();
class Entity {
  constructor() {
    drawable(this);
  }
  destroy() {
    deleteDrawable(this);
  }
}


document.documentElement.style.overflow = 'hidden';  // firefox, chrome
document.body.scroll = "no"; // ie only
