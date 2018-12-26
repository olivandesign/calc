class Calculator { 
  constructor() {
    this.currentOperation = { a: null, b: null, operator: null, result: null};
    this.operationsHistory = [];
    this.input = [];
  }
  
  //Operation Types

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

  result() {
    return this.executeOperation();
  }

  ac() {
    return ;
  }
  
  percent() {
    return ;
  }

  handleNumberClick(value) {
    this.input.push(value);
    this.updateScoreboard(this.input.join(''));
    return ;
  }

  handleOperatorClick(value) {
    let { operator } = this.currentOperation;
    this.currentOperation.operator = operator ? operator : value;
    if (!this.currentOperation.a) {
        this.currentOperation.a = parseInt(this.input.join(''), 10);
        this.input = [];
      } else {
        this.currentOperation.b = parseInt(this.input.join(''), 10);
        this.executeOperation(this.currentOperation);
      }
    return;
  }
  
  updateScoreboard(value) {
    resultNode.innerHTML = value;
    return;
  }

  clearOperation() {
    this.currentOperation = { a: null, b: null, operator: null, result: null };
    return;
  }

  executeOperation(operation) {
    let { a, b, operator} = operation;
    const result = this[operator](a, b);
    this.currentOperation.result = result;
    this.updateScoreboard(result);
    this.setNextOperation(result);
    return;
  }

  setNextOperation(result) {
    this.clearOperation(); 
    this.currentOperation.a = result;
    this.input = [];
    debugger
  }
}


let calc = new Calculator;

resultNode = document.getElementsByClassName("result")[0];
controlsNode = document.getElementsByClassName("controls")[0];

controlsNode.onclick = function(e) {
  const { target } = e;
  let value = target.getAttribute("data-action");
  
  if (target.classList.contains("number")) {
    calc.handleNumberClick(value)
  } else if (target.classList.contains("operator")) {
    calc.handleOperatorClick(value);
  } else return;
}