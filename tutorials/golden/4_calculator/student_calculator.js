
var OPERATION_NONE = 0;
var OPERATION_ADD = 1;
var OPERATION_SUBTRACT = 2;
var OPERATION_MULTIPLY = 3;
var OPERATION_DIVIDE = 4;

var currentValue = 0;
var currentOperation = OPERATION_NONE;
var memoryValue = 0;
var clearOnNextEntry = true;


var calculatorFunctions = {
  "MC" : memoryClear,
  "M+" : memoryAdd,
  "M-" : memorySubtract,
  "MR" : memoryRecall,
  "C" : clear,
  "+": add,
  "-" : subtract,
  "*" : multiply,
  "/" : divide,
  "+/-" : negate,
  "0" : numberPressed,
  "1" : numberPressed,
  "2" : numberPressed,
  "3" : numberPressed,
  "4" : numberPressed,
  "5" : numberPressed,
  "6" : numberPressed,
  "7" : numberPressed,
  "8" : numberPressed,
  "9" : numberPressed,
  "0" : numberPressed,
  "." : decimalPointPressed,
  "=" : equalsPressed
}

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

function attachButtonEvents() {
  var elems = document.getElementsByClassName("button");
  for (var i=0; i<elems.length; i++) {
    var elem = elems[i];
    if(getInnerText(elem)) {
      addEvent(elem, "click", handleCalculatorButtonPressed)
    }
  }
}

addEvent(window, "load", attachButtonEvents);

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
  setDisplayAsFloat(memoryValue);
  clearOnNextEntry = true;
}

function memorySubtract() {
  memoryValue -= getDisplayAsFloat();
  setDisplayAsFloat(memoryValue);
  clearOnNextEntry = true;
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
