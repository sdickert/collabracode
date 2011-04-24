
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

function getInnerText(elem) {
  if(typeof elem.innerText == "undefined") {
    return elem.textContent;
  }
  return elem.innerText;
}

function setInnerText(elem, value) {
  if(typeof elem.innerText == "undefined") {
    elem.textContent = value;
  } else {
    elem.innerText = value;
  }
}
