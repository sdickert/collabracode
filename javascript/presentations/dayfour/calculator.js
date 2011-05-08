var Calculator = function(a, b) {
    this.a = Number(a || 0);  // always ensure inputs are the right types
    this.b = Number(b || 0);  // best to ensure before storing in a class
};
 
Calculator.prototype.add  = function() {
  return this.a + this.b;
};
Calculator.prototype.sub  = function() {
  return this.a - this.b;
};
Calculator.prototype.mult = function() {
  return this.a * this.b;
};
Calculator.prototype.div  = function() {
  return this.a / this.b;
};
 
var calc = new Calculator("7", 6); // -> new instance
var ultimateAnswer = calc.mult();  // -> 42
var unlucky = calc.add();          // -> 13
