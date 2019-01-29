class Operation {
  constructor(result) {
    this.a = result || null;
    this.operator = null;
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
    return;
  }

  checkIfExecutionIsPossible() {
    return !!this.a && !!this.b && !!this.operator;
  }
}

class InputSession {
  constructor() {
    this.value = [];
    this.isFloat = false;
    this.sessionIsClosed = false;
  }

  convertToDigit() {
    if (this.isFloat) {
      return parseFloat(this.value.join(''), 10);
    } else {
      return parseInt(this.value.join(''), 10);
    }
  }

  closeSession() {
    this.sessionIsClosed = true;
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
    const { currentOperation } = this;

    if (!this.input.sessionIsClosed) {
      if (currentOperation.a) {
        this.currentOperation.b = this.input.convertToDigit();
      } else {
        this.currentOperation.a = this.input.convertToDigit();
      }
      this.input.closeSession();
    }

    if (currentOperation.checkIfExecutionIsPossible()) {
      currentOperation.execute();
      this.history.push(currentOperation);
      this.updateOutput(currentOperation.result);
      this.createNewOperation(currentOperation.result);
      console.log(this.history);
    }

    this.currentOperation.operator = (value === "result") ? null : value;
  }

  handleServiceClick(value) {
    if (value === "clear") {
      this.init();
    } else if (value === "dot") {
      this.input.isFloat = true;
      this.input.value.push('.');
    }
    return;
  }

  updateOutput(value) {
    outputNode.innerHTML = value;
    return;
  }

  init() {
    this.createNewOperation();
    this.input = new InputSession;
    this.updateOutput(0);
  }

  createNewOperation(lastResult) {
    this.currentOperation = new Operation(lastResult);
    return;
  }
}

outputNode = document.getElementsByClassName("output")[0];
controlsNode = document.getElementsByClassName("controls")[0];

let calc = new Calculator;
calc.init();
controlsNode.onclick = function(e) {
  const { target } = e;
  let value = target.getAttribute("data-action");
  switch (true) {
    case target.classList.contains("digit"):
      calc.handleDigitClick(value);
      break;
    case target.classList.contains("operator"):
    calc.handleOperatorClick(value);
      break;
    case target.classList.contains("service"):
      calc.handleServiceClick(value);
      break;
  }
  console.log(`input: ${calc.input.value}`);
  console.log(calc.currentOperation);
  return;
}
