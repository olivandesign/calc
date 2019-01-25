class Calculator { 
  constructor() {
    this.currentOperation = null;
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
  
  percent() {
    return ;
  }

  // Click Handlers
  handleControlClick(value) {
    if (value === "clear") {
      this.createNewOperation();
    } else if (value === "result") {
      this.convertInputToOperand();
      this.executeOperation();
    } else return;
  }
  
  handleNumberClick(value) {
    if (this.currentOperation.inputSessionIsClosed) {
      this.createNewInputSession();
    }
    this.appendNumber(value)
  }
  
  handleOperatorClick(value) {
    this.closeInputSession();
    this.addOperationType(value);
    if (this.checkIfOperationIsPossible()) {
      this.executeOperation();
    }
  }
  
  //Input / Output Services
  appendNumber(number) {
    this.currentOperation.input.push(number);
    return;
  }

  addOperationType(value) {
    this.currentOperation.operationType = value;
    return;
  }

  createNewOperatorSession() {
    this.currentOperation.operatorSessionIsClosed = false;
    this.currentOperation.operationType = null;
  }

  closeOperatorSession() {
    this.currentOperation.operatorSessionIsClosed = true;
    this.addOperationType();
  }

  createNewInputSession() {
    this.currentOperation.inputSessionIsClosed = false;
    this.currentOperation.input = [];
  }
  
  closeInputSession() {
    this.currentOperation.inputSessionIsClosed = true;
    this.convertInputToOperand();
  }
  
  convertInputToOperand () {
    const { input, operandA } = this.currentOperation;
    if (!operandA) {
      this.currentOperation.operandA = parseInt(input.join(''), 10);
    } else {
      this.currentOperation.operandB = parseInt(input.join(''), 10);
    }
  }
  
  updateOutput() {
    const { input, result } = this.currentOperation;
    console.log(result);
    const output = result ? result : input.join('');
    resultNode.innerHTML = output;
    return;
  }
  
  //Operation Services
  executeOperation() {
    let { operandA, operandB, operationType} = this.currentOperation;
    const result = this[operationType](operandA, operandB);
    this.currentOperation.result = result;
    this.setNextOperation();
    return;
  }
  
  setNextOperation() {
    const result = this.currentOperation.result;
    this.createNewOperation(); 
    this.currentOperation.operandA = result;
  }
  
  createNewOperation() {
    this.currentOperation = { 
      inputSessionIsClosed: true,
      input: [0], 
      operandA: null, 
      operandB: null, 
      operatorSessionIsClosed: true,
      operationType: null, 
      result: null 
    };
    return;
    }

  checkIfOperationIsPossible() {
    const { operandA, operandB, operationType } = this.currentOperation;
    let test = [operandA, operandB, operationType];
    console.log('possibility of operation', test);
    return (operandA && operandB && operationType) ? true : false;
  }
  
  init() {
    this.createNewOperation();
    this.updateOutput();
  }
}


let calc = new Calculator;
resultNode = document.getElementsByClassName("result")[0];
controlsNode = document.getElementsByClassName("controls")[0];
calc.init();
controlsNode.onclick = function(e) {
  const { target } = e;
  let value = target.getAttribute("data-action");
  if (target.classList.contains("number")) {
    calc.handleNumberClick(value);
  } else if (target.classList.contains("operator")) {
    calc.handleOperatorClick(value);
  } else if (target.classList.contains("control")) {
    calc.handleControlClick(value);
  }
  console.log(calc.currentOperation);
  calc.updateOutput();
  return;
}