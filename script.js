// function getControlPanel(layout) {

// }
// appNode = document.getElementsByClassName("app")[0];
// controlsNode = document.getElementsByClassName("controls")[0];

class Calculator { 
  constructor() {
    this.currentOperation = this.clear();
    this.operations = [];
  }

  clear() {
    return {operandA: null, operandB: null, operationType: null,};
  }

  divide(a, b) {
    return a / b;
  }

  multiply(a, b) {
    return a * b;
  }

  substract(a, b) {
    return a - b;
  }

  add(a, b) {
    return a + b;
  }

  count(operation) {
    const { a, b, operationType} = operation;
    return this[operationType](a, b);
  }
}

let calc = new Calculator;

