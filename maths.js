var IMG = {
  add_: function(nm) {
    IMG[nm] = {
      norm: addImage("https://www.autodesk.com/products/eagle/blog/wp-content/uploads/2017/05/289e31df9466c97c8b91c278aec35427.jpg"),//"src/" + nm + ".png"),
      sel: addImage("https://www.autodesk.com/products/eagle/blog/wp-content/uploads/2017/05/289e31df9466c97c8b91c278aec35427.jpg"),//"src/" + nm + "S.png")
    }
  }
};
function clamp(val, min, max) {
  return Math.max(Math.min(val, max), min);
}
function mouseBox(x1, y1, x2, y2) {
  var mx = Screen.mouse.x;

  var my = Screen.mouse.y;
  x1 += grid.x;
  y1 += grid.y;
  x2 += grid.x;
  y2 += grid.y;

  return mx > x1 && mx < x2 && my > y1 && my < y2;
}
function point(x, y) {
  return {x, y,
    getReal() {
      return point(x+grid.x, y+grid.y)
    }
  };
}
function getPosition(x, y) {
  return point(x+grid.x, y+grid.y);
}
function getSizes(node) {
  var w = node.width;
  var h = node.height;
  if(node.dir == DIR.up || node.dir == DIR.down) {
    w = node.height;
    h = node.width;
  }
  return {width: w, height: h};
}
function getStartEdge(node, dir) {
  var size = getSizes(node);
  var diB = getDirectionIntegration(dir);
  var di = getDirectionIntegration(dir);
  di = getRotatedDirectionIntegration(di);
  di = getInvertedDirectionIntegration(di);
  return point(node.x + di.x*size.width/2 - diB.x*size.width/2, node.y+ di.y*size.height/2 - diB.y*size.height/2);
  // return point(node.x-w/2, node.y-h/2);
}
function addDIR(d1, d2, d3, ect) {
  var dn = 0;
  for(var i=0; i<arguments.length; i++) {
    dn += arguments[i];
  }
  while(dn >= 4) dn -= 4;
  while(dn < 0) dn += 4;
  return dn;
}
function point_distance(x1, y1, x2, y2) {
  return Math.sqrt(Math.pow(x2-x1, 2) + Math.pow(y2-y1, 2))
}
function getDirectionIntegration(dir) {
  var dx = 0;
  var dy = 0;
  if(dir == DIR.right || dir == DIR.left) {
    if(dir == DIR.right) {
      dy = -1;
    } else {
      dy = 1;
    }
  }
  if(dir == DIR.up || dir == DIR.down) {
    if(dir == DIR.up) {
      dx = -1;
    } else {
      dx = 1;
    }
  }
  return point(dx, dy);
}
function getRotatedDirectionIntegration(norm) {
  return point(norm.y, -norm.x)
}
function getInvertedDirectionIntegration(norm) {
  return point(-norm.x, -norm.y)
}
function applyTranslation(x, y, trans, dir, node) {
  var sizes = getSizes(node);
  var w = sizes.width;
  var h = sizes.height;
  var s = grid.size;
  var di = getDirectionIntegration(dir);
  var diR = getRotatedDirectionIntegration(di);
  var dx = x + trans.cell*di.x*s + trans.offsetCIN*diR.x*s + trans.offsetIN*diR.x*w
    + trans.offsetCAC*di.x*s + trans.offsetAC*di.x*w;
  var dy = y + trans.cell*di.y*s + trans.offsetCIN*diR.y*s + trans.offsetIN*diR.y*h
    + trans.offsetCAC*di.y*s + trans.offsetAC*di.y*h;
  return point(dx, dy);
}
function makeTranslation(t1, t2, t3, ect) {
  var trans = {
    cells: [0],
    offsetsIN: [0],
    offsetsAC: [0],
    offsetsCIN: [0],
    offsetsCAC: [0]
  }
  for(var i=0; i<arguments.length; i++) {
    var a = arguments[i];
    if(a.t == 0)
      trans.cells.push(a.v);
    if(a.t == 2)
      trans.offsetsIN.push(a.v);
    if(a.t == 3)
      trans.offsetsAC.push(a.v);
    if(a.t == 4)
      trans.offsetsCIN.push(a.v);
    if(a.t == 5)
      trans.offsetsCAC.push(a.v);
  }
  var trans2 = {
    cell: 0,
    offsetIN: 0,
    offsetAC: 0,
    offsetCIN: 0,
    offsetCAC: 0
  }
  for(var i=0; i<trans.cells.length; i++)
    trans2.cell += trans.cells[i];
  for(var i=0; i<trans.offsetsIN.length; i++)
    trans2.offsetIN += trans.offsetsIN[i];
  for(var i=0; i<trans.offsetsAC.length; i++)
    trans2.offsetAC += trans.offsetsAC[i];
  for(var i=0; i<trans.offsetsCIN.length; i++)
    trans2.offsetCIN += trans.offsetsCIN[i];
  for(var i=0; i<trans.offsetsCAC.length; i++)
    trans2.offsetCAC += trans.offsetsCAC[i];
  return trans2;
}
var TRANS = {
  cell: function(v) {return {t: 0, v}},
  offsetIN: function(v) {return {t: 2, v}},
  offsetAC: function(v) {return {t: 3, v}},
  offsetCIN: function(v) {return {t: 4, v}},
  offsetCAC: function(v) {return {t: 5, v}}
}
var DIR = {
  up: 0,
  right: 1,
  down: 2,
  left: 3
}
