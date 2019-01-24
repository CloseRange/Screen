class Lerp {
  constructor(a, b, speed) {
    this.a = a;
    this.b = b;
    this.speed = speed;
    this.DEFA = a;
    this.DEFB = b;
    this.value = a;
    drawable(this);
  }
  step() {
    this.a += (this.b-this.a)*this.speed;
    if(this.b-this.a <= this.speed) this.a = this.b;
    this.value = this.a;
  }
  reset() {
    this.a = this.DEFA;
    this.b = this.DEFB;
    this.value = this.a;
  }
}
class Cycle {
  constructor(a, b, speed) {
    this.a = a;
    this.b = b;
    this.speed = speed;
    this.value = a;
    drawable(this);
  }
  step() {
    this.value += this.speed;
    while(this.value >= this.b) this.value -= this.b;
  }
}
class Wave {
  constructor(min, max, freq) {
    this.value = min + (max-min)/2;
    this.timer = 0;
    this.freq = freq;
    this.min = min;
    this.max = max;
    drawable(this);
  }
  step() {
    this.timer += this.freq;
    var sin = Math.sin(this.timer)/2+.5;
    this.value = sin*(this.max-this.min) + this.min;
  }
}
