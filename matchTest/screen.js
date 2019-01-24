
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
    document.addEventListener("contextmenu", function(e){
      e.preventDefault();
    }, false);
    Screen.paper.onContextMenu = function() {return false;}
    Screen.backgroundDraw(0, 0, 0, 255);
    Screen.fill(255, 255, 255);
    Screen.rect(0, 0, 32, 32);
    delete Screen.init;
  },
  text: function(text, x, y) {
    Screen.pen.font = "60px Arial";
    Screen.pen.fillText(text, x, y+60);
    // Screen.pen.strokeText(text, x, y);
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
  drawImageScale: function(x, y, img, scale, Orientation) {
    if(!img.hasLoaded) return false;
    var preS = img.width;
    if(Orientation == Screen.HEIGHT) preS = img.height;
    var sc = scale*Screen.width / preS;
    if(Orientation == Screen.HEIGHT) sc = scale*Screen.height / preS;
    Screen.pen.drawImage(img, x, y, sc*img.width, sc*img.height);
    var r = {};
    r.x = x;
    r.y = y;
    r.width = sc*img.width;
    r.height = sc*img.height;
    r.x1 = x;
    r.y1 = y;
    r.x2 = x + r.width;
    r.y2 = y + r.height;
    return r;
  },
  getImageScale: function(x, y, img, scale, Orientation) {
    if(!img.hasLoaded) return false;
    var preS = img.width;
    if(Orientation == Screen.HEIGHT) preS = img.height;
    var sc = scale*Screen.width / preS;
    if(Orientation == Screen.HEIGHT) sc = scale*Screen.height / preS;
    var r = {};
    r.x = x;
    r.y = y;
    r.width = sc*img.width;
    r.height = sc*img.height;
    r.x1 = x;
    r.y1 = y;
    r.x2 = x + r.width;
    r.y2 = y + r.height;
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

function deleteDrawable(obj) {
  for(var i=0; i<object_drawables.length; i++) {
    if(object_drawables[i] == obj) {
      var o = object_drawables[i];
      object_drawables.splice(i, 1);
      delete o;
    }
  }
}
function clearData(obj) {
  for(var i in object_drawables)
    if(object_drawables[i] == obj) {
      object_drawables.splice(i);
      return;
    }
}
function frame_iterator() {
  step_iterator();
  draw_iterator();
  Screen.mouse.reset();
}
function step_iterator() {
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
}
Screen.init();

var image = {};
var list = [];
function addImage(name, func) {
  var x = document.createElement("IMG");
  x.src = name;
  x.func_end = func || function() {};

  x.onload = function() {
    this.func_end();
    this.hasLoaded = true;
  }
  x.hasLoaded = false;
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

document.documentElement.style.overflow = 'hidden';  // firefox, chrome
document.body.scroll = "no"; // ie only
