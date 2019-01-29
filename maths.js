function clamp(val, min, max) {
  return Math.max(Math.min(val, max), min);
}
function mouseBox(x1, y1, x2, y2) {
  var mx = Screen.mouse.x;
  var my = Screen.mouse.y;

  return mx > x1 && mx < x2 && my > y1 && my < y2;
}
function point(x, y) {
  return {x, y};
}
function getPosition(x, y) {
  return point(x+grid.x, y+grid.y);
  // return point((x+grid.x)*grid.scale, (y+grid.y)*grid.scale);
}
function mousePosition() {
  return point(Screen.mouse.x, Screen.mouse.y);
  // return point((Screen.mouse.x-grid.x)/grid.scale, (Screen.mouse.y-grid.y)/grid.scale)
}
function mouseToReal() {
  return point(Screen.mouse.x - grid.x, Screen.mouse.y - grid.y);
}
function mouseToDraw() {
  // Screen.pen.save();
  // Screen.pen.resetTransform();
  // var p = point(Screen.mouse.x-grid.x, Screen.mouse.y-grid.y);
  // Screen.pen.restore();
  var p = point(Screen.mouse.x, Screen.mouse.y);
  return p;
}
