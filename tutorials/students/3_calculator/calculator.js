
var OPERATION_NONE = 0;
var OPERATION_ADD = 1;
var OPERATION_SUBTRACT = 2;
var OPERATION_MULTIPLY = 3;
var OPERATION_DIVIDE = 4;

var currentValue = 0;
var currentOperation = OPERATION_NONE;
var memoryValue = 0;
var clearOnNextEntry = true;

function addEvent(obj, evType, fn) {
  // taken from http://www.onlinetools.org/articles/unobtrusivejavascript/chapter4.html
  if (obj.addEventListener) {
    obj.addEventListener(evType, fn, false); 
    return true; 
  } else if (obj.attachEvent) {
    var r = obj.attachEvent("on"+evType, fn); 
    return r; 
  } else {
    return false; 
  }
}

function getDisplayElem() {
  return document.getElementById("numeric-display");
}

function setDisplayAsText(value) {
  getDisplayElem().innerText = value;
}

function setDisplayAsFloat(value) {
  getDisplayElem().innerText = new String(value);
}

function getDisplayAsText() {
  return getDisplayElem().innerText;
}

function getDisplayAsFloat() {
  return parseFloat(getDisplayAsText());
}

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

function attachButtonEvents() {
  var elems = document.getElementsByClassName("button");
  for (var i=0; i<elems.length; i++) {
    var elem = elems[i];
    if(elem.innerText) {
      addEvent(elem, "click", handleCalculatorButtonPressed)
    }
  }
}

addEvent(window, "load", attachButtonEvents);

