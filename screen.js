
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
  drawImage: function(x, y, img) {
    if(!img.hasLoaded) return false;
    Screen.pen.drawImage(img, x, y);
    return true;
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
  circle: function(x, y, r) {
    Screen.arc(x, y, r, 0, 2*Math.PI);
  },
  arc: function(x, y, r, a1, a2) {
    Screen.pen.beginPath();
    Screen.pen.arc(x, y, r, a1, a2);
    Screen.pen.fill();
    Screen.pen.stroke();
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
// var x = document.createElement("IMG");
// x.src = "img.jpg";
// x.onload = function() {
//   Screen.fill(255, 0, 0);
//   Screen.rect(0, 0, 32, 32);
//   Screen.pen.drawImage(x, 0, 0)
// }
//
