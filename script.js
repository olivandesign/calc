class Calculator { 
  constructor() {
    this.currentOperation = { operandA: [], operandB: [], operator: null, result: null };
    this.operationsHistory = [];
  }

  handleNumberClick(value) {
    let { operandA, operandB, operator} = this.currentOperation;
    if (!operator) {
      operandA.push(value);
    } else {
      operandB.push(value);
    }
    this.updateWindow(operandB.length === 0 ? operandA.join('') : operandB.join(''));
    return;
  }

  handleOperationClick(value) {
    let { operandA, operandB } = this.currentOperation;
    this.currentOperation.operator = value;
    // debugger
    if (value === "clear") {
      this.clearOperation();
      this.updateWindow(0);
      return;
    }
    if (operandA.length > 0 && operandB.length > 0) {
      this.executeOperation();
      // debugger
    }
    return;
  }
  
  updateWindow(value) {
    resultNode.innerHTML = value;
    return;
  }

  clearOperation() {
    this.currentOperation = { operandA: [], operandB: [], operator: null };
    return;
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

  result() {
    return this.executeOperation();
  }

  executeOperation() {
    const { operandA, operandB, operator } = this.currentOperation;
    const a = parseInt(operandA.join(''), 10);
    const b = parseInt(operandB.join(''), 10);
    const result = this[operator](a, b);
    this.updateWindow(result);
    
    return result;
  }

  setNextOperation(operation) {
    let { operandA, operandB, operator} = operation;
    
    if (!operation) {
      this.clearOperation()
    } else {
      this.clearOperation(); 
      this.currentOperation.operandA = [result];
    }
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
  } else if (target.classList.contains("operation")) {
    calc.handleOperationClick(value);
  } else return;
}

// handleNumberClick(value) {
//   const { operandA, operandB, operationType } = this.currentOperation;
//   const number = +value;
//   if (!operationType) {
//     operandA.push(number);
//     this.updateResult(operandA.join(''));
//   } else {
//     if (operandA.length === 0) {
//       this.clearOperationInfo();
//       return;
//     }
//     operandB.push(number);
//     this.updateResult(operandB.join(''));
//   }
// }

// handleOperationClick(value) {
//   if (value === "clear") {
//     this.clearOperationInfo();
//   }
//   let { operationType } = this.currentOperation;
//   if (!operationType) {
//     operationType = value;
//   } else {
//     const operationInfo = this.getOperationInfo();
//     this.count(operationInfo);
//   }
// }