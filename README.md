# Screen
- Michael Hulbert
### Importing File
---
In the HTML file:  
```
<body>
  <script src="screen.js"></script>
</body
```
Change 'screen.js' to the file location you specify.
### Making a Drawable Object
---
```
class test {
  constructor() {
    drawable(this);
  }
  step() {
  
  }
  draw() {
    
  }
}
```
This creates an object that can draw to the screen.

the step and draw functions are optional.  
Both will be repeated every frame so use sparingly.  
You may also use beginStep, endStep, beginDraw, and endDraw.  
These functions are called before/after the normal loop.  

# Drawing to the screen
all of these functions should be called inside the draw event of a drawable object

### Setting the colors:
```
Screen.fill(r, g, b, a);
Screen.noFill();
Screen.stroke(r, g, b, a);
Screen.noStroke();
```
r, g, and b are all values that range from 0-255 while alpha is a value 0-1

You may also create a color and pass it in as an argument instead:
```
var color = new Color(r, g, b, a);
Screen.fill(color);
```
You can use this method as well to change the background color
`Screen.background(r, g, b, a);`  
### circle
`Screen.circle(x, y, radius);`  
### arc
`Screen.arc(x, y, radius, angle1, angle2);`  
### rectangle
`Screen.rect(x, y, width, height);`  
## Drawing Images to the Screen
first create a refrance to the image, **this should not be done in the draw or step event!**  
This can be in the constructor of an object or elsewhere as long as you can refrence it later:
`var img = addImage("img.jpg");`  
### Drawing it to the Screen
this, however, should be in the draw event
`Screen.drawImage(x, y, imageRefrence);`  
imageRefrence would be the image variable you created earlier.
### Drawing it scaled
You have the choice to draw the image scaled in direct to the width or height of the screen
#### Width
`Screen.drawImageScale(x, y, imageRefrence, scale, Screen.WIDTH);`  
#### Height
`Screen.drawImageScale(x, y, imageRefrence, scale, Screen.HEIGHT);`  
scale is a value from 0-1
## Getting Dimensions
You can get the dimensions of the screen by using width and height:  
`Screen.width`  
`Screen.height`  
You can also get the dimensions of a drawn image
```
var dim = Screen.drawImageScale(x, y, imageRefrence, scale, Screen.WIDTH);
dim.x1;
dim.y1;
dim.x2;
dim.y2;
dim.x;
dim.y;
dim.width;
dim.height;
```
x and x1 are the same value always along with y and y1.  
x2 and y2 refer to the bottom right position of the image (or x+width and y+height)  

You may also get the same dimensions without having to draw any image to the screen:  
`var dim = Screen.getImageScale(x, y, imageRefrence, scale, Screen.WIDTH);`  
'var dim = Screen.getImage(x, y, imageRefrence);`  
Or if you just want the normal width and height of an image (without scaling) you can get it directly from the image:  
```
var img = addImage("img.jpg");
var w = img.width;
var h = img.height;
```

## The Mouse
You also have options for getting information about the mouse  
Use these in either the step event or the draw events.  
```
Screen.mouse.x;
Screen.mouse.y;
```
These are used to get the coords of the mouse.  
```
if(Screen.mouse.left.pressed) {}
if(Screen.mouse.left.released) {}
if(Screen.mouse.left.down) {}
```
down will check if the mouse left is down.  
pressed will check the instant you press down on the mouse.  
released is the instant you release it.

You may also check the right and middle mouse buttons:
```
Screen.mouse.right
Screen.mouse.middle
```
