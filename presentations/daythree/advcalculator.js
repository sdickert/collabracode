var AdvCalculator = function(a, b) {
    this.base = Calculator;
    this.base(a, b);
};
 
AdvCalculator.prototype = new Calculator();
AdvCalculator.prototype.constructor = AdvCalculator;
AdvCalculator.prototype.logn = function() {
    return Math.log(this.a) / Math.log(this.b);
};
 
AdvCalculator.prototype.pow = function() {
    return Math.pow(this.a, this.b);
};
 
var calc = new AdvCalculator("7", 6); // -> new instance
var ultimateAnswer = calc.mult();     // -> 42
var largeNumber = calc.pow();         // -> 117649
