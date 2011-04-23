// What is accum at the end?
var accum = 1.0;
for(var i=0; i&lt;10; i++) {
  switch(i) {
  case "7":
    accum += 42;
  case 3:
    accum *= 2;
    break;
  case true:
    do {
      accum += 999
    } while(accum &lt; 2000);
  case 4:
    accum += 63;
  default:
    accum += 1;
  }
}
