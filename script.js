class Operation {
  constructor(props) {
    this.a = props.a ? props.a : null;
    this.operator = props.operator ? props.operator : null;
    this.b = null;
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
    this.result = this[this.operator]();
    return this.result;
  }

  checkIfExecutionIsPossible() {
    return (this.a && this.b && this.operator) ? true : false;
  }
}

class InputSession {
  constructor() {
    this.value = [];
    this.sessionIsClosed = false;
  }

  convertToDigit() {
    return parseInt(this.value.join(''), 10);
  }

  closeSession() {
    this.sessionIsClosed = true;
    this.digit = this.convertToDigit();
    return;
  }
}

class Calculator { 
  constructor() {
    this.input = new InputSession;
    this.currentOperation = null;
    this.history = [];
  }

  handleDigitClick(value) {
    if (this.input.sessionIsClosed) {
      this.input = new InputSession;
    }
    this.input.value.push(value);
    this.updateOutput(this.input.convertToDigit());
  }

  handleOperatorClick(value) {
    if (!this.input.sessionIsClosed) {
      const convertedInput = this.input.convertToDigit();
      if (this.currentOperation.a) {
        this.currentOperation.b = convertedInput;
      } else {
        this.currentOperation.a = convertedInput;
      }
      this.input.closeSession();
    }

    if (this.currentOperation.checkIfExecutionIsPossible()) {
      const result = this.currentOperation.execute();
      this.history.push(this.currentOperation);
      this.createNewOperation({a: result});
      this.updateOutput(result);
      console.log(this.history);
    }

    this.currentOperation.operator = (value === "result") ? null : value;
  }

  handleServiceClick(value) {
    if (value === "clear") {
      this.init();
    }
    return;
  }

  updateOutput(value) {
    resultNode.innerHTML = value;
    return;
  }

  init() {
    this.createNewOperation({});
    this.updateOutput(0);
  }

  createNewOperation(operationProps) {
    this.currentOperation = new Operation(operationProps);
    return;
  }
}

resultNode = document.getElementsByClassName("result")[0];
controlsNode = document.getElementsByClassName("controls")[0];

let calc = new Calculator;
calc.init();
controlsNode.onclick = function(e) {
  const { target } = e;
  let value = target.getAttribute("data-action");
  if (target.classList.contains("number")) {
    calc.handleDigitClick(value);
  } else if (target.classList.contains("operator")) {
    calc.handleOperatorClick(value);
  } else if (target.classList.contains("service")) {
    calc.handleServiceClick(value);
  }
  console.log(`input: ${calc.input.value}`);
  console.log(calc.currentOperation);
  return;
}
