CUR = {
  normal: addImage("res/cursor/normal.png"),
  move: addImage("res/cursor/move.png"),
  scale: addImage("res/cursor/scale.png")
}
Cursor.set(CUR.normal, false);
new Window(25, 25, 100, 300).Title("Hello!");
new Window(50, 50, 100, 300).Title("Hello!");
console.log(CUR);
