
function handleCalculatorButtonPressed(evt) {
  var elem = evt.target;
  var text = getInnerText(elem);
  var f = calculatorFunctions[text];
  if(!f) {
    alert("Unexpected Button pressed for text " + text);
  } else {
    f(text);
  }
  return false;
}

function updateCurrentValueFromOperation() {
  switch(currentOperation) {
  case OPERATION_ADD:
    currentValue += getDisplayAsFloat();
    break;
  case OPERATION_SUBTRACT:
    currentValue -= getDisplayAsFloat();
    break;
  case OPERATION_MULTIPLY:
    currentValue *= getDisplayAsFloat();
    break;
  case OPERATION_DIVIDE:
    currentValue /= getDisplayAsFloat();
    break;
  default:
    currentValue = getDisplayAsFloat();
    break;
  }
  currentOperation = OPERATION_NONE;
  setDisplayAsFloat(currentValue);
}


function memoryClear() {
  memoryValue = 0;
}

function memoryAdd() {
  memoryValue += getDisplayAsFloat();
}

function memorySubtract() {
  memoryValue -= getDisplayAsFloat();
}

function memoryRecall() {
  setDisplayAsFloat(memoryValue);
  clearOnNextEntry = true;
}

function clear() {
  currentValue = 0;
  currentOperation = OPERATION_NONE;
  setDisplayAsFloat(0);
  clearOnNextEntry = true;
}

function add() {
  updateCurrentValueFromOperation();
  currentOperation = OPERATION_ADD;
  clearOnNextEntry = true;
}

function subtract() {
  updateCurrentValueFromOperation();
  currentOperation = OPERATION_SUBTRACT;
  clearOnNextEntry = true;
}

function multiply() {
  updateCurrentValueFromOperation();
  currentOperation = OPERATION_MULTIPLY;
  clearOnNextEntry = true;
}

function divide() {
  updateCurrentValueFromOperation();
  currentOperation = OPERATION_DIVIDE;
  clearOnNextEntry = true;
}

function negate() {
  setDisplayAsFloat(-getDisplayAsFloat());
}

function numberPressed(text) {
  if(clearOnNextEntry) {
    setDisplayAsText(text);
    clearOnNextEntry = false;
  } else {
    var curValue = getDisplayAsText();
    if(curValue == "" || curValue == "0") {
      setDisplayAsText(text);
    } else {
      setDisplayAsText(getDisplayAsText() + text);
    }
  }
}

function decimalPointPressed() {
  if(getInnerText(getDisplayElem()).indexOf(".") == -1) {
    setDisplayAsText(getDisplayAsText() + ".");
  }
}

function equalsPressed() {
  updateCurrentValueFromOperation();
  currentOperation = OPERATION_NONE;
  clearOnNextEntry = true;
}
