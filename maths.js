
function P(x, y) {
  return {x, y};
}
function clamp(val, min, max) {
  return Math.max(Math.min(val, max), min);
}
function point_distance(x, y, x2, y2) {
  return Math.sqrt(Math.abs(x2-x)+Math.abs(y2-y))
}
function getReal(d, orientation) {
  var mult = (orientation==Screen.WIDTH)?grid.size:grid.size;
  var add = (orientation==Screen.WIDTH)?grid.x:grid.y;
  return d*mult + add;
}
