function getDisplayElem() {
  return document.getElementById("numeric-display");
}

function setDisplayAsText(value) {
  setInnerText(getDisplayElem(), value);
}

function setDisplayAsFloat(value) {
  setInnerText(getDisplayElem(), new String(value));
}

function getDisplayAsText() {
  return getInnerText(getDisplayElem());
}

function getDisplayAsFloat() {
  return parseFloat(getDisplayAsText());
}
