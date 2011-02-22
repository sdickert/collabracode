function itersort(arr) {
  var prev = arr[0];
  for(i=1; i<arr.length; i++) {
    var current = arr[i];
    if(current < prev) {
      arr[i] = prev;
      arr[i-1] = current;
    }
    prev = arr[i];
  }
  return arr;
}