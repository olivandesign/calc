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
    console.log(this.currentOperation);
    this.updateWindow(operandB.length === 0 ? operandA.join('') : operandB.join(''));
  }

  handleOperationClick(value) {
    let { operator } = this.currentOperation;
    if (operator === "clear") {
      this.newOperation();
      this.updateWindow(0);
      return;
    }
    if (!operator) {
      this.currentOperation.operator = value;
      console.log(this.currentOperation.operator);
    } else this.executeOperation();
  }
  
  updateWindow(value) {
    resultNode.innerHTML = value;
  }

  newOperation() {
    this.currentOperation = { operandA: [], operandB: [], operator: null, result: null };
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

  executeOperation() {
    const { operandA, operandB, operator } = this.currentOperation;
    const a = +operandA.join('');
    const b = +operandB.join('');
    const operationType = operator
    const result = this[operationType](a, b);
    this.currentOperation.result = result
    this.updateWindow(result);
    this.newOperation();
    this.currentOperation.operandA = result;
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