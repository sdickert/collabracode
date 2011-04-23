
function runSortOnce(iteration) {
  var selection = document.getElementById("sort_algorithm");
  if(!selection) {
    console.log("could not find selection");
    return true;
  }
  var sorttype = selection.item(selection.selectedIndex).value;
  if(!sorttype) {
    console.log("no sort type specified");
    return true;
  }
  var itersortfuncname = "itersort_" + sorttype;
  var itersortfunc = window[itersortfuncname];
  if(!itersortfunc) {
    console.log("no itersort function named ", itersortfuncname);
    return true;
  }
  var table = document.getElementById("sort-table");
  var tbody = table.tBodies[0];
  var lastRow = tbody.rows[tbody.rows.length-1];
  var cells = lastRow.cells;
  var arr = [];
  var arr2 = [];
  for(var i=0; i<cells.length; i++) {
    var value = parseInt(getInnerText(cells[i]));
    arr.push(value);
    arr2.push(value);
  }
  var maxiterations = 0;
  switch(sorttype) {
    case "bubblesort":
      maxiterations = arr.length - 1;
      break;
    case "insertionsort":
      maxiterations = arr.length - 1;
      break;
    case "radixsort":
      maxiterations = radixsort_numPasses(arr, 10);
      break;
    default:
      maxiterations = -1;
      break;
  }
  console.log("running through iteration ", iteration, " out of ", maxiterations, " for sort ", sorttype);
  if(iteration >= maxiterations) {
    console.log("no more iterations");
    return true;
  }
  var outarr = itersortfunc(arr, iteration);
  var newRow = document.createElement("tr");
  newRow.className = "attempt";
  for(var i=0; i<outarr.length; i++) {
    var newCell = document.createElement("td");
    newCell.className = "element";
    setInnerText(newCell, new String(outarr[i]));
    newRow.appendChild(newCell);
  }
  tbody.appendChild(newRow);
  if(iteration + 1 >= maxiterations) {
    console.log("no more iterations");
    return true;
  }
  return false;
}

function runSort() {
  for(var i=0; !runSortOnce(i); i++) {}
  console.log("done");
}

function attachButtonEvents() {
  addEvent(document.getElementById("run-sort-button"), "click", runSort);
}

addEvent(window, "load", attachButtonEvents);

