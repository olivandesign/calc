class Calculator { 
  constructor() {

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

  addNumber(number) {
    const { inputSessionIsClosed } = this.currentOperation;
    if (inputSessionIsClosed) {
      this.createNewInputSession();
    }
    this.currentOperation.input.push(number);
    return;
  }

  addOperationType(value) {
    this.currentOperation.operationType = value;
    return;
  }
  
  handleControlClick(value) {
    if (value === "clear") {
      this.createNewOperation();
    } else if (value === "result") {
      this.convertInputToOperand();
      this.executeOperation();
    } else return;
  }
  
  //Input / Output Services
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
      operationType: null, 
      result: null };
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
    calc.addNumber(value)
  } else if (target.classList.contains("operator")) {
    calc.closeInputSession();
    calc.addOperationType(value);
    
  } else if (target.classList.contains("control")) {
    calc.handleControlClick(value);
  }
  if (calc.checkIfOperationIsPossible()) {
    calc.executeOperation();
  }
  console.log(calc.currentOperation);
  calc.updateOutput();
  return;
}











// // Click Handlers

// addNumber(number) {
//   const { inputSessionIsClosed } = this.currentOperation;
//   if (inputSessionIsClosed) {
//     this.createNewInputSession();
//   }
//   this.currentOperation.input.push(number);
//   return;
// }

// addOperationType(value) {
//   this.currentOperation.operationType = value;
//   return;
// }

// checkIfOperationIsPossible() {
//   const { operandA, operandB, operationType } = this.currentOperation;

//   let test = [operandA, operandB, operationType];
//   console.log('possibility of operation', test);
//   return (operandA && operandB && operationType) ? true : false;
// }

// handleControlClick(value) {
//   if (value === "clear") {
//     this.createNewOperation();
//   } else if (value === "result") {
//     this.convertInputToOperand();
//     this.executeOperation();
//   } else return;
// }

// //Input Services
// createNewInputSession() {
//   this.currentOperation.inputSessionIsClosed = false;
//   this.currentOperation.input = [];
// }

// closeInputSession() {
//   this.currentOperation.inputSessionIsClosed = true;
//   this.convertInputToOperand();
// }

// //Calculator Services

// updateOutput() {
//   const { input, result } = this.currentOperation;
//   console.log(result);
//   const output = result ? result : input.join('');
//   resultNode.innerHTML = output;
//   return;
// }

// convertInputToOperand () {
//   const { input, operandA } = this.currentOperation;
//   if (!operandA) {
//     this.currentOperation.operandA = parseInt(input.join(''), 10);
//   } else {
//     this.currentOperation.operandB = parseInt(input.join(''), 10);
//   }
// }

// executeOperation() {
//   let { operandA, operandB, operationType} = this.currentOperation;
//   const result = this[operationType](operandA, operandB);
//   this.currentOperation.result = result;
//   this.setNextOperation();
//   return;
// }

// setNextOperation() {
//   const result = this.currentOperation.result;
//   this.createNewOperation(); 
//   this.currentOperation.operandA = result;
// }

// createNewOperation() {
//   this.currentOperation = { 
//     inputSessionIsClosed: true,
//     input: [0], 
//     operandA: null, 
//     operandB: null, 
//     operationType: null, 
//     result: null };
// }

// init() {
//   this.createNewOperation();
//   this.updateOutput();
// }
// }


// let calc = new Calculator;

// resultNode = document.getElementsByClassName("result")[0];
// controlsNode = document.getElementsByClassName("controls")[0];

// calc.init();

// controlsNode.onclick = function(e) {
// const { target } = e;
// let value = target.getAttribute("data-action");

// if (target.classList.contains("number")) {
//   calc.addNumber(value)
// } else if (target.classList.contains("operator")) {
//   calc.closeInputSession();
//   if (calc.checkIfOperationIsPossible()) {
//     calc.executeOperation();
//   }
//   calc.addOperationType(value);
  
// } else if (target.classList.contains("control")) {
//   calc.handleControlClick(value);
// }
// console.log(calc.currentOperation);
// calc.updateOutput();
// return;
// }