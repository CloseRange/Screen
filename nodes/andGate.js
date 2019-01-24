class andGate extends gate_ {
  constructor(x, y, size) {
    super(x, y, size, size);
    this.size = size;
    this.outputs = [];
    this.inputs = [];
    for(var i=0; i<size; i++) {
      this.outputs[i] = new output(x+size, y+i);
    }
    for(var i=0; i<size; i++) {
      this.inputs[i] = new input(x-1, y+i);
    }
  }
}
var a = new andGate(1, 5, 2);
var b = new andGate(5, 10, 2);
