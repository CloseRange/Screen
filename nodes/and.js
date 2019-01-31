IMG.add_("and");
class andNode extends node {
  constructor(x, y) {
    super(x, y, IMG.and, 2, true);
    this.setIO([], []);
    this.i = 0;
  }
  setIO(preIns, preOuts) {
    this.ins = [];
    this.outs = [];
    // this.addIn(DIR.left, makeTranslation(), preIns)
    for(var i=0; i<this.size; i++) {
      this.addIn(DIR.left, makeTranslation(TRANS.cell(i), TRANS.offsetCAC(.5)), preIns)
      // this.addIn(DIR.left, makeTranslation(TRANS.cell(1), TRANS.offsetCAC(.5)), preIns)
    }
    this.addOut(DIR.right, makeTranslation(TRANS.offsetAC(.5)), preOuts);

    this.clearOldIOS(preIns, preOuts);
  }
  resize(ns) {
    this.size = clamp(ns, 1, ns+1);
    this.setIO(this.ins, this.outs);
  }
  step() {
  }
}
function andNode_make(x, y) {
  return new andNode(x, y);
}
