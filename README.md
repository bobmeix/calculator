# calculator
Third JavaScript Project from The Odin Project

Browser Calculator

[Live Link](https://bobmeix.github.io/calculator/)

Features:

- modern design with hover and button press effects
- display has 2 rows, for operands/operators and results
- basic arithmetic operations
- you can also calculate: 2^X, nth root of X, X^n, percent, reverse sign
- operations are chainable: e.g. you get a result after pressing an operator, not just the equal sign
- decimal input is allowed
- to delete inputs, there are: all clear, clear entry and backspace buttons with appropriate functions
- the calculator has keyboard support for number inputs, decimal, basic operators, equal - on the numpad;
    To calculate the result, press = or Enter;
    Basic operators have additional keyboard controls: + (a, A); - (s, S); * (x, X); / (d, D);
    Escape for all clear / Delete for clear entry / Backspace for deleting one character at a time
- there is also edge case handling for division by 0 and Infinity: all the delete buttons act as "all clear"
    while other buttons are disabled
- large numbers have Thousand separators (dot for Thousand; comma to indicate the decimal place )
    for easier readability
- please keep in mind that the max value for exact integer calculations is: ±9.007.199.254.740.991 / between: -(2^53 – 1) and 2^53 – 1)