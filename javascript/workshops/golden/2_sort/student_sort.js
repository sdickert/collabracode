function itersort_bubblesort(arr, iteration) {
  arr = duplicateArray(arr);
  var prev = arr[0];
  for(i=1; i<arr.length; i++) {
    var current = arr[i];
    if(current < prev) {
      arr[i] = prev;
      arr[i-1] = current;
    }
    prev = arr[i];
  }
  console.log(arr);
  return arr;
}

function itersort_insertionsort(arr, iteration) {
  if(iteration + 1 >= arr.length) {
    return arr;
  }
  arr = duplicateArray(arr);
  var i = iteration + 1;
  var j = i - 1;
  var value = arr[i];
  var len = arr.length;
  while(j >= 0 && j < len && arr[j] > value) {
    arr[j+1] = arr[j];
    j = j - 1;
  }
  arr[j+1] = value;
  console.log(arr);
  return arr;
}

function itersort_radixsort(arr, iteration) {
  arr = radixsort_merge(radixsort_split(arr, 10, iteration));
  console.log(arr);
  return arr;
}


/**
 * Pulls the selected digit
 */
function radixsort_getDigit(num, base, digit_num) {
  return Math.floor(Math.abs(num) / Math.pow(base, digit_num)) % 10;
}

/**
 * create a list of empty lists to hold the split by digit
 */
function radixsort_makeBlanks(size) {
  var arr = [];
  for(var i=0; i<size; i++) {
    arr.push([])
  }
  return arr;
}

function radixsort_split(arr, base, digit_num) {
  var buckets = radixsort_makeBlanks(base);
  for(var i=0, arrSize = arr.length; i<arrSize; i++) {
    var num = arr[i];
    // append the number to the list selected by the digit
    var index = radixsort_getDigit(num, base, digit_num);
    //console.log("adding to bucket at index ", index, " for ", num, " at ", digit_num);
    buckets[index].push(num);
  }
  return buckets;
}
 
// concatenate the lists back in order for the next step
function radixsort_merge(arr) {
  var new_list = [];
  for(var i=0, arrSize = arr.length; i<arrSize; i++) {
    var sublist = arr[i];
    for(var j=0, sublistSize = sublist.length; j<sublistSize; j++) {
      var item = sublist[j];
      new_list.push(item);
    }
  }
  return new_list;
}

// largest abs value element of a list
function radixsort_maxAbs(arr) {
  if(!arr || !arr.length) {
    return 0;
  }
  var m = Math.abs(arr[0]);
  for(var i=1, arrSize=arr.length; i<arrSize; i++) {
    var k = Math.abs(arr[i]);
    if(k > m) {
      m = k;
    }
  }
  return m;
}

/**
 * there are as many passes as there are digits in the longest number
 */
function radixsort_numPasses(arr, base) {
  var max = radixsort_maxAbs(arr);
  var passes = Math.ceil(Math.log(max)/Math.log(base));
  //console.log("checking for number of passes on array ", arr, " with max ", max, " with base ", base, " = ", passes);
  return passes;
}

function radixSort(arr, base) {
  var passes = radixsort_numPasses(arr, base);
  var newArr = duplicateArray(arr);
  for(var digit_num=0; digit_num < passes; digit_num++) {
    newArr = radixsort_merge(radixsort_split(newArr, base, digit_num));
  }
  return newArr;
}
