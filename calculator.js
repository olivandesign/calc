class Operation {
  constructor(props) {
    this.a = props.a ? props.a : null;
    this.b = props.b ? props.b : null;
    this.operator = props.operator ? props.operator: null;
    this.result = null;
  }

  divide() {
    return this.a / this.b;
  }
  
  multiply() {
    return this.a * this.b;
  }
  
  substract() {
    return this.a - this.b;
  }
  
  add() {
    return this.a + this.b;
  }
  
  percent() {
    return (this.a / 100) * this.b;
  }

  execute() {
    this.result = this[operator]();
    return this.result;
  }

  executionIsPossible() {
    return (this.a && this.b && this.operator) ? true : false;
  }
}

class Calculator { 
  constructor() {
    this.output = null;
    this.inputSessionIsClosed = true;
    this.input = null;
    this.currentOperation = new Operation;
  }

  handleClick(target) {
    let value = target.getAttribute("data-action");
    const operation = this.currentOperation;
    if (target.classList.contains("number")) {
      calc.input.push(value);
    } else if (target.classList.contains("operator")) {
      calc.input = value;
    } else if (target.classList.contains("control")) {
      if (value === "clear") {
        this.createNewOperation();
      } else if (value === "result") {
        if (operation.executionIsPossible()) {
          operation.execute();
        }
      } else return;
    }
  }

  createNewInputSession() {

  }

  convertInput() {

  }

  updateOutput() {
    resultNode.innerHTML = this.output;
    return;
  }

  createNewOperation(operationProps) {
    this.currentOperation = new Operation(operationProps);
    return;
  }
}

resultNode = document.getElementsByClassName("result")[0];
controlsNode = document.getElementsByClassName("controls")[0];

let calc = new Calculator;
controlsNode.onclick = function(e) {
  calc.handleClick(e.target);
  calc.updateOutput();
  return;
}
